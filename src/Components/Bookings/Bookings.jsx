import React, { useState, useEffect, useCallback } from 'react';
import './bookings.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBooking, setEditingBooking] = useState(null);
    const [deletingBooking, setDeletingBooking] = useState(null);
    const [cancelReason, setCancelReason] = useState('');
    const [editData, setEditData] = useState({ date: '', guests: 1 });
    
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    useEffect(() => {
        if (isLoggedIn && token) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn, token, fetchData]);


    const fetchBookings = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/bookings/mybookings', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            }
        } catch (err) {
            console.error("Fetch bookings error:", err);
        }
    }, [token]);


    const fetchTickets = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tickets/mytickets', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTickets(data);
            }
        } catch (err) {
            console.error("Fetch tickets error:", err);
        }
    }, [token]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        await Promise.all([fetchBookings(), fetchTickets()]);
        setLoading(false);
    }, [fetchBookings, fetchTickets]);




    const handleDelete = (booking) => {
        setDeletingBooking(booking);
    };

    const confirmDelete = async () => {
        if (!cancelReason.trim()) {
            alert("Please provide a reason for cancellation.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/bookings/${deletingBooking._id}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ reason: cancelReason })
            });
            if (response.ok) {
                // Refresh bookings to show the "Cancelled" status instead of removing
                fetchBookings();
                setDeletingBooking(null);
                setCancelReason('');
            }
        } catch (err) {
            console.error("Delete booking error:", err);
        }
    };

    const handleEdit = (booking) => {
        setEditingBooking(booking);
        setEditData({
            date: booking.bookingDate.split('T')[0],
            guests: booking.guests
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/bookings/${editingBooking._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookingDate: editData.date,
                    guests: editData.guests,
                    totalPrice: editingBooking.tour.fees * editData.guests
                })
            });
            if (response.ok) {
                setEditingBooking(null);
                fetchBookings();
            }
        } catch (err) {
            console.error("Update booking error:", err);
        }
    };

    if (!isLoggedIn) {
        return <div className="bookingsContainer container section"><h2>Please login to view your bookings.</h2></div>;
    }

    return (
        <section className="bookingsPage container section">
            <div className="secIntro">
                <h2 className="secTitle">Your Journey History</h2>
                <p>Manage your upcoming trips and travel plans with ease.</p>
            </div>

            {loading ? (
                <div className="loading flex" style={{justifyContent: 'center', height: '200px'}}>Loading your trips...</div>
            ) : bookings.length === 0 ? (
                <div className="noBookings" style={{textAlign: 'center', padding: '3rem'}}>
                    <h3>No bookings found yet.</h3>
                    <p>Start exploring our world-class packages to book your next adventure!</p>
                </div>
            ) : (
                <div className="bookingsGrid grid">
                    {bookings.map(booking => (
                        <div key={booking._id} className="bookingItem">
                            <div className="imgDiv">
                                <img src={`Images/${booking.tour?.imgSrc}`} alt={booking.tour?.destTitle} />
                                <span className={`statusBadge ${booking.status.toLowerCase()}`}>{booking.status}</span>


                            </div>
                            <div className="bookingContent">
                                <div className="info">
                                    <div className="infoHeader flex" style={{justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                        <div>
                                            <h3>{booking.tour?.destTitle}</h3>
                                            <span className="location">{booking.tour?.location}</span>
                                        </div>
                                        <div className="bookingActions flex">
                                            {booking.status !== 'Cancelled' && (
                                                <>
                                                    <button className="iconBtn editBtn" onClick={() => handleEdit(booking)} title="Edit Trip">
                                                        <AiOutlineEdit className="icon" />
                                                    </button>
                                                    <button className="iconBtn deleteBtn" onClick={() => handleDelete(booking)} title="Cancel Trip">
                                                        <AiOutlineDelete className="icon" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="bookingDetails">
                                        <p><strong>Booking ID:</strong> <span>{booking._id.slice(-8).toUpperCase()}</span></p>
                                        <p><strong>Travel Date:</strong> <span>{new Date(booking.bookingDate).toLocaleDateString()}</span></p>
                                        <p><strong>Total Guests:</strong> <span>{booking.guests} {booking.guests > 1 ? 'People' : 'Person'}</span></p>
                                        <p><strong>Total Amount:</strong> <span>Ksh {booking.totalPrice}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="secIntro" style={{marginTop: '5rem'}}>
                <h2 className="secTitle">Support Tickets</h2>
                <p>Track your inquiries and support requests.</p>
            </div>

            {loading ? null : tickets.length === 0 ? (
                <div className="noTickets" style={{textAlign: 'center', padding: '3rem'}}>
                    <h3>No tickets found.</h3>
                    <p>If you have any issues, feel free to contact our support team.</p>
                </div>
            ) : (
                <div className="ticketsGrid grid" style={{gap: '1.5rem'}}>
                    {tickets.map(ticket => (
                        <div key={ticket._id} className="ticketItem" style={{background: 'var(--whiteColor)', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                            <div className="flex" style={{justifyContent: 'space-between', marginBottom: '1rem'}}>
                                <h4 style={{color: 'var(--blackColor)'}}>Ticket ID: {ticket._id.slice(-8).toUpperCase()}</h4>
                                <span className={`statusBadge ${ticket.status.toLowerCase()}`} style={{
                                    background: ticket.status.toLowerCase() === 'open' ? '#f1c40f' : '#27ae60',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.8rem',
                                    color: 'white'
                                }}>{ticket.status}</span>
                            </div>
                            <p style={{color: 'var(--textColor)', fontSize: '0.9rem', marginBottom: '0.5rem'}}><strong>Subject:</strong> Support Request</p>
                            <p style={{color: 'var(--textColor)', fontSize: '0.9rem'}}><strong>Message:</strong> {ticket.message}</p>
                            <p style={{marginTop: '1rem', fontSize: '0.8rem', color: 'var(--greyColor)'}}>Submitted on: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}


            {editingBooking && (
                <div className="editModal">
                    <div className="modalContent">
                        <h3>Update Booking</h3>
                        <p style={{marginBottom: '1rem', color: 'var(--textColor)'}}><strong>Destination:</strong> {editingBooking.tour.destTitle}</p>
                        <form onSubmit={handleUpdate} className="grid">
                            <div className="inputDiv">
                                <label>New Travel Date</label>
                                <input 
                                    type="date" 
                                    value={editData.date} 
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setEditData({...editData, date: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="inputDiv">
                                <label>Number of Guests</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={editData.guests} 
                                    onChange={(e) => setEditData({...editData, guests: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="newTotal">
                                <strong>Estimated Cost:</strong> <br/>
                                Ksh {editingBooking.tour.fees * editData.guests}
                            </div>
                            <div className="modalFooter">
                                <button type="button" className="btn cancelBtn" onClick={() => setEditingBooking(null)}>Exit</button>
                                <button type="submit" className="btn">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {deletingBooking && (
                <div className="editModal">
                    <div className="modalContent" style={{textAlign: 'center'}}>
                        <h3>Cancel Booking</h3>
                        <p style={{marginBottom: '1rem', color: 'var(--textColor)'}}>
                            Are you sure you want to cancel your trip to <strong>{deletingBooking.tour.destTitle}</strong>?
                        </p>
                        <div className="inputDiv" style={{textAlign: 'left', marginBottom: '1.5rem'}}>
                            <label style={{display: 'block', marginBottom: '.5rem', fontWeight: '600'}}>Reason for cancellation</label>
                            <textarea 
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                placeholder="Please let us know why you are cancelling..."
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '.8rem',
                                    border: '1px solid var(--greyColor)',
                                    background: 'var(--inputColor)',
                                    minHeight: '100px',
                                    outline: 'none',
                                    fontFamily: 'inherit'
                                }}
                                required
                            />
                        </div>
                        <div className="modalFooter">
                            <button type="button" className="btn cancelBtn" onClick={() => {setDeletingBooking(null); setCancelReason('');}}>Go Back</button>
                            <button type="button" className="btn deleteBtn" onClick={confirmDelete} style={{background: '#ff4d4d'}}>Confirm Cancel</button>
                        </div>

                    </div>
                </div>
            )}
        </section>

    );
};

export default Bookings;
