import React, { useState } from 'react'; 
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import ReactCompareImage from 'react-compare-image';

import updatedAfterCleaning from '../assets/before-and-after-cleaning.jpg'; // Replaces "afterCleaning" in gallery
import afterCleaning from '../assets/after-cleaning.jpg'; // Still used in slider
import after1AndAfter from '../assets/after1 and after.webp';
import roomBeforeAfter from '../assets/room-before and after cleaning.jpeg';
import ourWork from '../assets/ourwork.jpeg';
import carpetSlider from '../assets/carpet-after and before.jpg'; // Used in slider

const allImages = [
  { src: ourWork, label: 'Our Work Result', story: 'When Jane needed her home ready for a family gathering, we stepped in and transformed her space in just hours.' },
  { src: roomBeforeAfter, label: 'Room Transformation', story: 'This room had tough dirt build-up, but a deep clean brought it back to life with a fresh scent and shine.' },
  { src: updatedAfterCleaning, label: 'After Cleaning', story: 'Using eco-friendly products, we revitalized the surfaces with sustainable sparkle.' },
  { src: carpetSlider, label: 'Before & After' },
  { src: after1AndAfter, label: 'After Touch-Up' }
];

const OurWorkPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const featured = allImages.slice(0, 3); // Display first three images

  return (
    <section className="service-showcase">
      <h2>Our Work</h2>
      <p>See the difference a meticulous clean can make!</p>

      <div className="before-after">
        {featured.map((img, index) => (
          <div key={index} className="image-card">
            <img
              src={img.src}
              alt={img.label}
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            />
            <p className="image-label">{img.label}</p>
            {img.story && <p className="client-story">{img.story}</p>}
          </div>
        ))}
      </div>

      <div className="interactive-slider">
        <h3>Interactive Before & After</h3>
        <div className="compare-image-wrapper">
          <ReactCompareImage
            leftImage={carpetSlider}
            rightImage={afterCleaning}
            alt="Before and After Carpet Cleaning"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px'
            }}
          />
        </div>
        <p className="slider-caption">
          Drag the slider to see a real carpet transformation.
        </p>
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={allImages[photoIndex].src}
          nextSrc={allImages[(photoIndex + 1) % allImages.length].src}
          prevSrc={allImages[(photoIndex + allImages.length - 1) % allImages.length].src}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + allImages.length - 1) % allImages.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % allImages.length)
          }
        />
      )}
    </section>
  );
};

export default OurWorkPreview;
