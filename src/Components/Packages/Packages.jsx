import React, { useState, useEffect } from 'react';
import './packages.css'
import { BsCheckCircle } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

const Packages = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isStandalone = location.pathname === '/packages';

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const token = localStorage.getItem('token');

    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isBooking, setIsBooking] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    

    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        date: '',
        guests: '1'
    });

    const [filters, setFilters] = useState({
        location: '',
        price: '',
        category: ''
    });

    // Fetch Tours
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/tours');
                const data = await response.json();
                if (response.ok) {
                    // Prepend Base Path for images if needed, but here we'll assume relative path from public or handled by backend
                    // Actually, the seeder uses simple names. Let's make sure they work.
                    setAllData(data);
                    setFilteredData(data);
                }
                setLoading(false);
            } catch (err) {
                console.error("Fetch tours error:", err);
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const locParam = params.get('location') || '';
        const priceParam = params.get('price') || '';
        const categoryParam = params.get('category') || '';

        setFilters({
            location: locParam,
            price: priceParam,
            category: categoryParam
        });

        let filtered = allData;
        if (locParam) filtered = filtered.filter(item => item.destTitle.toLowerCase().includes(locParam.toLowerCase()) || item.location.toLowerCase().includes(locParam.toLowerCase()));
        if (priceParam) filtered = filtered.filter(item => parseInt(item.fees) <= parseInt(priceParam));
        if (categoryParam) filtered = filtered.filter(item => item.category === categoryParam);

        setFilteredData(filtered);
    }, [location.search, allData]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        const params = new URLSearchParams();
        if (newFilters.location) params.append('location', newFilters.location);
        if (newFilters.price) params.append('price', newFilters.price);
        if (newFilters.category) params.append('category', newFilters.category);
        navigate(`/packages?${params.toString()}`, { replace: true });
    }

    const handleBookNowSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        const total = selectedPackage.fees * (bookingData.guests || 1);

        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    tourId: selectedPackage._id,
                    bookingDate: bookingData.date,
                    guests: bookingData.guests,
                    totalPrice: total
                }),
            });

            if (response.ok) {
                setShowSuccess(true);
            } else {
                const data = await response.json();
                setError(data.message || 'Booking failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    }

    const showDetails = (item) => setSelectedPackage(item);
    const closeDetails = () => { setSelectedPackage(null); setIsBooking(false); setShowSuccess(false); setError(''); }
    const handleBookingInput = (e) => setBookingData({ ...bookingData, [e.target.name]: e.target.value });

    // Helper for images - since we can't easily require dynamic paths in React sometimes
    // we assume images are in public/Images folder
    const getImageUrl = (name) => {
        try {
            return `Images/${name}`;
        } catch (e) {
            return '';
        }
    }

    return (
        <section id="packages" className={`packages container section ${isStandalone ? 'standalone' : ''}`}>
            {isStandalone && (
                <div className="packageHero">
                    <div className="heroContent">
                        <h1>Exclusive Travel Packages</h1>
                        <p>Explore the best of Kenya with our handpicked destinations.</p>
                    </div>
                </div>
            )}

            <div className="secContainer">
                <div className="secIntro">
                    <h2 className='secTitle'>{isStandalone ? 'Find Your Perfect Getaway' : 'Our Packages'}</h2>
                    <p>Discover affordable and luxury packages tailored for your adventure.</p>
                </div>

                {isStandalone && (
                    <div className="packageFilters flex">
                        <div className="filterGroup">
                            <label>Location</label>
                            <input type="text" name="location" value={filters.location} placeholder="Where to?" onChange={handleFilterChange}/>
                        </div>
                        <div className="filterGroup">
                            <label>Category</label>
                            <select name="category" value={filters.category} onChange={handleFilterChange}>
                                <option value="">All Categories</option>
                                <option value="Beach">Beach</option>
                                <option value="Safari">Safari</option>
                                <option value="Mountain">Mountain</option>
                                <option value="City">City</option>
                            </select>
                        </div>
                        <div className="filterGroup">
                            <label>Max Price</label>
                            <input type="number" name="price" value={filters.price} placeholder="Max budget" onChange={handleFilterChange}/>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="loading flex">Loading packages...</div>
                ) : (
                    <div className="mainContent grid">
                        {filteredData.map((item) => (
                            <div key={item.id} className="singlePackage">
                                <div className="destImage">
                                    <img src={getImageUrl(item.imgSrc)} alt={item.destTitle} />
                                    <span className="destination">{item.destTitle}</span>
                                    <span className="discount">Special Offer</span>
                                </div>
                                <div className="packageBody">
                                    <div className="price flex">
                                        <h4>Ksh {item.fees}</h4>
                                    </div>
                                    <button onClick={() => showDetails(item)} className="btn flex">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedPackage && (
                <div className="packageModal flex">
                    <div className="modalContent">
                        <AiOutlineClose className="closeIcon icon" onClick={closeDetails} />
                        {showSuccess ? (
                            <div className="modalBody successBody flex">
                                <BsCheckCircle className="successIcon icon" />
                                <h3>Booking Successful!</h3>
                                <div className="summary">
                                    <p><strong>Package:</strong> {selectedPackage.destTitle}</p>
                                    <p><strong>Date:</strong> {bookingData.date}</p>
                                    <p><strong>Total Paid:</strong> Ksh {selectedPackage.fees * (bookingData.guests || 1)}</p>
                                </div>
                                <p style={{marginTop: '10px'}}>Your booking has been saved to your dashboard.</p>
                                <button className="btn" onClick={closeDetails}>Close</button>
                            </div>
                        ) : !isBooking ? (
                            <>
                                <div className="modalImage"><img src={getImageUrl(selectedPackage.imgSrc)} alt="" /></div>
                                <div className="modalBody">
                                    <h3>{selectedPackage.destTitle}</h3>
                                    <span className="location">{selectedPackage.location}</span>
                                    <p>{selectedPackage.description}</p>
                                    <div className="modalFooter flex">
                                        <span className="price">Ksh {selectedPackage.fees}</span>
                                        <button className="btn" onClick={() => setIsBooking(true)}>Book Now</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="modalBody bookingForm">
                                <h3>Book {selectedPackage.destTitle}</h3>
                                {error && <p style={{color: 'red'}}>{error}</p>}
                                {!isLoggedIn && <p className="loginNotice">Please login to confirm your booking.</p>}
                                <form onSubmit={handleBookNowSubmit} className="grid">
                                    <div className="inputDiv">
                                        <label>Full Name</label>
                                        <input type="text" name="name" required onChange={handleBookingInput} defaultValue={localStorage.getItem('userName')} />
                                    </div>
                                    <div className="inputDiv">
                                        <label>Email</label>
                                        <input type="email" name="email" required onChange={handleBookingInput} defaultValue={localStorage.getItem('userEmail')} />
                                    </div>
                                    <div className="inputDiv flex">
                                        <div className="field">
                                            <label>Date</label>
                                            <input type="date" name="date" min={new Date().toISOString().split('T')[0]} required onChange={handleBookingInput} />
                                        </div>
                                        <div className="field">
                                            <label>Guests</label>
                                            <input type="number" name="guests" min="1" defaultValue="1" required onChange={handleBookingInput} />
                                        </div>
                                    </div>
                                    <div className="totalPrice"><strong>Total:</strong> Ksh {selectedPackage.fees * (bookingData.guests || 1)}</div>
                                    <div className="formBtns flex">
                                        <button type="button" className="btn backBtn" onClick={() => setIsBooking(false)}>Back</button>
                                        {isLoggedIn ? (
                                            <button type="submit" className="btn">Confirm</button>
                                        ) : (
                                            <button type="button" className="btn" onClick={() => navigate('/login')}>Login to Book</button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}

export default Packages
