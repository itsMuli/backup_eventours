import React from 'react'
import './popular.css'
import {BsArrowLeftShort, BsArrowRightShort, BsDot} from 'react-icons/bs'
import img from '../../Images/img5.jpg'

const Popular = () => {
  return (
    <section className='popular-section container'>
        <div className="secContainer">

          <div className="secHeader flex">
            <div className="textDiv">
                <h2 className='secTitle'>
                  Popular Destination
                </h2>
                <p>
                  From historical cities to natural spectaculars, come see the beauty of Kenya!
                </p>
            </div>

            <div className="iconsDiv flex">
              <BsArrowLeftShort className='icon leftIcon'/>
              <BsArrowRightShort className='icon'/>
            </div>
          </div>

          <div className="mainContent grid">
            <div className="singleDestination">
              <div className="destImage">

                <img src={img} alt="Image title" />

                <div className="overlayInfo">
                  <h3>Welcome to Maasai Mara</h3>
                  <p>
                    The best park
                  </p>

                  <BsArrowRightShort className='icon'/>
                </div>

              </div>

              <div className="destFooter">
                <div className="number">
                  01
                </div>
                <div className="destText flex">
                  <h6>
                    Mombasa
                  </h6>
                  <span className='flex'>
                    <span className='dot'>
                      <BsDot className="icon"/>
                    </span>
                    Dot
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
    </section>
  )
}

export default Popular
