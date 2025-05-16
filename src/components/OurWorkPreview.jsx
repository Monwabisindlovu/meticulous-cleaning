import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import carpet from "../assets/carpet-after and before.jpg";
import beforeAfter from "../assets/before-and-after-cleaning.jpg";
import kitchenSink from "../assets/after-cleaning.jpg";
import stainRemovalImg from "../assets/stain-removal.jpg";
import macrowaveBefore from "../assets/macrowave.before.jpg";
import microwaveAfter from "../assets/microwave-after.jpg";
import after1 from "../assets/after1.jpg";
import before1 from "../assets/before1.jpg";

const previewImages = [
  {
    src: carpet,
    label: "Our Work Result",
    story: "After our deep clean, the client's rug looked brand new.",
  },
  {
    src: beforeAfter,
    label: "Floor Transformation",
    story: "Before-and-after results of a deep floor clean.",
  },
  {
    src: kitchenSink,
    label: "Kitchen Sink Revamp",
    story: "Greasy buildup eliminated, leaving the sink sparkling clean.",
  },
];

const allImages = [
  ...previewImages,
  {
    src: stainRemovalImg,
    label: "Stain Removal",
    story: "Grease and wine stains lifted from the couch fabric.",
  },
  {
    src: macrowaveBefore,
    label: "Microwave Before",
    story: "Heavy stains inside the microwave before cleaning.",
  },
  {
    src: microwaveAfter,
    label: "Microwave After",
    story: "Shiny and spotless microwave after professional cleaning.",
  },
  {
    src: before1,
    label: "Room Before",
    story: "Cluttered and dusty room before our service.",
  },
  {
    src: after1,
    label: "Room After",
    story: "Neatly arranged and freshly cleaned space.",
  },
];

const OurWorkPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <section className="our-work-gallery">
      <div className="our-work-wrapper">
        <h2>Our Work Speaks for Itself</h2>

        <div className="intro-gallery-container">
          <div className="intro-card">
            <p>
              At <strong>Meticulous Cleaning Services</strong>, we don't just clean — we transform.
              Whether it’s a stained carpet, a greasy kitchen, or a cluttered room, our skilled team
              brings spaces back to life with precision, care, and expertise.
            </p>
            <p>
              Below are real before-and-after results from clients who entrusted us with their homes and offices.
              Experience the power of professional cleaning done right.
            </p>
          </div>

          <div className="gallery-preview">
            {previewImages.map((img, index) => (
              <div className="gallery-item" key={index}>
                <img
                  src={img.src}
                  alt={img.label}
                  onClick={() => {
                    setPhotoIndex(index);
                    setIsOpen(true);
                  }}
                  className="preview-img"
                />
                <p className="image-label"><strong>{img.label}</strong></p>
                <p className="client-story">{img.story}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="btn-container">
          <button
            className="view-more-btn"
            onClick={() => {
              setIsOpen(true);
              setPhotoIndex(0);
            }}
          >
            📸 View Full Gallery
          </button>
        </div>

        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={allImages.map((img) => ({
              src: img.src,
              description: `${img.label} - ${img.story || ""}`,
            }))}
            index={photoIndex}
            carousel={{ finite: false }}
            animation={{ fade: 250 }}
            controller={{ closeOnBackdropClick: true }}
          />
        )}
      </div>
    </section>
  );
};

export default OurWorkPreview;
