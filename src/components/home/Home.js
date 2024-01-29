// Imports
import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { getHomeImages, fetchQuote } from '../../data/contentful';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import { homeTextCloudVariants, homeTextFadeInVariants } from './../general/FramerMotionAnimations'
import {
  motion,
  useScroll,
  useTransform,
  easeOut
} from "framer-motion";


function Home() {
  // State
  const [imageUrls, setImageUrls] = useState([]);
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 768);

  // References
  const ref = useRef(null);

  // Animation Controls
  // FIXME: might cause issues with Safari when scrolling to the very bottom quickly
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0% 0%', '100% 0%'], // Adjusted offset values
  });

  const bottomY = useTransform(
    scrollYProgress,
    [0, 1.0],
    ['90%', '80%'],
    easeOut,
  );

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '800%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  
  // React Hooks
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

    // Update the state when the window is resized
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
  }, [scrollYProgress]);

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
          variants={isSmallDevice ? homeTextFadeInVariants : homeTextCloudVariants}
          initial="hidden"
          animate="visible"
          style={{
            y: textY,
            opacity: textOpacity,
            x: '-50%', // Center horizontally
            width: '80%', // Adjust the width as needed

          }}
          className='home-text'

        >
          {quote}
        </motion.h1>

        <motion.div
          className="background-image"
          style={{
            backgroundImage: `url(${imageUrls[0]})`,

          }}
        />

        <motion.div
          className="foreground-image"
          style={{
            backgroundImage: `url(${imageUrls[2]})`,

          }}
        />

        <motion.div
          className="bottom-image"
          style={{
            backgroundImage: `url(${imageUrls[1]})`,

            //y: bottomY, Parallax Effect for bottom image
            transition: 'transform 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

export default Home;