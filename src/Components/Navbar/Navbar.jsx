import React, {useState} from 'react';
import "./navbar.css"
import {SiYourtraveldottv} from 'react-icons/si'
import {AiFillCloseCircle} from 'react-icons/ai'
import {TbGridDots} from 'react-icons/tb'

const Navbar = () => {

  const [active, setActive] = useState('navBar')
  const showNav =()=>{
    setActive('navBar activeNavbar')
  }

  const removeNav =()=>{
    setActive('navBar')
  }


  return (
    <section className='navBarSection'>
      <div className='header'>

        <div className='logoDiv'>
          <a href='#' className='logo'>
            <h1 className='flex'><SiYourtraveldottv className="icon"/>
            EvenTours
            </h1>
          </a>
        </div>
        <div className={active}>
          <ul className='navLists flex'>

            <li className='navItem'>
              <a href="#" className='navLink'>Home</a>
            </li>

            <li className='navItem'>
              <a href="#" className='navLink'>About</a>
            </li>

            <li className='navItem'>
              <a href="#" className='navLink'>Popular Destinations</a>
            </li>

            <li className='navItem'>
              <a href="#" className='navLink'>Packages</a>
            </li>

            <li className='navItem'>
              <a href="#" className='navLink'>Blog</a>
            </li>

            <div className="headerBtns flex">
              <button className='btn loginBtn'>
                <a href="#">LogIn</a>
              </button>
              <button className='btn'>
                <a href="#">Sign Up</a>
              </button>
            </div>

          </ul>

          <div onClick={removeNav}
          className="closeNavbar">
            <AiFillCloseCircle className='icon'/>
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon"/>
        </div>
      </div>
    </section>
  )
}

export default Navbar
