import React from 'react';
import "./app.css"
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Blog from './Components/Blog/Blog';
import Packages from './Components/Packages/Packages';
import Popular from './Components/Popular/Popular';

const App = () => {
  return (
   <>
   <Navbar />
   <Home />
   {/* <Popular />
   <Packages />
   <About />
   <Blog />
   <Footer /> */}
   </>
  )
}

export default App
