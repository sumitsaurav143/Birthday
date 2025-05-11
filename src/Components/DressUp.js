import React, { useState, useEffect } from 'react';
import './DressUp.css';

const DressUp = ({ selectedDress, setSelectedDress, onDressSelected }) => {
  const dresses = [
    process.env.PUBLIC_URL + '/dress1.jpg',
    process.env.PUBLIC_URL + '/dress2.jpg',
    process.env.PUBLIC_URL + '/dress3.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return; 

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dresses.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, dresses.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dresses.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + dresses.length) % dresses.length);
  };

  const handleSelect = () => {
    setSelectedDress(dresses[currentIndex]);
  };

  return (
    <div className="dressup-container">
      {!selectedDress ? (
        <div className="slider-wrapper">
          <h2>👗 Let's get you ready first!</h2>
          <p>Choose your favorite dress...</p>
          <div
            className="slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button className="nav-button left" onClick={handlePrev}>❮</button>
            <div className="slider-image-wrapper">
              <img
                src={dresses[currentIndex]}
                alt={`Dress ${currentIndex + 1}`}
                className="slider-image"
              />
              <button className="choose-btn" onClick={handleSelect}>
                Choose this
              </button>
            </div>
            <button className="nav-button right" onClick={handleNext}>❯</button>
          </div>
        </div>
      ) : (
        <div className="selected-dress-wrapper">
          <img src={selectedDress} alt="Selected Dress" className="selected-dress" />
          <p>You'll look pretty my love! 😘✨<br/>Mujhe pata tha tm yahi choose krogi 🥰😚</p>
          <button className="card clickable" onClick={() => onDressSelected()}>
            Let’s go for a ride in your favourite car 🚗
          </button>
        </div>
      )}
    </div>
  );
};

export default DressUp;