import React, { useEffect, useState } from 'react';
import "./home.css"

import Aos from 'aos';
import 'aos/dist/aos.css'

import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState({
        location: '',
        price: '',
        category: ''
    });

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const handleSearchInput = (e) => {
        const { name, value } = e.target;
        setSearchQuery(prev => ({ ...prev, [name]: value }));
    }

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery.location) params.append('location', searchQuery.location);
        if (searchQuery.price) params.append('price', searchQuery.price);
        if (searchQuery.category) params.append('category', searchQuery.category);
        
        navigate(`/packages?${params.toString()}`);
    }

    return (
        <section className='home'>
            <div className='secContainer container'>
                <div className='homeText'>
                    <h1 data-aos="fade-up" className='title'>
                        Plan Your Trip With EvenTours
                    </h1>
                    <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
                        Travel to your favourite city with respectful of the environment!
                    </p>

                    <button data-aos="fade-up" data-aos-duration="2500" className='btn'>
                        <Link to="/packages">Explore Now</Link>
                    </button>
                </div>

                <div className="homeCard grid">

                    <div data-aos="fade-right" data-aos-duration="2000" className="locationDiv">
                        <label htmlFor="location">Location</label>
                        <input type="text" name="location" placeholder='Destination' onChange={handleSearchInput}/>
                    </div>

                    <div data-aos="fade-right" data-aos-duration="2200" className="categoryDiv">
                        <label htmlFor="category">Category</label>
                        <select name="category" onChange={handleSearchInput}>
                            <option value="">All Categories</option>
                            <option value="Beach">Beach</option>
                            <option value="Safari">Safari</option>
                            <option value="Mountain">Mountain</option>
                            <option value="City">City</option>
                        </select>
                    </div>

                    <div data-aos="fade-right" data-aos-duration="2400" className="priceDiv">
                        <label htmlFor="price">Max Price</label>
                        <input type="number" name="price" placeholder='Budget' onChange={handleSearchInput}/>
                    </div>

                    <div className="btnDiv flex">
                        <button onClick={handleSearch} data-aos="fade-left" data-aos-duration="2500" className='btn'>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
