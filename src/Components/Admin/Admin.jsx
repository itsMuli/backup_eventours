import React, { useState, useEffect } from 'react';
import './admin.css';
import { AiOutlineDelete, AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

const Admin = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        destTitle: '',
        location: '',
        category: 'Safari',
        fees: '',
        description: '',
        imgSrc: 'img11.jpg' // Default placeholder
    });

    const token = localStorage.getItem('token');

    const fetchTours = async () => {
        try {
            const response = await fetch('https://backup-eventours-backend.vercel.app/api/tours');
            const data = await response.json();
            if (response.ok) {
                setTours(data);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTours();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this package?')) return;

        try {
            const response = await fetch(`https://backup-eventours-backend.vercel.app/api/tours/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                fetchTours();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddPackage = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://backup-eventours-backend.vercel.app/api/tours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...formData, id: tours.length + 1 })
            });
            if (response.ok) {
                setShowAddModal(false);
                setFormData({
                    destTitle: '',
                    location: '',
                    category: 'Safari',
                    fees: '',
                    description: '',
                    imgSrc: 'img11.jpg'
                });
                fetchTours();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="adminSection container section">
            <div className="secIntro flex">
                <div>
                    <h2 className="secTitle">Admin Dashboard</h2>
                    <p>Manage travel packages and inventory.</p>
                </div>
                <button className="btn flex" onClick={() => setShowAddModal(true)}>
                    <AiOutlinePlus className="icon" /> Add New Package
                </button>
            </div>

            {loading ? (
                <div className="loading">Loading packages...</div>
            ) : (
                <div className="adminTableContainer">
                    <table className="adminTable">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Price (Ksh)</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tours.map(tour => (
                                <tr key={tour._id}>
                                    <td><img src={`Images/${tour.imgSrc}`} alt="" className="adminThumb" /></td>
                                    <td>{tour.destTitle}</td>
                                    <td>{tour.location}</td>
                                    <td>{tour.fees}</td>
                                    <td>{tour.category}</td>
                                    <td>
                                        <button className="deleteBtn" onClick={() => handleDelete(tour._id)}>
                                            <AiOutlineDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showAddModal && (
                <div className="adminModal flex">
                    <div className="modalContent">
                        <div className="modalHeader flex">
                            <h3>Add New Package</h3>
                            <AiOutlineClose className="icon" onClick={() => setShowAddModal(false)} />
                        </div>
                        <form onSubmit={handleAddPackage} className="grid">
                            <div className="inputDiv">
                                <label>Destination Title</label>
                                <input type="text" placeholder="e.g. DIANI BEACH" value={formData.destTitle} onChange={(e) => setFormData({...formData, destTitle: e.target.value})} required />
                            </div>
                            <div className="inputDiv">
                                <label>Location</label>
                                <input type="text" placeholder="e.g. Coastal Kenya" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
                            </div>
                            <div className="inputDiv flex">
                                <div className="field">
                                    <label>Category</label>
                                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                        <option value="Safari">Safari</option>
                                        <option value="Beach">Beach</option>
                                        <option value="Mountain">Mountain</option>
                                        <option value="City">City</option>
                                    </select>
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
                                <label>Image Name (from public/Images)</label>
                                <input type="text" placeholder="img11.jpg" value={formData.imgSrc} onChange={(e) => setFormData({...formData, imgSrc: e.target.value})} required />
                            </div>
                            <button type="submit" className="btn">Create Package</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Admin;
