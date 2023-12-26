// PortfolioDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PortfolioGridEntry from '../general/PortfolioGridEntry';
import { getPortfolioImageSetDataFromContentful } from '../../data/contentful';
import LoadingSpinner from './../loadingspinner/LoadingSpinner'; // Adjust the path based on your project structure
import './PortfolioDetail.css';
import ImageModal from '../imagemodal/ImageModal';


const PortfolioDetail = () => {
    const { id } = useParams();
    // Ensure id is a number, as it's coming from the URL parameters
    const portfolioImageSetId = id;
    const [imageSetData, setImageSetData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageSetData = await getPortfolioImageSetDataFromContentful(portfolioImageSetId);
                setImageSetData(imageSetData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [portfolioImageSetId]);

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        document.body.classList.add('header-footer-hidden');
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.classList.remove('header-footer-hidden');
    };


    const imageItems = imageSetData.map((image, index) => (
        <div key={index} className="container" onClick={() => openModal(image.imageUrl)}>
            <PortfolioGridEntry imageUrl={image.imageUrl} caption={image.caption} />
        </div>
    ));

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="portfolio-grid-detail-wrapper header-footer-visible">
            <ResponsiveMasonry columnsCountBreakPoints={{ 500: 1, 768: 2, 1200: 3 }}>
                <Masonry>{imageItems}</Masonry>
            </ResponsiveMasonry>

            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
        </div>
    );
};

export default PortfolioDetail;
