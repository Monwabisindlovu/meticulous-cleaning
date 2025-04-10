import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component
import Home from './pages/Home'; // Import Home page
import Booking from './pages/Booking'; // Import Booking page
import Services from './pages/Services'; // Import Services page
import Testimonials from './pages/Testimonials'; // Import Testimonials page
import 'font-awesome/css/font-awesome.min.css';


function App() {
  return (
    <Router>
      <Header /> {/* Header appears once here, wrapping around all routes */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />  {/* Booking route */}
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>

      <Footer /> {/* Footer appears once here */}
    </Router>
  );
}

export default App;
