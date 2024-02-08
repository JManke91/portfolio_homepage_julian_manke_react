// Imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ImageModal.css';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import {
  motion,
  useAnimation,
} from "framer-motion";
import { infoTextVariants, buttonVariants } from './../general/FramerMotionAnimations';
import {
  OVERLAY_IMAGE_OPACITY_TRANSITION_DURATION,
  OVERLAY_IMAGE_END_OPACITY,
  OVERLAY_IMAGE_BLUR_VALUE,
} from './../../constants/constants';

const ImageModal = ({ imageUrl, moreInfo, onClose }) => {

  // State
  const [isActive, setIsActive] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // React Hooks
  useEffect(() => {
    setIsActive(true);
  }, []);

  // Animation Controls
  const imageAnimationControls = useAnimation();

  // State changes
  const handleClose = () => {
    setIsActive(false);
  };

  const handleTransitionEnd = () => {
    if (!isActive) {
      onClose();
    }
  };

  const handleShowMore = () => {
    setShowMoreInfo(prevState => !prevState);
    animateImage();
  };

  const animateImage = async () => {
    if (showMoreInfo) {
      await imageAnimationControls.start({
        opacity: 1.0,
        filter: 'blur(0px)'
      },
        { duration: OVERLAY_IMAGE_OPACITY_TRANSITION_DURATION });
    } else {
      await imageAnimationControls.start({
        opacity: OVERLAY_IMAGE_END_OPACITY,
        filter: `blur(${OVERLAY_IMAGE_BLUR_VALUE})`
      },
        { duration: OVERLAY_IMAGE_OPACITY_TRANSITION_DURATION });
    }
  };

  // Render
  return (
    <div
      className={`image-modal-overlay ${isActive ? 'active' : ''}`}
      //onClick={handleClose}
      onTransitionEnd={handleTransitionEnd}
    >
      <span className="close-button" onClick={handleClose}>
        &times;
      </span>
      <div className={`image-modal-content ${isActive ? 'active' : ''}`}>
        <div className="enlarged-image-container">
          <motion.img
            animate={imageAnimationControls}
            className="enlarged-image"
            src={imageUrl}
            alt="Enlarged"
          />
        </div>
        {moreInfo && (
          <motion.button
            className="show-more-button"
            onClick={handleShowMore}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <motion.div
              className={showMoreInfo ? "arrow-down" : "arrow-up"}
            ></motion.div>
            {showMoreInfo ? "Show Less" : "Show More"}
          </motion.button>
        )}
        <motion.div
          style={{
            x: '-50%', // Center horizontally
          }}
          className="more-info"
          initial="hidden"
          animate={showMoreInfo ? 'visible' : 'hidden'}
          variants={infoTextVariants}
        >
          {/* Show "hello world" when showMoreInfo is true */}
          <ReactMarkdown
            className="markdown-text"
            components={{
              a: ({ node, ...props }) => (
                props.href.startsWith('/') ? (
                  <Link to={props.href}>{props.children}</Link>
                ) : (
                  <a href={props.href} target="_blank" rel="noopener noreferrer">
                    {props.children}
                  </a>
                )
              ),
              p: ({ node, ...props }) => <p>{props.children}</p>,
              span: ({ node, ...props }) => <span>{props.children}</span>,
            }}
          >
            {moreInfo}
          </ReactMarkdown>
        </motion.div>
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  moreInfo: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
