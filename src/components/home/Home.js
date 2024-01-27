// Imports
import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { getHomeImages, fetchQuote } from '../../data/contentful';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import { homeTextCloudVariants } from './../general/FramerMotionAnimations'
import {
  motion,
  useScroll,
  useTransform,
  easeOut,
  useAnimation
} from "framer-motion";


function Home() {
  // State
  const [imageUrls, setImageUrls] = useState([]);
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  // References
  const ref = useRef(null);

  // Animation Controls
  const mainAnimationControl = useAnimation();
  const imageAnimationControl = useAnimation();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const bottomY = useTransform(
    scrollYProgress,
    [0, 1],
    ['100%', '0%'],
    easeOut,
  );

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '800%']);

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
        imageAnimationControl.start("visible");
        mainAnimationControl.start("visible");
      }
    }

    fetchData();
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
          variants={homeTextCloudVariants}
          initial="hidden"
          animate={mainAnimationControl}
          style={{
            y: textY,
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


            y: bottomY,
          }}
        />
      </div>
    </div>
  );
}

export default Home;