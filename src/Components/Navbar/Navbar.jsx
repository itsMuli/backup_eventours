import React from 'react';
import "./navbar.css"
import {SiYourtraveldottv} from 'react-icons/si'


const Navbar = () => {
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
        <div className="navBar">
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
              <a href="#" className='navLink'>Offers</a>
            </li>

            <li className='navItem'>
              <a href="#" className='navLink'>Blog</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Navbar
