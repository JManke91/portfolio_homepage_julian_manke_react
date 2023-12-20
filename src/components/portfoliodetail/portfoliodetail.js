// PortfolioDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PortfolioGridEntry from '../general/PortfolioGridEntry';
import { getPortfolioImageSetDataFromContentful } from '../../data/contentful';

const PortfolioDetail = () => {
    const { id } = useParams();
    // Ensure id is a number, as it's coming from the URL parameters
    const portfolioImageSetId = id;
    const [imageSetData, setImageSetData] = useState([]);

    useEffect(() => {
        const fetchImageSetData = async () => {
            const imageSetData = await getPortfolioImageSetDataFromContentful(portfolioImageSetId);
            setImageSetData(imageSetData);
        };

        fetchImageSetData();
    }, [portfolioImageSetId]);

    const imageItems = imageSetData.map((image, index) => (
        <div key={index} className="container">
            <PortfolioGridEntry imageUrl={image.imageUrl} caption={image.caption} />
        </div>
    ));

    return (
        <div className="App">
            <ResponsiveMasonry columnsCountBreakPoints={{ 500: 1, 768: 2, 1200: 3 }}>
                <Masonry>{imageItems}</Masonry>
            </ResponsiveMasonry>
        </div>
    );
};

export default PortfolioDetail;
