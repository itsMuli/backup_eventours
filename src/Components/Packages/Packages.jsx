import React, { useState, useEffect } from 'react';
import './packages.css'
import { BsCheckCircle } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

const Packages = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isStandalone = location.pathname === '/packages';

    // Mock authentication check - in real app this would come from a context/store
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const [filteredData, setFilteredData] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isBooking, setIsBooking] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    // Track user bookings locally for demonstration
    const [userBookings, setUserBookings] = useState(JSON.parse(localStorage.getItem('myBookings') || '[]'));

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

    useEffect(() => {
        // Mock data initialization (normally imported)
        const allData = [
            { id: 1, imgSrc: require('../../Images/img11.jpg'), destTitle: 'DIANI', location: 'Coastal Kenya', category: 'Beach', price: '21000', discount: '30% Off', description: 'Enjoy the white sandy beaches of Diani with a luxury stay and coastal tours.' },
            { id: 2, imgSrc: require('../../Images/img12.jpg'), destTitle: 'MAASAI MARA', location: 'Rift Valley', category: 'Safari', price: '35000', discount: '20% Off', description: 'Experience the world-famous wildebeest migration and stay in premium safari camps.' },
            { id: 3, imgSrc: require('../../Images/img18.jpg'), destTitle: 'AMBOSELI', location: 'Southern Kenya', category: 'Safari', price: '28000', discount: '15% Off', description: 'Get the best views of Mt. Kilimanjaro and see massive herds of elephants.' },
            { id: 4, imgSrc: require('../../Images/img10.jpg'), destTitle: 'MT. KENYA', location: 'Central Kenya', category: 'Mountain', price: '18000', discount: '10% Off', description: 'Challenge yourself with a trek up Africa\'s second highest peak with local guides.' },
            { id: 5, imgSrc: require('../../Images/img16.jpg'), destTitle: 'NAIROBI CITY', location: 'Nairobi', category: 'City', price: '12000', discount: '25% Off', description: 'Discover the vibrant capital city, from national parks to local craft markets.' },
            { id: 6, imgSrc: require('../../Images/img14.jpg'), destTitle: 'MALINDI', location: 'Coastal Kenya', category: 'Beach', price: '24000', discount: '15% Off', description: 'Relax in the beautiful coastal town known for its beaches and marine parks.' }
        ];

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
        if (priceParam) filtered = filtered.filter(item => parseInt(item.price) <= parseInt(priceParam));
        if (categoryParam) filtered = filtered.filter(item => item.category === categoryParam);

        setFilteredData(filtered);
    }, [location.search]);

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

    const handleBookNowSubmit = (e) => {
        e.preventDefault();
        
        const newBooking = {
            id: Date.now(),
            package: selectedPackage.destTitle,
            date: bookingData.date,
            guests: bookingData.guests,
            total: selectedPackage.price * bookingData.guests,
            img: selectedPackage.imgSrc
        };

        const updatedBookings = [...userBookings, newBooking];
        setUserBookings(updatedBookings);
        localStorage.setItem('myBookings', JSON.stringify(updatedBookings));
        setShowSuccess(true);
    }

    const showDetails = (item) => setSelectedPackage(item);
    const closeDetails = () => { setSelectedPackage(null); setIsBooking(false); setShowSuccess(false); }
    const handleBookingInput = (e) => setBookingData({ ...bookingData, [e.target.name]: e.target.value });

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

                <div className="mainContent grid">
                    {filteredData.map((item) => (
                        <div key={item.id} className="singlePackage">
                            <div className="destImage">
                                <img src={item.imgSrc} alt={item.destTitle} />
                                <span className="destination">{item.destTitle}</span>
                                <span className="discount">{item.discount}</span>
                            </div>
                            <div className="packageBody">
                                <div className="price flex">
                                    <h4>Ksh {item.price}</h4>
                                </div>
                                <button onClick={() => showDetails(item)} className="btn flex">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {isLoggedIn && userBookings.length > 0 && isStandalone && (
                    <div className="myBookingsSection">
                        <h2 className="secTitle">My Bookings Dashboard</h2>
                        <div className="bookingsGrid grid">
                            {userBookings.map(booking => (
                                <div key={booking.id} className="bookingCard flex">
                                    <div className="bookingInfo">
                                        <h3>{booking.package}</h3>
                                        <p><strong>Date:</strong> {booking.date}</p>
                                        <p><strong>Guests:</strong> {booking.guests}</p>
                                        <p><strong>Total Paid:</strong> Ksh {booking.total}</p>
                                    </div>
                                    <span className="status">Confirmed</span>
                                </div>
                            ))}
                        </div>
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
                                    <p><strong>Total Paid:</strong> Ksh {selectedPackage.price * (bookingData.guests || 1)}</p>
                                </div>
                                <button className="btn" onClick={closeDetails}>Close</button>
                            </div>
                        ) : !isBooking ? (
                            <>
                                <div className="modalImage"><img src={selectedPackage.imgSrc} alt="" /></div>
                                <div className="modalBody">
                                    <h3>{selectedPackage.destTitle}</h3>
                                    <span className="location">{selectedPackage.location}</span>
                                    <p>{selectedPackage.description}</p>
                                    <div className="modalFooter flex">
                                        <span className="price">Ksh {selectedPackage.price}</span>
                                        <button className="btn" onClick={() => setIsBooking(true)}>Book Now</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="modalBody bookingForm">
                                <h3>Book {selectedPackage.destTitle}</h3>
                                {!isLoggedIn && <p className="loginNotice">Please login to confirm your booking.</p>}
                                <form onSubmit={handleBookNowSubmit} className="grid">
                                    <div className="inputDiv">
                                        <label>Full Name</label>
                                        <input type="text" name="name" required onChange={handleBookingInput} />
                                    </div>
                                    <div className="inputDiv">
                                        <label>Email</label>
                                        <input type="email" name="email" required onChange={handleBookingInput} />
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
                                    <div className="totalPrice"><strong>Total:</strong> Ksh {selectedPackage.price * (bookingData.guests || 1)}</div>
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
