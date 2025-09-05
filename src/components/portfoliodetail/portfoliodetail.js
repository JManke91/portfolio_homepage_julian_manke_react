// Imports
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PortfolioGridEntry from '../general/PortfolioGridEntry';
import { getPortfolioImageSetDataFromContentful } from '../../data/contentful';
import LoadingSpinner from './../loadingspinner/LoadingSpinner';
import './PortfolioDetail.css';
import ImageModal from '../imagemodal/ImageModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    DEVICE_WIDTH_PIXEL,
    COLUMN_COUNTS_LAYOUT,
    MAX_NUMBER_ROWS_LAYOUT,
    GUTTER_VALUE,
    BACK_BUTTON_TEXT
} from '../../constants/constants';
import { motion } from 'framer-motion';
import { fadeInUpVariants } from './../general/FramerMotionAnimations'

const PortfolioDetail = () => {
    const { id } = useParams();
    const portfolioImageSetId = id;
    const [imageSetData, setImageSetData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [pendingNavigationIndex, setPendingNavigationIndex] = useState(null);
    const navigate = useNavigate();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [changeBackButtonOpacity, setChangeBackButtonOpacity] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1); // Assuming initial value is 1

    const calculateLimit = () => {
        const screenWidth = window.innerWidth;

        // Adjust these values based on your layout configuration
        if (screenWidth >= DEVICE_WIDTH_PIXEL.LARGE) {
            // Large screens, 3 columns x 2 rows
            return COLUMN_COUNTS_LAYOUT.LARGE * MAX_NUMBER_ROWS_LAYOUT;
        } else if (screenWidth >= DEVICE_WIDTH_PIXEL.MEDIUM) {
            // Medium screens, 2 columns x 2 rows
            return COLUMN_COUNTS_LAYOUT.MEDIUM * MAX_NUMBER_ROWS_LAYOUT;
        } else {
            // Small screens, 1 column x 2-3 rows
            return COLUMN_COUNTS_LAYOUT.SMALL * MAX_NUMBER_ROWS_LAYOUT;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const limit = calculateLimit();
                const { data, maxPages } = await getPortfolioImageSetDataFromContentful(portfolioImageSetId, page, limit);
                if (process.env.NODE_ENV === 'development') {
                    console.log('getting new data for page:', page);
                }
                setMaxPages(maxPages);
                if (process.env.NODE_ENV === 'development') {
                    console.log('setting max pages:', maxPages);
                }
                setImageSetData((prevData) => {
                    // Identify existing image URLs
                    const existingImageUrls = new Set(prevData.map((image) => image.imageUrl));

                    // Filter out new data that already exists in the previous data
                    const newDataWithoutDuplicates = data.filter((image) => !existingImageUrls.has(image.imageUrl));

                    // Combine previous data with the filtered new data
                    const updatedData = [...prevData, ...newDataWithoutDuplicates];
                    
                    // Handle pending navigation after data is loaded
                    if (pendingNavigationIndex !== null) {
                        setTimeout(() => {
                            if (pendingNavigationIndex < updatedData.length) {
                                setSelectedImageIndex(pendingNavigationIndex);
                            } else {
                                // If we still can't navigate to the desired index, 
                                // navigate to the last available image
                                setSelectedImageIndex(updatedData.length - 1);
                                if (process.env.NODE_ENV === 'development') {
                                    console.log('Reached end of collection, showing last image');
                                }
                            }
                            setPendingNavigationIndex(null);
                        }, 100); // Small delay to ensure state is updated
                    }
                    
                    return updatedData;
                });

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error case for pending navigation
                if (pendingNavigationIndex !== null) {
                    setPendingNavigationIndex(null);
                    if (process.env.NODE_ENV === 'development') {
                        console.log('Failed to load next page for navigation');
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [portfolioImageSetId, page, pendingNavigationIndex]);

    useEffect(() => {

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const scrollThreshold = 20; // Adjust this threshold as needed

            if (Math.abs(prevScrollPos - currentScrollPos) > scrollThreshold) {
                setChangeBackButtonOpacity(prevScrollPos > currentScrollPos || currentScrollPos === 0);
                setPrevScrollPos(currentScrollPos);
            }

            // Add or remove scrolling-down class
            if (prevScrollPos > currentScrollPos) {
                document.body.classList.remove('scrolling-down');
            } else {
                document.body.classList.add('scrolling-down');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {

            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, setChangeBackButtonOpacity]);

    // Handle state changes
    const openModal = (imageIndex) => {
        setSelectedImageIndex(imageIndex);
        setIsModalOpen(true);
        document.body.classList.add('header-footer-hidden');
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
        setIsModalOpen(false);
        document.body.classList.remove('header-footer-hidden');
    };

    const handleNavigate = useCallback(async (newIndex) => {
        // Check if we're trying to navigate to a photo that exists
        if (newIndex >= 0 && newIndex < imageSetData.length) {
            setSelectedImageIndex(newIndex);
            
            // Check if we're near the end and need to load more
            // Load next page when we're within 2 photos of the end
            const shouldLoadMore = newIndex >= imageSetData.length - 2 && page < maxPages;
            
            if (shouldLoadMore) {
                if (process.env.NODE_ENV === 'development') {
                    console.log('Auto-loading next page for navigation:', page + 1);
                }
                setPage((prevPage) => prevPage + 1);
            }
        }
        // Check if we're trying to navigate beyond current data but more pages exist
        else if (newIndex >= imageSetData.length && page < maxPages) {
            if (process.env.NODE_ENV === 'development') {
                console.log('Loading next page to continue navigation to index:', newIndex);
            }
            setPendingNavigationIndex(newIndex);
            setPage((prevPage) => prevPage + 1);
            // The navigation will happen after the new data is loaded via useEffect
        }
    }, [imageSetData.length, page, maxPages]);

    const handleBack = () => {
        navigate('/portfolio');
    };

    const loadMore = () => {
        // Load more data only if there are more pages to load
        if (process.env.NODE_ENV === 'development') {
            console.log('loadMore called');
        }
        if (page < maxPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Render
    return (
        <div className={`portfolio-grid-detail-wrapper header-footer-visible ${isModalOpen ? 'modal-open' : 'modal-closed'}`}>
            <button className={`back-button ${changeBackButtonOpacity ? 'original' : 'changeOpacity'}`} onClick={handleBack}>
                {BACK_BUTTON_TEXT}
            </button>
            <InfiniteScroll
                dataLength={imageSetData.length}
                next={loadMore}
                hasMore={page < maxPages}
                loader={<LoadingSpinner />}
            >
                <ResponsiveMasonry columnsCountBreakPoints={{ 500: 1, 768: 2, 1200: 3 }}>
                    <Masonry gutter={GUTTER_VALUE}>
                        {imageSetData.map((image, index) => (
                            <motion.div
                                key={index}
                                className="container"
                                variants={fadeInUpVariants}
                                initial="hidden"
                                animate="visible"
                            >

                                <div
                                    className="portfolio-grid-entry"
                                    onClick={() => openModal(index)}
                                >
                                    <PortfolioGridEntry imageUrl={image.imageUrl} caption={image.caption} />
                                </div>
                            </motion.div>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </InfiniteScroll>

            {selectedImageIndex !== null && (
                <ImageModal 
                    imageUrl={imageSetData[selectedImageIndex]?.imageUrl}
                    moreInfo={imageSetData[selectedImageIndex]?.moreInfo}
                    images={imageSetData}
                    currentIndex={selectedImageIndex}
                    onNavigate={handleNavigate}
                    onClose={closeModal}
                    hasMorePages={page < maxPages}
                    isLoadingNextPage={pendingNavigationIndex !== null}
                />
            )}
        </div>
    );
};

export default PortfolioDetail;
