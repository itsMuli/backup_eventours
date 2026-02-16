import React from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { FaUserShield } from 'react-icons/fa';

const Signup = () => {
    return (
        <section className='signupPage flex'>
            <div className="container flex">
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <h3>Create Your Account</h3>
                    </div>

                    <form action="" className='form grid'>
                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className='icon'/>
                                <input type="email" id='email' placeholder='Enter Email' />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon'/>
                                <input type="text" id='username' placeholder='Enter Username' />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon'/>
                                <input type="password" id='password' placeholder='Enter Password' />
                            </div>
                        </div>

                        <button type='submit' className='btn flex'>
                            <span>Register</span>
                            <AiOutlineSwapRight className='icon'/>
                        </button>
                    </form>

                    <div className="footerDiv flex">
                        <span className="text">Already have an account?</span>
                        <Link to={'/login'}>
                            <button className='btn'>Login</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
