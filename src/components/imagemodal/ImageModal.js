import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ImageModal.css';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import {
  motion,
  useAnimation,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { infoTextVariants, buttonVariants, hybridInitialVariants, hybridNavigationVariants, hybridReducedMotionVariants, hybridCrossfadeVariants } from './../general/FramerMotionAnimations';
import {
  OVERLAY_IMAGE_OPACITY_TRANSITION_DURATION,
  OVERLAY_IMAGE_END_OPACITY,
  OVERLAY_IMAGE_BLUR_VALUE,
} from './../../constants/constants';
import { useLockBodyScroll } from '@uidotdev/usehooks';
import { generateFullscreenImageUrl } from '../../data/contentful';

const ImageModal = ({ 
  imageUrl, 
  moreInfo, 
  onClose,
  images = [],
  currentIndex = 0,
  onNavigate,
  hasMorePages = false,
  isLoadingNextPage = false
}) => {

  // State
  const [isActive, setIsActive] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [currentImageSrc, setCurrentImageSrc] = useState(imageUrl);
  const [isLoadingHighRes, setIsLoadingHighRes] = useState(false);
  const [direction, setDirection] = useState(0);
  const [navigationMethod, setNavigationMethod] = useState('directional'); // 'directional' or 'crossfade'
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // React Hooks
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    setIsActive(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling when modal is open
    
    // Add keyboard event listener for ESC and arrow keys
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsActive(false);
        setTimeout(() => {
          onClose();
        }, 300);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (images.length > 0 && currentIndex < images.length - 1 && onNavigate) {
          setDirection(1);
          setNavigationMethod('directional');
          
          if (isInitialLoad) {
            setIsInitialLoad(false);
            setTimeout(() => {
              onNavigate(currentIndex + 1);
            }, 50);
          } else {
            onNavigate(currentIndex + 1);
          }
        }
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (images.length > 0 && currentIndex > 0 && onNavigate) {
          setDirection(-1);
          setNavigationMethod('directional');
          
          if (isInitialLoad) {
            setIsInitialLoad(false);
            setTimeout(() => {
              onNavigate(currentIndex - 1);
            }, 50);
          } else {
            onNavigate(currentIndex - 1);
          }
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'auto'; // Enable scrolling when modal is closed
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNavigate, currentIndex, images]);

  useLockBodyScroll();

  // Progressive loading: Start with grid image, load high-res in background
  useEffect(() => {
    if (!imageUrl) return;
    
    // Start with the grid image
    setCurrentImageSrc(imageUrl);
    setIsLoadingHighRes(true);
    
    // Generate and load high-res version
    const highResUrl = generateFullscreenImageUrl(imageUrl);
    
    if (highResUrl && highResUrl !== imageUrl) {
      const highResImage = new Image();
      
      highResImage.onload = () => {
        // Smoothly transition to high-res image
        setCurrentImageSrc(highResUrl);
        setIsLoadingHighRes(false);
      };
      
      highResImage.onerror = () => {
        // If high-res fails, stick with grid image
        setIsLoadingHighRes(false);
      };
      
      highResImage.src = highResUrl;
    } else {
      // No high-res version needed
      setIsLoadingHighRes(false);
    }
  }, [imageUrl]);

  // Animation Controls
  const imageAnimationControls = useAnimation();

  // Preload adjacent images for smooth navigation
  useEffect(() => {
    if (images.length > 1) {
      const preloadImage = (imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
      };

      // Preload next image
      if (currentIndex < images.length - 1) {
        preloadImage(images[currentIndex + 1].imageUrl);
      }

      // Preload previous image
      if (currentIndex > 0) {
        preloadImage(images[currentIndex - 1].imageUrl);
      }
    }
  }, [currentIndex, images]);

  // Navigation handlers
  const canGoNext = () => {
    // Can go next if there's a next image in current data OR if more pages are available
    return images.length > 0 && (currentIndex < images.length - 1 || hasMorePages);
  };
  const canGoPrevious = () => images.length > 0 && currentIndex > 0;

  const handleNext = (e) => {
    e?.stopPropagation();
    if (canGoNext() && onNavigate) {
      setDirection(1);
      setNavigationMethod('directional');
      
      if (isInitialLoad) {
        // For first navigation, switch systems then navigate
        setIsInitialLoad(false);
        // Small delay to ensure AnimatePresence is ready
        setTimeout(() => {
          onNavigate(currentIndex + 1);
        }, 50);
      } else {
        onNavigate(currentIndex + 1);
      }
    }
  };

  const handlePrevious = (e) => {
    e?.stopPropagation();
    if (canGoPrevious() && onNavigate) {
      setDirection(-1);
      setNavigationMethod('directional');
      
      if (isInitialLoad) {
        // For first navigation, switch systems then navigate
        setIsInitialLoad(false);
        // Small delay to ensure AnimatePresence is ready
        setTimeout(() => {
          onNavigate(currentIndex - 1);
        }, 50);
      } else {
        onNavigate(currentIndex - 1);
      }
    }
  };

  // Touch event handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return;
    
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const minSwipeDistance = 50;
    
    // Check if horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          // Swiped left -> Next image
          setDirection(1);
          setNavigationMethod('crossfade');
          setIsInitialLoad(false);
          if (canGoNext() && onNavigate) {
            onNavigate(currentIndex + 1);
          }
        } else {
          // Swiped right -> Previous image
          setDirection(-1);
          setNavigationMethod('crossfade');
          setIsInitialLoad(false);
          if (canGoPrevious() && onNavigate) {
            onNavigate(currentIndex - 1);
          }
        }
      }
    }
    
    // Reset touch positions
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
      
      {/* Navigation Arrows */}
      {canGoPrevious() && (
        <button 
          className="nav-arrow nav-arrow-left" 
          onClick={handlePrevious}
          aria-label="Previous image"
          title="Previous (←)"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      
      {canGoNext() && (
        <button 
          className={`nav-arrow nav-arrow-right ${isLoadingNextPage ? 'loading' : ''}`} 
          onClick={handleNext}
          aria-label="Next image"
          title={isLoadingNextPage ? "Loading..." : "Next (→)"}
          disabled={isLoadingNextPage}
        >
          {isLoadingNextPage ? (
            <div className="loading-spinner">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="spin"
              >
                <circle 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeDasharray="60" 
                  strokeDashoffset="60"
                />
              </svg>
            </div>
          ) : (
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9 18L15 12L9 6" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      )}
      
      <div 
        className={`image-modal-content ${isActive ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks on content from closing modal
      >
        <div className="enlarged-image-container">
          {isInitialLoad ? (
            // Initial image - EXACTLY as it was originally, no AnimatePresence interference
            <motion.img
              animate={imageAnimationControls}
              className={`enlarged-image ${isLoadingHighRes ? 'loading-high-res' : 'high-res-loaded'}`}
              src={currentImageSrc}
              alt="Enlarged"
            />
          ) : (
            // Navigation system - includes initial image with exit capability
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.img
                key={currentImageSrc}
                className={`enlarged-image ${isLoadingHighRes ? 'loading-high-res' : 'high-res-loaded'} hardware-accelerated`}
                src={currentImageSrc}
                alt="Enlarged"
                variants={
                  shouldReduceMotion 
                    ? hybridReducedMotionVariants 
                    : navigationMethod === 'crossfade' 
                      ? hybridCrossfadeVariants 
                      : hybridNavigationVariants
                }
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
                style={{
                  willChange: 'transform, opacity',
                  transform: 'translate3d(0, 0, 0)'
                }}
                onAnimationComplete={() => {
                  imageAnimationControls.start(
                    showMoreInfo 
                      ? { opacity: OVERLAY_IMAGE_END_OPACITY, filter: `blur(${OVERLAY_IMAGE_BLUR_VALUE})` }
                      : { opacity: 1.0, filter: 'blur(0px)' }
                  );
                }}
              />
            </AnimatePresence>
          )}
          {isLoadingHighRes && (
            <div className="high-res-loading-indicator">
              <div className="loading-spinner-small"></div>
            </div>
          )}
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
        
        {/* Position Indicator */}
        {images.length > 1 && (
          <div className="position-indicator">
            <span>{currentIndex + 1} / {images.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  moreInfo: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.array,
  currentIndex: PropTypes.number,
  onNavigate: PropTypes.func,
  hasMorePages: PropTypes.bool,
  isLoadingNextPage: PropTypes.bool,
};

export default ImageModal;