import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInfoCircle,
  FaShieldAlt,
  FaFileContract,
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

import heroImage from '../assets/cleaning-hero.jpg';
import './Home.css';

import ZipCodeChecker from '@/components/ZipCodeChecker';
import OurWorkPreview from '@/components/OurWorkPreview';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '100px 20px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div className="hero-text-box">
          <h1>Meticulous Cleaning Services</h1>
          <p>Where Cleanliness Meets Perfection</p>

          <Link to="/booking">
            <button>Book Now</button>
          </Link>
        </div>
      </section>

      {/* Zip Code Checker */}
      <section className="zip-code-checker">
        <ZipCodeChecker />
      </section>

      {/* Our Work Preview */}
      <OurWorkPreview />

      {/* Services and Pricing Link */}
      <section className="services-link">
        <Link to="/services">View All Services & Pricing →</Link>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <Link to="/testimonials" className="view-all-reviews">View All Reviews → ★★★★☆</Link>
      </section>

      {/* Footer-style Section */}
      <section className="footer-section-on-home">
        <div className="footer-grid">
          {/* Legal Links */}
          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/about"><FaInfoCircle /> About Us</Link>
            <Link to="/privacy-policy"><FaShieldAlt /> Privacy Policy</Link>
            <Link to="/terms"><FaFileContract /> Terms & Conditions</Link>
          </div>

          {/* Social Media */}
          <div className="footer-column">
            <h4>Follow Us</h4>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /> Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><SiTiktok /> TikTok</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /> YouTube</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h4>Contact Us</h4>
            <p><FaPhone /> +27 61 234 5678</p>
            <p><FaEnvelope /> info@meticulouscleaning.co.za</p>
            <p><FaWhatsapp /> +27 61 234 5678</p>
            <p><FaWhatsapp /> +27 72 345 6789</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
