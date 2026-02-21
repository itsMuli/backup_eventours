import React, { useState } from 'react';
import "./app.css"
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Blog from './Components/Blog/Blog';
import Packages from './Components/Packages/Packages';
import Popular from './Components/Popular/Popular';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ForgotPassword from './Components/Login/ForgotPassword';
import SupportModal from './Components/Support/SupportModal';
import Bookings from './Components/Bookings/Bookings';
import Admin from './Components/Admin/Admin';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const userRole = localStorage.getItem('userRole');

  const toggleSupport = () => {
    setIsSupportOpen(!isSupportOpen);
  }

  return (
    <>
      <Navbar openSupport={toggleSupport} />
      {isSupportOpen && <SupportModal closeSupport={toggleSupport} />}
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Popular />
            <Packages />
            <Blog />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/my-bookings" element={<Bookings />} />
        {userRole === 'admin' && <Route path="/admin" element={<Admin />} />}
      </Routes>

      <Footer openSupport={toggleSupport} />
    </>
  )
}

export default App
