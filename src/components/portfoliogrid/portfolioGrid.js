import React, { useEffect, useState } from 'react';
import './portfoliogrid.css';
import { Link } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { motion } from 'framer-motion';
import PortfolioGridEntry from '../general/PortfolioGridEntry';
import { getCoverImagesDataFromContentful } from '../../data/contentful';

const PortfolioGrid = () => {
  const [blogItemsData, setBlogItemsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesAndCaptions = await getCoverImagesDataFromContentful();
        setBlogItemsData(imagesAndCaptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const blogGridItems = blogItemsData.map((item, index) => (
    <motion.div
      key={index}
      whileHover={{
        scale: 1.1,
      }}
      className="container"
    >
      <Link to={`/portfolio/${item.portfolioImageSetId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <PortfolioGridEntry imageUrl={item.imageUrl} caption={item.caption} aspectRatio={1 / 1} />
      </Link>
    </motion.div>
  ));

  return (
    <div className="portfolio-grid-wrapper">
      {/* Add top padding to the entire grid */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 500: 1, 700: 2, 768: 3 }}>
        <Masonry>{blogGridItems}</Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default PortfolioGrid;
