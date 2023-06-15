import React from 'react';
import "./home.css"


const Home = () => {
  return (
    <section className='home'>
      <div className='secContainer container'>
        <div className='homeText'>
          <h1 className='title'>
            Plan Your Trip With EvenTours
          </h1>
          <p className="subTitle">
            Travel to your favourite city with respectful of the envieonment!
          </p>

          <button className='btn'>
            <a href="#">Explore Now</a>
          </button>
        </div>

        <div className="homeCard grid">

          <div className="locationDiv">
            <label htmlFor="location">Location</label>
            <input type="text" placeholder='Destination'/>
          </div>

          <div className="priceDiv">
            <label htmlFor="price">Price</label>
            <input type="text" placeholder='Price'/>
          </div>

          </div>
      </div>
    </section>
  )
}

export default Home
