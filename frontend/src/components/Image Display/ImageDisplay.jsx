// components/ImageDisplay.js
import React from 'react';
import './ImageDisplay.css';

function ImageDisplay({ image }) {
  return (
    <section className="image-display">
      {image ? (
        <img src={image} alt="Generated" />
      ) : (
        <p>Your generated image will appear here.</p>
      )}
    </section>
  );
}

export default ImageDisplay;
