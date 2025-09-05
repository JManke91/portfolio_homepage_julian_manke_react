// Imports
import React, { useState, useEffect } from 'react';
import './Places.css';
import { getPlacesImages } from '../../data/contentful';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import ImageModal from '../imagemodal/ImageModal';

function Places() {
  // State
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // React Hooks
  useEffect(() => {
    async function fetchData() {
      try {
        const urls = await getPlacesImages();
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

  const openModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    document.body.classList.add('header-footer-hidden');
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    document.body.classList.remove('header-footer-hidden');
  };

  const handleNavigate = (newIndex) => {
    if (newIndex >= 0 && newIndex < imageUrls.length) {
      setSelectedImageIndex(newIndex);
    }
  };

  // Render
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="places">
      <div className="image-grid">
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            className={`grid-image ${loadedImages.has(index) ? 'loaded' : ''}`}
            src={imageUrl}
            alt={`Places ${index + 1}`}
            onLoad={() => handleImageLoad(index)}
            onClick={() => openModal(index)}
            loading="lazy"
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
      
      {selectedImageIndex !== null && (
        <ImageModal 
          imageUrl={imageUrls[selectedImageIndex]}
          images={imageUrls.map((url, idx) => ({ imageUrl: url }))}
          currentIndex={selectedImageIndex}
          onNavigate={handleNavigate}
          onClose={closeModal}
          hasMorePages={false}
          isLoadingNextPage={false}
        />
      )}
    </div>
  );
}

export default Places;