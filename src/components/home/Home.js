// Home.js
import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Typewriter } from 'react-simple-typewriter';
import { getHomeImages } from '../../data/contentful';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';

function Home() {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const urls = await getHomeImages();
        setImageUrls(urls);
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Display the loading spinner while data is being fetched
  }

  return (
    <div className="home">
      <Parallax pages={2}>
        {/* First Parallax Layer with Image */}
        <ParallaxLayer
          offset={0}
          speed={-0.1}
          factor={1}
          style={{
            backgroundImage: `url(${imageUrls[0]})`,
            backgroundSize: 'cover',
          }}
        >
          {/* Text on the First Image */}
          <div className="text-container">
            <div className="text">
              <Typewriter
                words={[
                  'Exploring the world, one frame at a time. Unveiling the silent stories etched in light and shadows.',
                ]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </div>
          </div>
        </ParallaxLayer>

        {/* Second Parallax Layer with Image */}
        <ParallaxLayer
          offset={0.9}
          speed={0.1}
          factor={1.2}
          style={{
            backgroundImage: `url(${imageUrls[1]})`,
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer sticky={{ start: 1, end: 2 }} />
      </Parallax>
    </div>
  );
}

export default Home;
