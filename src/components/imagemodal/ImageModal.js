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
import { useLockBodyScroll } from '@uidotdev/usehooks';

const ImageModal = ({ imageUrl, moreInfo, onClose }) => {

  // State
  const [isActive, setIsActive] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // React Hooks
  useEffect(() => {
    setIsActive(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling when modal is open
    
    // Add keyboard event listener for ESC key
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsActive(false);
        setTimeout(() => {
          onClose();
        }, 300);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'auto'; // Enable scrolling when modal is closed
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useLockBodyScroll();

  // Animation Controls
  const imageAnimationControls = useAnimation();

  // State changes
  const handleClose = (e) => {
    // Fix: Stop event propagation
    e.stopPropagation();
    console.log('handleClose called in ImageModal');
    setIsActive(false);
    // Fix: Call onClose directly
    setTimeout(() => {
      onClose();
    }, 300); // Match the transition duration
  };

  const handleTransitionEnd = () => {
    if (!isActive) {
      onClose();
    }
  };

  const handleShowMore = (e) => {
    // Fix: Stop event propagation
    e.stopPropagation();
    setShowMoreInfo(prevState => !prevState);
    animateImage();
  };
  
  // Fix: Add click handler for the modal background
  const handleOverlayClick = (e) => {
    // Only close if clicking directly on the overlay (not its children)
    if (e.target === e.currentTarget) {
      setIsActive(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }
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
      onClick={handleOverlayClick}
      onTransitionEnd={handleTransitionEnd}
    >
      <button 
        className="close-button" 
        onClick={handleClose}
        aria-label="Close image modal"
        title="Close (ESC)"
        autoFocus
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 18 18" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M1 1L17 17M1 17L17 1" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div 
        className={`image-modal-content ${isActive ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks on content from closing modal
      >
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