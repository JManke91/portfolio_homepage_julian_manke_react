// Imports
import React, { useState, useEffect } from 'react';
import './Home.css';
import { getGridImages } from '../../data/contentful';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';

function Home() {
  // State
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // React Hooks
  useEffect(() => {
    async function fetchData() {
      try {
        const urls = await getGridImages();
        setImageUrls(urls);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  // Render
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home">
      <div className="image-grid">
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            className={`grid-image ${loadedImages.has(index) ? 'loaded' : ''}`}
            src={imageUrl}
            alt={`Grid image ${index + 1}`}
            onLoad={() => handleImageLoad(index)}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default Home;