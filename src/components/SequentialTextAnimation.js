// SequentialTextAnimation.js

import React, { useEffect, useRef, useState } from 'react';
import './SequentialTextAnimation.css';

const linesOfText = [
  "Your first line of text goes here.",
  "Your second line of text goes here.",
  "Your third line of text goes here.",
];

const SequentialTextAnimation = () => {
  const textRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const animateLines = async () => {
      for (let i = 0; i < linesOfText.length; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            setVisibleLines(i + 1);
            resolve();
          }, 500); // Adjust the delay as needed
        });
      }
    };

    animateLines();
  }, []);

  return (
    <div className="text-container" ref={textRef}>
      {linesOfText.map((line, index) => (
        <div key={index} className={`text ${index < visibleLines ? 'visible' : ''}`}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default SequentialTextAnimation;
