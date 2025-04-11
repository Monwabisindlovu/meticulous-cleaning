import React, { useState } from "react";
import QuoteModal from "../components/QuoteModal";
import "./Services.css";

// Import background images
import windowCleaningImg from '../assets/window-cleaning.jpg';
import floorCleaningImg from '../assets/Floor_Cleaning.jpg';
import carpetCleaningImg from '../assets/carpet_cleaner.jpg';
import movingServicesImg from '../assets/moving-services.jpeg';
import vacuumingImg from '../assets/vaccuming.png';
import stainRemovalImg from '../assets/stain-removal.pjb.avif';
import pestControlImg from '../assets/pest-control.pjg.jpg';
import officeCleaningImg from '../assets/office-cleaning.jpg';
import deepCleaningImg from '../assets/deep-cleaning.jpg.jpg';

// Icons (used as fallback or for services without images)
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
    backgroundImage: windowCleaningImg,
  },
  {
    name: "Floor Cleaning",
    description: "Professional mopping, scrubbing, and polishing for all floor types.",
    price: "From R240",
    imageBackground: true,
    backgroundImage: floorCleaningImg,
  },
  {
    name: "Carpet Cleaning",
    description: "Deep cleaning to remove dirt, stains, and odors from your carpets.",
    price: "From R240",
    imageBackground: true,
    backgroundImage: carpetCleaningImg,
  },
  {
    name: "Moving Services",
    description: "Packing, lifting, and moving services to make relocation easier.",
    price: "From R240",
    imageBackground: true,
    backgroundImage: movingServicesImg,
  },
  {
    name: "Vacuuming",
    description: "Thorough vacuuming of all carpets and floors, including corners and under furniture.",
    price: "From R240",
    imageBackground: true,
    backgroundImage: vacuumingImg,
  },
  {
    name: "Dirt/Stain Removal",
    description: "Targeted cleaning to eliminate tough dirt and stains from surfaces.",
    price: "From R240",
    imageBackground: true,
    backgroundImage: stainRemovalImg,
  },
  {
    name: "Pest Control",
    description: "Effective pest control solutions for homes and businesses to ensure a safe and healthy environment.",
    price: "From R240",
    imageBackground: true,
    backgroundImage: pestControlImg,
  },
  {
    name: "Office Cleaning",
    description: "Customized office cleaning solutions to maintain a clean and productive workspace.",
    price: "From R240",
    imageBackground: true,
    backgroundImage: officeCleaningImg,
  },
  {
    name: "Deep Cleaning",
    description: "Comprehensive cleaning for areas that require extra attention, ideal for post-renovation or seasonal cleaning.",
    price: "From R240",
    imageBackground: true,
    backgroundImage: deepCleaningImg,
  },
];

const Services = () => {
  const [quoteModal, setQuoteModal] = useState({ open: false, service: "", basePrice: 240 });

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
            <div>
              <button
                className="book-now-btn"
                onClick={() =>
                  setQuoteModal({ open: true, service: service.name, basePrice: 240 })
                }
              >
                Get a Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {quoteModal.open && (
        <QuoteModal
          service={quoteModal.service}
          basePrice={quoteModal.basePrice}
          onClose={() => setQuoteModal({ ...quoteModal, open: false })}
        />
      )}
    </div>
  );
};

export default Services;
