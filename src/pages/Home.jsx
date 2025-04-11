import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';

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

      {/* Call to Action */}
      <section className="cta">
        <h3>Ready to Experience Spotless Clean?</h3>
        <div className="contact-links">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaWhatsapp size={30} color="#25D366" />
            <span>Contact Us via WhatsApp</span>
          </a>
          <a
            href="mailto:info@example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaEnvelope size={30} color="#EA4335" />
            <span>Contact Us via Email</span>
          </a>
          <a
            href="tel:+1234567890"
            className="contact-link"
          >
            <FaPhone size={30} color="#34B7F1" />
            <span>Call Us</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
