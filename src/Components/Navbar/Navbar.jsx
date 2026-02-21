import React, { useState, useEffect, useCallback } from 'react';
import "./navbar.css"
import { SiYourtraveldottv } from 'react-icons/si'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navbar = ({ openSupport }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState('navBar')
  const [transparent, setTransparent] = useState('header')
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName');

  const isAuthPage = ['/login', '/signup', '/forgot-password', '/packages', '/my-bookings'].includes(location.pathname);
  const isAdminView = location.pathname === '/admin';

  const showNav = () => { setActive('navBar activeNavbar') }
  const removeNav = () => { setActive('navBar') }

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    setShowProfileDropdown(false);
    removeNav();
    navigate('/');
    window.location.reload();
  }

  const addBg = useCallback(() => {
    if (window.scrollY >= 10 || isAuthPage) {
      setTransparent(isAuthPage ? 'header activeHeader authHeader' : 'header activeHeader')
    } else {
      setTransparent('header')
    }
  }, [isAuthPage]);

  useEffect(() => {
    addBg();
    window.addEventListener('scroll', addBg)
    return () => window.removeEventListener('scroll', addBg);
  }, [addBg]);

  const handleNavClick = (e, sectionId) => {
    removeNav();
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + sectionId);
    }
  }

  return (
    <section className='navBarSection'>
      <div className={transparent}>
        <div className='logoDiv'>
          <Link to='/' className='logo' onClick={() => { removeNav(); window.scrollTo(0, 0); }}>
            <h1 className='flex'><SiYourtraveldottv className="icon" />
              EvenTours
            </h1>
          </Link>
        </div>

        <div className={active}>
          <ul className='navLists flex'>
            {userRole !== 'admin' && (
              <>
                <li className='navItem'>
                  <a href="#popular" onClick={(e) => handleNavClick(e, '#popular')} className='navLink'>Popular</a>
                </li>
                <li className='navItem'>
                  <Link to="/packages" onClick={removeNav} className='navLink'>Packages</Link>
                </li>
                <li className='navItem'>
                  <a href="#blog" onClick={(e) => handleNavClick(e, '#blog')} className='navLink'>Blog</a>
                </li>
                <li className='navItem'>
                  <span className='navLink' onClick={() => { removeNav(); openSupport(); }}>Contact Us</span>
                </li>
              </>
            )}

            <div className="headerBtns flex">
              {isLoggedIn ? (
                <div className="userProfile">
                  <div className="profileTrigger flex" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                    <span className="userName">Hi, {userName?.split(' ')[0]}</span>
                    <div className="userAvatar">{userName?.charAt(0).toUpperCase()}</div>
                  </div>

                  {showProfileDropdown && (
                    <div className="profileDropdown">
                      {userRole !== 'admin' ? (
                        <>
                          <Link to="/my-bookings" onClick={() => setShowProfileDropdown(false)} className="dropdownItem">My Bookings</Link>
                          <div className="dropdownDivider"></div>
                          <span onClick={() => setShowLogoutModal(true)} className="dropdownItem logoutItem">Logout</span>
                        </>
                      ) : (
                        <>
                          <Link to="/admin" onClick={() => setShowProfileDropdown(false)} className="dropdownItem adminLink">Admin</Link>
                          <div className="dropdownDivider"></div>
                          <span onClick={() => setShowLogoutModal(true)} className="dropdownItem logoutItem" style={{fontSize: '0.7rem', opacity: 0.7}}>Logout</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button className='btn loginBtn' onClick={removeNav}>
                  <Link to="/login">Login</Link>
                </button>
              )}
            </div>
          </ul>

          <div onClick={() => { removeNav(); setShowProfileDropdown(false); }} className="closeNavbar">
            <FaTimes className='icon' />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <FaBars className="icon" />
        </div>
      </div>

      {showLogoutModal && (
        <div className="logoutModal flex">
          <div className="modalContent">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out of your account?</p>
            <div className="modalBtns flex">
              <button className="btn" onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button className="btn confirmBtn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Navbar
