import React from 'react';
import { Link } from 'react-router-dom';
import { FaBroom } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ServicesLinkSection = () => {
  return (
    <section className="services-link-section-modern">
      <div className="services-overlay">
        <motion.div
          className="services-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ rotate: 1 }}
        >
          <motion.div
            className="services-icon-modern"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FaBroom size={50} color="#ffffff" />
          </motion.div>

          <div className="services-text-modern">
            <h2>Explore Our Cleaning Services</h2>
            <p>
              From sparkling homes to spotless offices, we deliver meticulous cleaning for
              <strong> residences, schools, offices, and commercial spaces</strong>. Whether it’s a
              once-off deep clean or regular maintenance, we’re here to make every corner shine.
            </p>
            <Link to="/services" className="services-button-modern">
              View Services & Pricing →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesLinkSection;
