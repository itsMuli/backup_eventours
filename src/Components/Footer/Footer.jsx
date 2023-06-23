import React from 'react'
import "./footer.css"
import { SiYourtraveldottv } from 'react-icons/si'
import { BsTwitter } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import { ImFacebook } from 'react-icons/im'

const Footer = () => {
  return (
    <div className="footer">
      <div className="secContainer container grid">
        <div className="logoDiv">

          <div className="footerLogo">
            <a href="#" className="logo flex">
              <h1 className='flex'> <SiYourtraveldottv className="icon"/>
              EvenTours</h1>
            </a>
          </div>

          <div className="socials flex">
          <ImFacebook className='icon'/>
          <BsTwitter className='icon'/>
          <AiFillInstagram className='icon'/>
        </div>

        </div>

        <div className="footerLinks">
          <span className="linkTitles">
            Helpful Links
          </span>
          <li>
            <a href="#">Destination</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Travel & Condition</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </div>

        <div className="footerLinks">
          <span className="linkTitles">
            Contact Us
          </span>
        <span className="phone">+25457366382</span>
        <span className="email">eventours@gmail.com</span>
        </div>

      </div>
    </div>
  )
}

export default Footer
