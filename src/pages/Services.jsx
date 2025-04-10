// src/pages/Services.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";
import windowCleaningImg from '../assets/window-cleaning.jpg';

import {
  FaCogs, FaTruck, FaTrash, FaBug,
  FaBuilding, FaHeart, FaBroom, FaRegDotCircle
} from "react-icons/fa";

const services = [
  {
    name: "Window Cleaning",
    description: "Crystal clear windows, inside and out. Streak-free shine every time.",
    price: "From R240",
    imageBackground: true,
    backgroundImage: windowCleaningImg
  },
  {
    name: "Floor Cleaning",
    description: "Professional mopping, scrubbing, and polishing for all floor types.",
    price: "From R240",
    icon: <FaBroom />
  },
  {
    name: "Carpet Cleaning",
    description: "Deep cleaning to remove dirt, stains, and odors from your carpets.",
    price: "From R240",
    icon: <FaCogs />
  },
  {
    name: "Moving Services",
    description: "Packing, lifting, and moving services to make relocation easier.",
    price: "From R240",
    icon: <FaTruck />
  },
  {
    name: "Vacuuming",
    description: "Thorough vacuuming of all carpets and floors, including corners and under furniture.",
    price: "From R240",
    icon: <FaRegDotCircle />
  },
  {
    name: "Dirt/Stain Removal",
    description: "Targeted cleaning to eliminate tough dirt and stains from surfaces.",
    price: "From R240",
    icon: <FaTrash />
  },
  {
    name: "Pest Control",
    description: "Effective pest control solutions for homes and businesses to ensure a safe and healthy environment.",
    price: "From R240",
    icon: <FaBug />
  },
  {
    name: "Office Cleaning",
    description: "Customized office cleaning solutions to maintain a clean and productive workspace.",
    price: "From R240",
    icon: <FaBuilding />
  },
  {
    name: "Deep Cleaning",
    description: "Comprehensive cleaning for areas that require extra attention, ideal for post-renovation or seasonal cleaning.",
    price: "From R240",
    icon: <FaHeart />
  }
];

const Services = () => {
  return (
    <div className="services-page">
      <h1>Our Cleaning Services</h1>
      <p className="subtitle">We provide meticulous cleaning services at affordable prices.</p>

      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-card ${service.imageBackground ? 'image-bg-card' : ''}`}
            style={
              service.imageBackground
                ? { backgroundImage: `url(${service.backgroundImage})` }
                : {}
            }
          >
            {!service.imageBackground && (
              <div className="service-icon">{service.icon}</div>
            )}

            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p className="price">{service.price}</p>
            <Link to="/booking" className="book-now-btn">Book Now</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
