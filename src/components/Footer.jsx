import React from 'react';
import { FaFacebookF, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="flex flex-col items-center space-y-6">
        {/* Social Media Icons */}
        <div className="footer-socials">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
            <FaFacebookF size={24} />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
            <FaYoutube size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
        </div>

        {/* Copyright */}
        <p className="text-sm mt-4">
          &copy; {new Date().getFullYear()} Meticulous Cleaning Services. All rights reserved.
        </p>

        {/* Developer Credit */}
        <p className="text-sm mt-2">
          Designed & Developed by{" "}
          <a href="https://github.com/Monwabisindlovu" className="text-yellow-300 hover:underline">
            Monwabisi Ndlovu
          </a>
        </p>

        {/* Back to Top */}
        <a href="#top" className="text-sm text-yellow-300 hover:underline mt-4">
          Back to Top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
