import React, { useState, useEffect } from 'react';
import "./navbar.css"
import { SiYourtraveldottv } from 'react-icons/si'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navbar = ({ openSupport }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState('navBar')
  const [transparent, setTransparent] = useState('header')
  
  // Track login state for UI toggling
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const isAuthPage = ['/login', '/signup', '/forgot-password', '/packages'].includes(location.pathname);

  const showNav = () => {
    setActive('navBar activeNavbar')
  }

  const removeNav = () => {
    setActive('navBar')
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    removeNav();
    navigate('/');
    window.location.reload();
  }

  const addBg = () => {
    if (window.scrollY >= 10 || isAuthPage) {
      setTransparent(isAuthPage ? 'header activeHeader authHeader' : 'header activeHeader')
    }
    else {
      setTransparent('header')
    }
  }

  useEffect(() => {
    addBg();
    window.addEventListener('scroll', addBg)
    return () => window.removeEventListener('scroll', addBg);
  }, [location.pathname]);

  const handleNavClick = (e, sectionId) => {
    removeNav();
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + sectionId);
    }
  }

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname, location.hash]);

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

            <div className="headerBtns flex">
              {isLoggedIn ? (
                <button className='btn logoutBtn' onClick={handleLogout}>
                   <span>Logout</span>
                </button>
              ) : (
                <button className='btn loginBtn' onClick={removeNav}>
                  <Link to="/login">Login</Link>
                </button>
              )}
            </div>

          </ul>

          <div onClick={removeNav}
            className="closeNavbar">
            <FaTimes className='icon' />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <FaBars className="icon" />
        </div>
      </div>
    </section>
  )
}

export default Navbar
