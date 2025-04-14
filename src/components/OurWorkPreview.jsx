import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import updatedAfterCleaning from '../assets/before-and-after-cleaning.jpg';
import after1AndAfter from '../assets/after1 and after.webp';
import roomBeforeAfter from '../assets/room-before and after cleaning.jpeg';
import carpetSlider from '../assets/carpet-after and before.jpg';
import microwaveBefore from '../assets/macrowave.before.jpg';
import microwaveAfter from '../assets/microwave-after.jpg';

const allImages = [
  {
    src: updatedAfterCleaning,
    label: 'Before & After Deep Clean',
    story: 'Watch how this space was completely transformed with our expert deep cleaning service.'
  },
  {
    src: after1AndAfter,
    label: 'After Touch-Up',
    story: "Built-up grime was no match for our team — this fridge is now spotless and fresh inside."
  },
  {
    src: microwaveBefore,
    label: 'Microwave – Before',
    story: 'This microwave had built-up grime until we gave it a full interior clean.'
  },
  {
    src: microwaveAfter,
    label: 'Microwave – After',
    story: 'A complete turnaround – safe, fresh, and ready to use.'
  },
  {
    src: roomBeforeAfter,
    label: 'Room Transformation',
    story: 'This room had tough dirt build-up, but a deep clean brought it back to life.'
  },
  {
    src: carpetSlider,
    label: 'Carpet Renewal',
    story: 'Carpet transformation from dull to dazzling – all in one visit.'
  }
];

const OurWorkPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const previewImages = allImages.slice(0, 2); // Show only first two images

  return (
    <section className="our-work-gallery">
      <h2>Our Work</h2>
<p>
  At <strong>Meticulous Cleaning Services</strong>, we go beyond basic cleaning —
  we deliver transformations. From kitchens and carpets to offices and appliances,
  our expert team tackles dirt, stains, and clutter with precision.
  These photos showcase real before-and-after results from our happy clients,
  highlighting the visible difference a professional clean can make.
</p>
<p>
  Whether it's a deeply stained carpet or a messy microwave, our work speaks for itself.
  Browse our gallery and see how we restore shine, freshness, and comfort to every space.
</p>

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

      <button className="view-more-btn" onClick={() => {
        setIsOpen(true);
        setPhotoIndex(0);
      }}>
        📸 View More Images
      </button>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={allImages.map((img) => ({
            src: img.src,
            description: `${img.label} - ${img.story || ''}`
          }))}
          index={photoIndex}
          carousel={{ finite: false }}
          animation={{ fade: 250 }}
          controller={{ closeOnBackdropClick: true }}
        />
      )}
    </section>
  );
};

export default OurWorkPreview;
