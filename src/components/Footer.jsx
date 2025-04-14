import React from 'react';
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="flex flex-col items-center space-y-6 text-white">

        {/* Contact Info in a single horizontal row */}
        <div className="footer-contact-row">
          <div className="footer-contact-item">
            <FaPhoneAlt className="phone-icon" />
            <a href="tel:+27628843771">+27 62 884 3771</a>
          </div>

          <div className="footer-contact-item">
            <FaWhatsapp className="whatsapp-icon" />
            <a href="https://wa.me/27628843771" target="_blank" rel="noopener noreferrer">
              +27 62 884 3771
            </a>
          </div>

          <div className="footer-contact-item">
            <FaEnvelope className="email-icon" />
            <a href="mailto:thembietshili@gmail.com">thembietshili@gmail.com</a>
          </div>

          <div className="footer-contact-item">
            <FaMapMarkerAlt className="location-icon" />
            <a
              href="https://www.google.com/maps?q=23+main+avenue,+Florida+1710"
              target="_blank"
              rel="noopener noreferrer"
            >
              23 Main Avenue, Florida 1710
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-300 text-center">
          &copy; {new Date().getFullYear()} Meticulous Cleaning Services. All rights reserved.
        </p>

        {/* Developer Credit */}
        <p className="text-sm text-gray-300 text-center">
          Designed & Developed by{" "}
          <a href="https://github.com/Monwabisindlovu" className="text-yellow-300 hover:underline">
            Monwabisi Ndlovu
          </a>
        </p>

        {/* Back to Top */}
        <a href="#top" className="text-sm text-yellow-300 hover:underline mt-2">
          Back to Top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
