import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <CartProvider> {/* Wrap everything with CartProvider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
