import React from 'react';
import './forgotPassword.css';
import { Link } from 'react-router-dom';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';

const ForgotPassword = () => {
    return (
        <section className='forgotPasswordPage flex'>
            <div className="container flex">
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <h3>Reset Your Password</h3>
                        <p>Enter your email address and we'll send you a link to reset your password.</p>
                    </div>

                    <form action="" className='form grid'>
                        <div className="inputDiv">
                            <label htmlFor="email">Email Address</label>
                            <div className="input flex">
                                <MdMarkEmailRead className='icon'/>
                                <input type="email" id='email' placeholder='Enter your email' />
                            </div>
                        </div>

                        <button type='submit' className='btn flex'>
                            <span>Send Reset Link</span>
                            <AiOutlineSwapRight className='icon'/>
                        </button>
                    </form>

                    <div className="footerDiv flex">
                        <span className="text">Remember your password?</span>
                        <Link to={'/login'}>
                            <button className='btn'>Login</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
