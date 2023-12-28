import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PortfolioGridEntry from '../general/PortfolioGridEntry';
import { getPortfolioImageSetDataFromContentful } from '../../data/contentful';
import LoadingSpinner from './../loadingspinner/LoadingSpinner'; // Adjust the path based on your project structure
import './PortfolioDetail.css';
import ImageModal from '../imagemodal/ImageModal';

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

    const imageItems = imageSetData.map((image, index) => (
        <div key={index} className="container">
            <div className="portfolio-grid-entry" onClick={() => openModal(image.imageUrl)}>
                <PortfolioGridEntry imageUrl={image.imageUrl} caption={image.caption} />
            </div>
        </div>
    ));

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className={`portfolio-grid-detail-wrapper header-footer-visible ${isModalOpen ? 'modal-open' : 'modal-closed'}`}>
            <button className={`back-button ${changeBackButtonOpacity ? 'original' : 'changeOpacity'}`} onClick={handleBack}>
                Previous
            </button>
            <ResponsiveMasonry columnsCountBreakPoints={{ 500: 1, 768: 2, 1200: 3 }}>
                <Masonry>{imageItems}</Masonry>
            </ResponsiveMasonry>

            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
        </div>
    );
};

export default PortfolioDetail;
