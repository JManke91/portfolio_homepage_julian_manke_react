import React, { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PortfolioGridEntry from '../general/PortfolioGridEntry';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import ImageModal from '../imagemodal/ImageModal';
import { motion } from 'framer-motion';
import { fadeInUpVariants } from '../general/FramerMotionAnimations';
import { getFreeImagesFromContentful } from '../../data/contentful';
import './News.css';

function News() {
    const [newsImages, setNewsImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageInfo, setSelectedImageInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch FreeImages from Contentful
    useEffect(() => {
        const fetchNewsImages = async () => {
            try {
                // Fetch FreeImages from Contentful
                const images = await getFreeImagesFromContentful();
                
                // Set the images in state
                setNewsImages(images);
                console.log('Fetched FreeImages:', images);
            } catch (error) {
                console.error('Error fetching news images:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewsImages();
    }, []);

    // Fix: Separate functions for opening and closing the modal
    const openModal = (image) => {
        console.log('Opening modal for image:', image.caption);
        setSelectedImage(image.imageUrl);
        setSelectedImageInfo(image.moreInfo);
        setIsModalOpen(true);
        document.body.classList.add('header-footer-hidden');
    };

    const closeModal = () => {
        console.log('Closing modal in News component');
        setSelectedImage(null);
        setSelectedImageInfo(null);
        setIsModalOpen(false);
        document.body.classList.remove('header-footer-hidden');
    };

    // Add a keyboard event listener to close modal with Escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        // Clean up event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className={`news-grid-wrapper header-footer-visible ${isModalOpen ? 'modal-open' : 'modal-closed'}`}>
            <h1 className="news-title">30 Day Photo Challenge, April 2025</h1>
            <p className="news-subtitle">For 30 days, I’ll be taking and sharing a new photo every day. It’s a simple challenge to stay creative, explore different ideas, and capture something interesting each day.</p>
            
            <ResponsiveMasonry columnsCountBreakPoints={{ 500: 1, 768: 2, 1200: 3 }}>
                <Masonry gutter={24}>
                    {newsImages.map((image, index) => (
                        <motion.div
                            key={index}
                            className="container"
                            variants={fadeInUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div
                                className="news-grid-entry"
                                onClick={() => openModal(image)}
                            >
                                <PortfolioGridEntry imageUrl={image.imageUrl} caption={image.caption} />
                            </div>
                        </motion.div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>

            {/* Fix: Update how we're conditionally rendering the modal */}
            {isModalOpen && selectedImage && 
                <ImageModal 
                    imageUrl={selectedImage} 
                    moreInfo={selectedImageInfo}
                    onClose={closeModal}  
                />
            }
        </div>
    );
}

export default News;