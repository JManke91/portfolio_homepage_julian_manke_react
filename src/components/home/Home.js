// Imports
import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { getHomeImages, fetchQuote } from '../../data/contentful';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

function Home() {
  // State
  const [imageUrls, setImageUrls] = useState([]);
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [setIsSmallDevice] = useState(window.innerWidth < 768);
  const [imgLoaded, setImgLoaded] = useState(false);

  // References
  const ref = useRef(null);

  // Animation Controls

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0% 0%', '100% 0%'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '800%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    async function fetchData() {
      try {
        const urls = await getHomeImages();
        const quoteText = await fetchQuote();
        setImageUrls(urls);
        setQuote(quoteText);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
  }, [scrollYProgress]);

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
        ref={ref}
        className="home"
      >

        <motion.h1
          style={{
            y: textY,
            opacity: textOpacity,
            x: '-50%', // Center horizontally
            width: '80%', // Adjust the width as needed

          }}
          className='home-text'

        >

          {
            quote.split("").map((letter, i) => (
              <motion.span
                key={`letter_${i}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}

                transition={{
                  duration: 0.5,
                  delay: i * 0.04
                }}
              >
                {letter}
              </motion.span>
            ))
          }
        </motion.h1>

        <motion.img
          className={`background-image ${imgLoaded ? 'image' : 'image blur'}`}
          src={imageUrls[0]}
          alt="Background"
          onLoad={handleImageLoad}
        />

        <motion.img
          className={`foreground-image ${imgLoaded ? 'image' : 'image blur'}`}
          src={imageUrls[2]}
          alt="Foreground"
          onLoad={handleImageLoad}
        />

        <motion.img
          className={`bottom-image ${imgLoaded ? 'image' : 'image blur'}`}
          src={imageUrls[1]}
          alt="Bottom"
          style={{
            //y: bottomY,
            transition: 'transform 0.3s ease',
          }}
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
}

export default Home;