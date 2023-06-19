import React from 'react'
import './popular.css'
import {BsArrowLeftShort} from 'react-icons/bs'
import { BsArrowRightShort } from 'react-icons/bs'
import { BsDot } from 'react-icons/bs'
import img3 from '../../Images/img3.jpg'
import img6 from '../../Images/img6.jpg'
import img7 from '../../Images/img7.jpg'
import img8 from '../../Images/img8.jpg'
import img1 from '../../Images/img1.jpg'

const Data = [
  {
    id:1,
    imgSrc: img1,
    destTitle: 'Malindi',
    location: 'Mombasa',
    grade: 'HOLIDAY',
  },

  {
    id:2,
    imgSrc: img3,
    destTitle: 'Malindi',
    location: 'Mombasa',
    grade: 'HOLIDAY',
  },

  {
    id:3,
    imgSrc: img6,
    destTitle: 'Malindi',
    location: 'Mombasa',
    grade: 'HOLIDAY',
  },

  {
    id:4,
    imgSrc: img7,
    destTitle: 'Malindi',
    location: 'Mombasa',
    grade: 'HOLIDAY',
  },

  {
    id:5,
    imgSrc: img8,
    destTitle: 'Malindi',
    location: 'Mombasa',
    grade: 'HOLIDAY',
  },
]

const Popular = () => {
  return (
    <section className='popular section container'>
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
            {
              Data.map(({id,imgSrc,destTitle,location,grade})=>{
                return(
                  <div className="singleDestination">
                    <div className="destImage">

                    <img src={imgSrc} alt="Image title" />

                    <div className="overlayInfo">
                      <h3>{destTitle}</h3>
                        <p>
                          {location}
                        </p>

                      <BsArrowRightShort className='icon'/>
                    </div>

                  </div>

                   <div className="destFooter">
                   <div className="number">
                      0{id}
                    </div>
                  <div className="destText flex">
                      <h6>
                        {location}
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
                )
              })
            }

          </div>

        </div>
    </section>
  )
}

export default Popular
