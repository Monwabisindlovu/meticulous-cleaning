import React from 'react';
import './Header.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../assets/logo.png';

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
          <Link
            to="/"
            className="text-white hover:text-yellow-300 transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            className="text-white hover:text-yellow-300 transition-colors duration-200"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="/booking"
            className="text-white hover:text-yellow-300 transition-colors duration-200"
          >
            Booking
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-white hover:text-yellow-300 transition-colors duration-200"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
