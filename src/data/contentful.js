// api.js

import { contentfulConfig, getHomeImagesContentType, getWorkCoverImageType, getWorkImageType } from '../constants/constants';
import { createClient } from 'contentful';
import { calculateImageParameters } from '../components/general/ImageUtils'

const { spaceId, accessToken } = contentfulConfig;

const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
});

export async function fetchQuote() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'cite',
    });

    // Assume you have only one entry in your "cite" content type
    const firstEntry = response.items[0];
    const quoteText = firstEntry.fields.quote;
    return quoteText;

  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function getHomeImages() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: getHomeImagesContentType(),
      // Add any additional filters or options as needed
    });

    // Assuming the response is an array of entries with a 'fields' property
    const imageUrls = response.items.map((item) => item.fields.image.fields.file.url);

    return imageUrls;
  } catch (error) {
    console.error('Error fetching image URLs:', error);
    throw error;
  }
}

// api.js

export const getCoverImagesDataFromContentful = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: getWorkCoverImageType(),
      // Add any additional filters or options as needed
    });

    console.log('Contentful API Response:', response);

    return response.items.map((item) => {
      console.log('Item Fields:', item.fields); // Log the fields of one item

      const coverImageUrl = item.fields.coverImage?.fields.file.url || '';
      const caption = item.fields.caption || '';
      const portfolioImageSetId = item.sys.id || '';

      return {
        imageUrl: coverImageUrl,
        caption: caption,
        portfolioImageSetId: portfolioImageSetId
      };
    });
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return [];
  }
};


export const getPortfolioImageSetDataFromContentful = async (coverImageId, page = 1, limit = 3) => {
  console.log('coverImageId parameter:', coverImageId);

  try {
    // Calculate device-specific image parameters
    const { width, height, quality } = calculateImageParameters();

    const response = await contentfulClient.getEntries({
      content_type: getWorkImageType(), 
      'fields.coverImage.sys.id': coverImageId, // Filter for elememts with coverImageId
      limit: limit,
      skip: (page - 1) * limit, // Calculate the skip based on the page number
    });

    console.log('Contentful Response:', response);

    // Check if the "items" array exists and has items
    if (!response.items || response.items.length === 0) {
      console.log('No WorkCoverImage found in the Contentful response.');
      return { data: [], maxPages: 1 };
    }

    // Construct the image URLs with device-specific parameters
    const workImages = response.items.map((item) => {
      const imageUrl = `${item.fields.image.fields.file.url}?w=${width}&h=${height}&q=${quality}`;
      return {
        imageUrl,
        caption: item.fields.caption,
      };
    });

    const totalItems = response.total || 0;
    const maxPages = Math.ceil(totalItems / limit);
    console.log('getPortfolioImageSetDataFromContentful totalItems:', response.total);
    console.log('getPortfolioImageSetDataFromContentful calculated max pages:', maxPages);

    return { data: workImages, maxPages };
  } catch (error) {
    console.error('Error fetching WorkImages data from Contentful:', error);
    return { data: [], maxPages: 1 };
  }
};