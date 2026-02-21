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

    const fetchBookings = useCallback(async () => {
        try {
            const response = await fetch('https://backup-eventours-backend.vercel.app/api/bookings/mybookings', {
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
            const response = await fetch('https://backup-eventours-backend.vercel.app/api/tickets/mytickets', {
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

    useEffect(() => {
        if (isLoggedIn && token) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn, token, fetchData]);




    const handleDelete = (booking) => {
        setDeletingBooking(booking);
    };

    const confirmDelete = async () => {
        if (!cancelReason.trim()) {
            alert("Please provide a reason for cancellation.");
            return;
        }

        try {
            const response = await fetch(`https://backup-eventours-backend.vercel.app/api/bookings/${deletingBooking._id}`, {
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
            const response = await fetch(`https://backup-eventours-backend.vercel.app/api/bookings/${editingBooking._id}`, {
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
                <div className="tableContainer">
                    <table className="customTable">
                        <thead>
                            <tr>
                                <th>Destination</th>
                                <th>Booking ID</th>
                                <th>Travel Date</th>
                                <th>Guests</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking._id}>
                                    <td>
                                        <div className="destCell flex">
                                            <div className="imgDiv">
                                                <img src={`Images/${booking.tour?.imgSrc}`} alt={booking.tour?.destTitle} />
                                            </div>
                                            <div className="text">
                                                <span className="destName">{booking.tour?.destTitle}</span>
                                                <span className="location">{booking.tour?.location}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="idBadge">{booking._id.slice(-8).toUpperCase()}</span></td>
                                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                    <td>{booking.guests} {booking.guests > 1 ? 'People' : 'Person'}</td>
                                    <td><span className="priceText">Ksh {booking.totalPrice}</span></td>
                                    <td>
                                        <span className={`statusBadge ${booking.status.toLowerCase()}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="bookingActions flex">
                                            {booking.status !== 'Cancelled' ? (
                                                <>
                                                    <button className="iconBtn editBtn" onClick={() => handleEdit(booking)} title="Edit Trip">
                                                        <AiOutlineEdit className="icon" />
                                                    </button>
                                                    <button className="iconBtn deleteBtn" onClick={() => handleDelete(booking)} title="Cancel Trip">
                                                        <AiOutlineDelete className="icon" />
                                                    </button>
                                                </>
                                            ) : (
                                                <span style={{fontSize: '0.8rem', color: 'var(--greyColor)'}}>N/A</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                <div className="tableContainer">
                    <table className="customTable ticketTable">
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Submitted On</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <tr key={ticket._id}>
                                    <td><span className="idBadge">{ticket._id.slice(-8).toUpperCase()}</span></td>
                                    <td><strong>Support Request</strong></td>
                                    <td>
                                        <div className="messageCell" title={ticket.message}>
                                            {ticket.message}
                                        </div>
                                    </td>
                                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`statusBadge ${ticket.status.toLowerCase()}`} style={{
                                            background: ticket.status.toLowerCase() === 'open' ? '#f1c40f' : '#27ae60'
                                        }}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                                    min={editingBooking.bookingDate.split('T')[0] < new Date().toLocaleDateString('en-CA') 
                                        ? editingBooking.bookingDate.split('T')[0] 
                                        : new Date().toLocaleDateString('en-CA')}
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
                                <strong>Estimated Cost</strong>
                                <span className="price">Ksh {editingBooking.tour.fees * editData.guests}</span>
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
                    <div className="modalContent">
                        <h3>Cancel Booking</h3>
                        <p style={{marginBottom: '1.5rem', color: 'var(--textColor)', textAlign: 'center'}}>
                            Are you sure you want to cancel your trip to <strong style={{color: 'var(--blackColor)'}}>{deletingBooking.tour.destTitle}</strong>?
                        </p>
                        <div className="inputDiv">
                            <label>Reason for cancellation</label>
                            <textarea 
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                placeholder="Please let us know why you are cancelling..."
                                style={{ minHeight: '120px' }}
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
