import React from 'react';
import './packages.css'

const Packages = () => {
  return (
    <section className='packages container section'>
      <div className="secContainer">
        <div className="secIntro">
          <h2 className='secTitle'>
            Our Packages
          </h2>
          <p>
            From historical cities to natural specteculars, come tour the beauty of Kenya.
            Our Packages are extremely affordable with good deals and offers!!
          </p>
        </div>

        <div className="mainContent grid">

          <div className="singlePackage">
              <div className="destImage">
                <img src="" alt="Image Name" />

                <span className="discount">
                  30% Off
                </span>
              </div>

              <div className="packageBody">
                <div className="price flex">
                  <h4>
                    Ksh 21,000
                  </h4>
                  <span className="status">
                    For Booking
                  </span>
                </div>

                <div className="amenities flex">
                  <div className="singleAmenity flex">
                    
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Packages
