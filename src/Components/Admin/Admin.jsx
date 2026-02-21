import React, { useState, useEffect } from 'react';
import './admin.css';
import { 
    AiOutlinePlus, AiOutlineDelete, AiOutlineClose,
    AiOutlineRise, AiOutlineTag, AiOutlineCarryOut, AiOutlineMessage
} from 'react-icons/ai';

const Admin = () => {
    const [stats, setStats] = useState(null);
    const [tours, setTours] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        destTitle: '', location: '', category: 'Safari', fees: '', description: '', imgSrc: 'img11.jpg'
    });

    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const [anaRes, tourRes, bookRes, tickRes] = await Promise.all([
                fetch('https://backup-eventours-backend.vercel.app/api/admin/analytics', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('https://backup-eventours-backend.vercel.app/api/tours'),
                fetch('https://backup-eventours-backend.vercel.app/api/bookings', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('https://backup-eventours-backend.vercel.app/api/tickets', { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            const [anaData, tourData, bookData, tickData] = await Promise.all([
                anaRes.json(), tourRes.json(), bookRes.json(), tickRes.json()
            ]);

            setStats(anaData.stats);
            setTours(tourData);
            setBookings(bookData);
            setTickets(tickData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDeleteTour = async (id) => {
        if (!window.confirm('Delete this package?')) return;
        try {
            const res = await fetch(`https://backup-eventours-backend.vercel.app/api/tours/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchData();
        } catch (err) { console.error(err); }
    };

    const handleAddTour = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://backup-eventours-backend.vercel.app/api/tours', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ ...formData, id: Date.now() })
            });
            if (res.ok) {
                setShowAddModal(false);
                fetchData();
            }
        } catch (err) { console.error(err); }
    };

    if (loading) return <div className="adminLoading">Refining Dashboard...</div>;

    return (
        <div className="adminContainer section">
            <div className="analyticsHeader flex">
                <h1>Admin Overview</h1>
                <button className="btn flex" onClick={() => setShowAddModal(true)}>
                    <AiOutlinePlus /> New Package
                </button>
            </div>

            <div className="analyticsGrid">
                <div className="anaCard">
                    <AiOutlineRise className="anaIcon" />
                    <div>
                        <span>Total Revenue</span>
                        <h4>Ksh {stats?.totalRevenue?.toLocaleString()}</h4>
                    </div>
                </div>
                <div className="anaCard">
                    <AiOutlineCarryOut className="anaIcon" />
                    <div>
                        <span>Bookings</span>
                        <h4>{stats?.totalBookings}</h4>
                    </div>
                </div>
                <div className="anaCard">
                    <AiOutlineTag className="anaIcon" />
                    <div>
                        <span>Packages</span>
                        <h4>{stats?.totalPackages}</h4>
                    </div>
                </div>
                <div className="anaCard">
                    <AiOutlineMessage className="anaIcon" />
                    <div>
                        <span>Tickets</span>
                        <h4>{stats?.totalTickets}</h4>
                    </div>
                </div>
            </div>

            <div className="dashboardMain grid">
                <section className="dashboardSection">
                    <div className="sectionHeader flex">
                        <h3>Active Packages</h3>
                    </div>
                    <div className="packageList">
                        {tours.map(t => (
                            <div key={t._id} className="packageItem flex">
                                <img src={`Images/${t.imgSrc}`} alt="" />
                                <div className="pInfo">
                                    <h5>{t.destTitle}</h5>
                                    <p>Ksh {t.fees}</p>
                                </div>
                                <AiOutlineDelete className="delBtn" onClick={() => handleDeleteTour(t._id)} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="dashboardSection">
                    <div className="sectionHeader flex">
                        <h3>Recent Bookings</h3>
                    </div>
                    <div className="scrollTable">
                        <table className="miniTable">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Tour</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.slice(0, 10).map(b => (
                                    <tr key={b._id}>
                                        <td>{b.user?.username}</td>
                                        <td>{b.tour?.destTitle}</td>
                                        <td><span className={`badge ${b.status}`}>{b.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="dashboardSection fullWidth">
                    <div className="sectionHeader flex">
                        <h3>Support Inbox</h3>
                    </div>
                    <div className="ticketList grid">
                        {tickets.slice(0, 4).map(t => (
                            <div key={t._id} className="ticketItem">
                                <div className="tHead flex">
                                    <strong>{t.name}</strong>
                                    <small>{new Date(t.createdAt).toLocaleDateString()}</small>
                                </div>
                                <p>{t.message}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {showAddModal && (
                <div className="adminModal flex">
                    <div className="modalContent">
                        <div className="modalHeader flex">
                            <h3>Add New Package</h3>
                            <AiOutlineClose className="icon" onClick={() => setShowAddModal(false)} />
                        </div>
                        <form onSubmit={handleAddTour} className="grid">
                            <div className="inputDiv">
                                <label>Destination Title</label>
                                <input type="text" placeholder="e.g. DIANI BEACH" value={formData.destTitle} onChange={(e) => setFormData({...formData, destTitle: e.target.value})} required />
                            </div>
                            <div className="inputDiv flex">
                                <div className="field">
                                    <label>Location</label>
                                    <input type="text" placeholder="Coastal Kenya" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
                                </div>
                                <div className="field">
                                    <label>Price (Ksh)</label>
                                    <input type="number" placeholder="25000" value={formData.fees} onChange={(e) => setFormData({...formData, fees: e.target.value})} required />
                                </div>
                            </div>
                            <div className="inputDiv">
                                <label>Description</label>
                                <textarea placeholder="Package details..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                            </div>
                            <div className="inputDiv">
                                <label>Image Name</label>
                                <input type="text" placeholder="img11.jpg" value={formData.imgSrc} onChange={(e) => setFormData({...formData, imgSrc: e.target.value})} required />
                            </div>
                            <button type="submit" className="btn">Publish Package</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
