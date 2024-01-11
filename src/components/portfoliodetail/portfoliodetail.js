import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PortfolioGridEntry from '../general/PortfolioGridEntry';
import { getPortfolioImageSetDataFromContentful } from '../../data/contentful';
import LoadingSpinner from './../loadingspinner/LoadingSpinner'; // Adjust the path based on your project structure
import './PortfolioDetail.css';
import ImageModal from '../imagemodal/ImageModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DEVICE_WIDTH_PIXEL, COLUMN_COUNTS_LAYOUT, MAX_NUMBER_ROWS_LAYOUT } from '../../constants/constants';

const PortfolioDetail = () => {
    const { id } = useParams();
    const portfolioImageSetId = id;
    const [imageSetData, setImageSetData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [changeBackButtonOpacity, setChangeBackButtonOpacity] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1); // Assuming initial value is 1

    // TODO: Use constants
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
                    return [...prevData, ...newDataWithoutDuplicates];
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [portfolioImageSetId, page]);

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
        document.body.classList.add('header-footer-hidden');
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
        document.body.classList.remove('header-footer-hidden');
    };

    const handleBack = () => {
        navigate('/portfolio');
    };



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

    return (
        <div className={`portfolio-grid-detail-wrapper header-footer-visible ${isModalOpen ? 'modal-open' : 'modal-closed'}`}>
            <button className={`back-button ${changeBackButtonOpacity ? 'original' : 'changeOpacity'}`} onClick={handleBack}>
                Previous
            </button>
            <InfiniteScroll
                dataLength={imageSetData.length}
                next={loadMore}
                hasMore={page < maxPages}
                loader={<LoadingSpinner />}
            >
                <ResponsiveMasonry columnsCountBreakPoints={{ 500: 1, 768: 2, 1200: 3 }}>
                    <Masonry>
                        {imageSetData.map((image, index) => (
                            <div key={index} className="container">
                                <div className="portfolio-grid-entry" onClick={() => openModal(image.imageUrl)}>
                                    <PortfolioGridEntry imageUrl={image.imageUrl} caption={image.caption} />
                                </div>
                            </div>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </InfiniteScroll>

            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
        </div>
    );
};

export default PortfolioDetail;
