// TypewriterText.jsx
import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, delay = 10 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(prev => prev + text.charAt(i));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 40);
    }, delay); // Delay before starting
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <p className="story-line">{displayed}</p>;
};

export default TypewriterText;