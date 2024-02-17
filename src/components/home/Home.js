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
import Lenis from '@studio-freight/lenis'


function Home() {
  // State
  const [imageUrls, setImageUrls] = useState([]);
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 768);
  const [imgLoaded, setImgLoaded] = useState(false);

  // References
  const ref = useRef(null);

  // Animation Controls

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0% 0%', '100% 0%'],
  });

  const scrollRangeStart = 0.0; // Start of the scroll range (20%)
  const scrollRangeEnd = 1.0; // End of the scroll range (80%)

  const bottomY = useTransform(
    scrollYProgress,
    [scrollRangeStart, scrollRangeEnd],
    ['100%', '40%'], //'90%', '60%'
    easeOut,
  );

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '800%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // React Hooks
  useEffect(() => {
    // Basic setup for `Lenis` (Smooth animation)
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

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