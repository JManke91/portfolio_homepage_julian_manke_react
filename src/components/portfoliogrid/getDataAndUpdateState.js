// getImageAndCaptionDataAndUpdateState.js
import { useState, useEffect } from 'react';
import { getCoverImagesDataFromContentful } from '../../data/contentful';

/**
 * Gets images and captions and updates the 'useState'. useEffect is a react hook, that allows to use side effects -> updates state
 *
 * @component
 * @example
 * // Example usage:
 * const imagesAndCaptions = await fetchImageURLsAndCaptions()
 *
 * @returns {JSX.Element} The JSX representation of the component.
 */
const GetImageAndCaptionDataAndUpdateState = () => {
  const [blogItemsData, setBlogItemsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const imagesAndCaptions = await getCoverImagesDataFromContentful();
      setBlogItemsData(imagesAndCaptions);
    };

    fetchData();
  }, []);

  return { blogItemsData };
};

export default GetImageAndCaptionDataAndUpdateState;
