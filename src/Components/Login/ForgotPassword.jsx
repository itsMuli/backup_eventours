import React, { useState } from 'react';
import './forgotPassword.css';
import { Link } from 'react-router-dom';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';

const ForgotPassword = () => {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mocking the reset link functionality
        if (email) {
            setSubmitted(true);
        }
    };

    return (
        <section className='forgotPasswordPage flex'>
            <div className="container flex">
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <h3>Reset Your Password</h3>
                        {!submitted && <p>Enter your email address and we'll send you a link to reset your password.</p>}
                    </div>

                    {submitted ? (
                        <div className="successContent" style={{textAlign: 'center', padding: '20px'}}>
                            <p style={{marginBottom: '20px'}}>A reset link has been sent to <strong>{email}</strong>. Please check your inbox.</p>
                            <Link to="/login">
                                <button className='btn'>Return to Login</button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className='form grid'>
                            <div className="inputDiv">
                                <label htmlFor="email">Email Address</label>
                                <div className="input flex">
                                    <MdMarkEmailRead className='icon'/>
                                    <input 
                                        type="email" 
                                        id='email' 
                                        placeholder='Enter your email' 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>

                            <button type='submit' className='btn flex'>
                                <span>Send Reset Link</span>
                                <AiOutlineSwapRight className='icon'/>
                            </button>
                        </form>
                    )}

                    {!submitted && (
                        <div className="footerDiv flex">
                            <span className="text">Remember your password?</span>
                            <Link to={'/login'}>
                                <button className='btn'>Login</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
