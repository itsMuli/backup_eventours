import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';
import { BsFillShieldLockFill } from 'react-icons/bs';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://backup-eventours-backend.vercel.app/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('userName', data.username);
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data._id);
                localStorage.setItem('userRole', data.role);
                
                navigate('/');
                window.location.reload(); 
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <section className='loginPage flex'>
            <div className="container flex">
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <h3>Welcome Back!</h3>
                    </div>

                    <form onSubmit={handleLogin} className='form grid'>
                        {error && <p className="errorMsg" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                        <div className="inputDiv">
                            <label htmlFor="username">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className='icon'/>
                                <input 
                                    type="email" 
                                    id='username' 
                                    placeholder='Enter Email' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon'/>
                                <input 
                                    type="password" 
                                    id='password' 
                                    placeholder='Enter Password' 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <button type='submit' className='btn flex'>
                            <span>Login</span>
                            <AiOutlineSwapRight className='icon'/>
                        </button>

                        <span className='forgotPassword'>
                            Forgot your password? <Link to="/forgot-password">Click Here</Link>
                        </span>
                    </form>

                    <div className="footerDiv flex">
                        <span className="text">Don't have an account?</span>
                        <Link to={'/signup'}>
                            <button className='btn'>Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
