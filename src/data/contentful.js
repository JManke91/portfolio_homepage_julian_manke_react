// api.js

import { contentfulConfig, getHomeImagesContentType, getWorkCoverImageType } from '../constants/constants';
import { createClient } from 'contentful';

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


export const getPortfolioImageSetDataFromContentful = async (coverImageId, page = 1, limit = 1) => {
  console.log('coverImageId parameter:', coverImageId);

  try {
    const response = await contentfulClient.getEntries({
      'sys.id': coverImageId, // cover Image Id
      content_type: 'workCoverImage',
      limit: limit, // Set the limit
      skip: (page - 1) * limit, // Calculate the skip based on the page number
    });

    console.log('Contentful Response:', response);

    // Check if the "items" array exists and has items
    if (!response.items || response.items.length === 0) {
      console.log('No WorkCoverImage found in the Contentful response.');
      return [];
    }

    // Assuming "workImages" is the correct field name for linked WorkImage entries
    const workImages = response.items[0].fields.workImages;

    // Map through the "workImages" and retrieve the image data
    return workImages.map((workImage) => ({
      imageUrl: workImage.fields.image.fields.file.url,
      caption: workImage.fields.caption,
    })).slice((page - 1) * limit, page * limit); // Apply pagination
  } catch (error) {
    console.error('Error fetching WorkImages data from Contentful:', error);
    return [];
  }
};

















