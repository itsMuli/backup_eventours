import React, { useState } from 'react'
import './support.css'
import { AiOutlineClose, AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { BsCheckCircle } from 'react-icons/bs'

const SupportModal = ({ closeSupport }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccess(true);
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
                                <div className="inputDiv">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" placeholder="Enter your name" required />
                                </div>
                                <div className="inputDiv">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" placeholder="Enter your email" required />
                                </div>
                                <div className="inputDiv">
                                    <label htmlFor="message">How can we help?</label>
                                    <textarea placeholder="Describe your issue or inquiry" required></textarea>
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
