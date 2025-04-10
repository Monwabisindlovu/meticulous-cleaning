import React from 'react';
import './Header.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.png';  // Import logo image

const Header = () => (
  <header className="bg-blue-700 text-white py-4 shadow-xl flex items-center justify-between">
    {/* Logo and Name Section */}
    <div className="logo-container flex items-center gap-4">
      <img src={logo} alt="Meticulous Cleaning Services Logo" className="h-20 w-20 rounded-full" loading="lazy" />
      <h1 className="text-3xl font-bold">Meticulous Cleaning Services</h1>
    </div>

    {/* Navigation */}
    <nav>
      <ul className="flex space-x-6">
        <li>
          <a
            href="/"
            className="text-white hover:text-yellow-300 transition-colors duration-200"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/services"
            className="text-white hover:text-yellow-300 transition-colors duration-200"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="/booking"
            className="text-white hover:text-yellow-300 transition-colors duration-200"
          >
            Booking
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="text-white hover:text-yellow-300 transition-colors duration-200"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
