// PortfolioGrid.js

import React from 'react';
import { Link } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { motion } from 'framer-motion';
import PortfolioGridEntry from '../general/PortfolioGridEntry';

const PortfolioGrid = ({ blogItemsData }) => {
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
    <motion.div className="App">
      <ResponsiveMasonry columnsCountBreakPoints={{ 500: 1, 700: 2, 768: 3 }}>
        <Masonry>{blogGridItems}</Masonry>
      </ResponsiveMasonry>
    </motion.div>
  );
};

export default PortfolioGrid;
