import React, { useState } from 'react'
import './support.css'
import { AiOutlineClose, AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { BsCheckCircle } from 'react-icons/bs'

const SupportModal = ({ closeSupport }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [name, setName] = useState(localStorage.getItem('userName') || '');
    const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:5000/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ name, email, message, userId }),
            });


            if (response.ok) {
                setShowSuccess(true);
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to submit ticket');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    }

    return (
        <div className="supportModal flex">
            <div className="modalContent">
                <AiOutlineClose className="closeIcon icon" onClick={closeSupport} />
                
                {showSuccess ? (
                    <div className="successContent flex">
                        <BsCheckCircle className="successIcon icon" />
                        <h2>Ticket Submitted!</h2>
                        <p>Thank you for contacting us. Your support ticket has been successfully created. Our team will get back to you at your provided email address within 24 hours.</p>
                        <button className="btn" onClick={closeSupport}>Close</button>
                    </div>
                ) : (
                    <>
                        <div className="modalHeader">
                            <h2>Customer Support</h2>
                            <p>How can we help you today?</p>
                        </div>

                        <div className="modalBody grid">
                            <div className="contactInfo">
                                <div className="singleInfo flex">
                                    <AiOutlinePhone className="icon" />
                                    <div>
                                        <h4>Call Us</h4>
                                        <span>+254 757 366 382</span>
                                    </div>
                                </div>
                                <div className="singleInfo flex">
                                    <AiOutlineMail className="icon" />
                                    <div>
                                        <h4>Email Us</h4>
                                        <span>support@eventours.com</span>
                                    </div>
                                </div>
                                <div className="singleInfo flex">
                                    <HiOutlineLocationMarker className="icon" />
                                    <div>
                                        <h4>Visit Us</h4>
                                        <span>Travel Plaza, Nairobi, Kenya</span>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="supportForm">
                                {error && <p className="errorMsg" style={{color: 'red', marginBottom: '10px'}}>{error}</p>}
                                <div className="inputDiv">
                                    <label htmlFor="name">Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your name" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="inputDiv">
                                    <label htmlFor="email">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="inputDiv">
                                    <label htmlFor="message">How can we help?</label>
                                    <textarea 
                                        placeholder="Describe your issue or inquiry" 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn">Send Message</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default SupportModal
