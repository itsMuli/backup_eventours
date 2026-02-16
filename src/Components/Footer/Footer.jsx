import React from 'react'
import "./footer.css"
import { SiYourtraveldottv } from 'react-icons/si'
import { BsTwitter } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import { ImFacebook } from 'react-icons/im'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Footer = ({ openSupport }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleFooterLinkClick = (e, sectionId) => {
        if (location.pathname !== '/') {
            e.preventDefault();
            navigate('/' + sectionId);
        }
    }

    return (
        <div className="footer">
            <div className="secContainer container grid">
                
                {/* Brand & Socials Section */}
                <div className="footerSection brandSection">
                    <div className="footerLogo">
                        <Link to="/" className="logo flex" onClick={() => window.scrollTo(0,0)}>
                            <SiYourtraveldottv className="icon" />
                            <span>EvenTours</span>
                        </Link>
                    </div>
                    <p className="footerText">
                        Your preferred travel partner for exploring the hidden gems and spectacular beauty of Kenya. Let's make your journey unforgettable.
                    </p>
                    <div className="socials flex">
                        <ImFacebook className='icon' />
                        <BsTwitter className='icon' />
                        <AiFillInstagram className='icon' />
                    </div>
                </div>

                {/* Information Links Section */}
                <div className="footerSection linkSection">
                    <span className="sectionTitle">Explore</span>
                    <ul className="footerLinks">
                        <li><a href="#popular" onClick={(e) => handleFooterLinkClick(e, '#popular')}>Popular Destinations</a></li>
                        <li><Link to="/packages" onClick={() => window.scrollTo(0,0)}>Tour Packages</Link></li>
                        <li><a href="#blog" onClick={(e) => handleFooterLinkClick(e, '#blog')}>Travel Blog</a></li>
                        <li><span className="footerSpan" onClick={openSupport}>Support Center</span></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footerSection contactSection">
                    <span className="sectionTitle">Get In Touch</span>
                    <div className="contactDetails">
                        <span className="phone">+254 757 366 382</span>
                        <span className="email">support@eventours.com</span>
                        <span className="address">Travel Plaza, Nairobi, Kenya</span>
                    </div>
                </div>

            </div>
            
            <div className="footerBottom">
                <p>© 2026 EvenTours - All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
