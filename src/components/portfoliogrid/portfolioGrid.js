import React, { useEffect, useState } from 'react';
import './portfoliogrid.css';
import { Link } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { motion } from 'framer-motion';
import { fadeInUpVariants } from './../general/FramerMotionAnimations'
import PortfolioGridEntry from '../general/PortfolioGridEntry';
import { getCoverImagesDataFromContentful } from '../../data/contentful';
import LoadingSpinner from './../loadingspinner/LoadingSpinner';

import { DEVICE_WIDTH_PIXEL, COLUMN_COUNTS_LAYOUT } from '../../constants/constants';

const PortfolioGrid = () => {
  const [blogItemsData, setBlogItemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesAndCaptions = await getCoverImagesDataFromContentful();
        setBlogItemsData(imagesAndCaptions);
      } catch (error) {
        // TODO: Proper error handling
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const blogGridItems = blogItemsData.map((item, index) => (
    <motion.div
      key={index}
      /*whileHover={{scale: 1.1,}}*/
      variants={fadeInUpVariants}
      className="container"
      initial="hidden"
      animate="visible"
    >
      <Link to={`/portfolio/${item.portfolioImageSetId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <PortfolioGridEntry imageUrl={item.imageUrl} caption={item.caption} aspectRatio={1 / 1} />
      </Link>
    </motion.div>
    ));

    return (
    <div className="portfolio-grid-wrapper">
      {/* Add top padding to the entire grid */}
      <ResponsiveMasonry columnsCountBreakPoints={{
        [DEVICE_WIDTH_PIXEL.SMALL]: COLUMN_COUNTS_LAYOUT.SMALL,
        [DEVICE_WIDTH_PIXEL.MEDIUM]: COLUMN_COUNTS_LAYOUT.MEDIUM,
        [DEVICE_WIDTH_PIXEL.LARGE]: COLUMN_COUNTS_LAYOUT.LARGE
      }}>
        <Masonry>{blogGridItems}</Masonry>
      </ResponsiveMasonry>
    </div>
    );
};

    export default PortfolioGrid;
