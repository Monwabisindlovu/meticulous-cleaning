import React from 'react';
import {
  FaFacebookF,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaInstagram
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="flex flex-col items-center space-y-6">
        {/* Social Media Icons */}
        <div className="footer-socials">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="facebook">
            <FaFacebookF size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="instagram">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="tiktok">
            <SiTiktok size={24} />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="youtube">
            <FaYoutube size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="twitter">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="linkedin">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>

        {/* Copyright */}
        <p>&copy; {new Date().getFullYear()} Meticulous Cleaning Services. All rights reserved.</p>

        {/* Developer Credit */}
        <p>
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
