// Imports
import React, { useState, useEffect } from 'react';
import './Home.css';
import { getHomeImages } from '../../data/contentful';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';

function Home() {
  // State
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const urls = await getHomeImages();
        setImageUrls(urls);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleImageLoad = () => {
    setImgLoaded(true);
  };

  // Render
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div
        className="home"
      >

        <img
          className={`background-image ${imgLoaded ? 'image' : 'image blur'}`}
          src={imageUrls[0]}
          alt="Background"
          onLoad={handleImageLoad}
        />

      </div>
    </div>
  );
}

export default Home;