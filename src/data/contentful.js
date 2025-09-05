// api.js

import { getFreeImageType, contentfulConfig, getHomeImagesContentType, getGridImageContentType, getWorkCoverImageType, getWorkImageType, getCiteType, getAboutPageType } from '../constants/constants';
import { createClient } from 'contentful';
import { calculateImageParameters, calculateCoverImageParameters, calculateFullscreenImageParameters } from '../components/general/ImageUtils'

const { spaceId, accessToken } = contentfulConfig;

const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
});

// Helper function to generate fullscreen quality URL from grid URL
export const generateFullscreenImageUrl = (gridImageUrl) => {
  if (!gridImageUrl) return null;
  
  const { width, height, quality } = calculateFullscreenImageParameters();
  
  // Extract base URL (remove existing query parameters)
  const baseUrl = gridImageUrl.split('?')[0];
  
  // Generate new URL with fullscreen parameters
  return `${baseUrl}?w=${width}&h=${height}&q=${quality}`;
};

export async function fetchAboutPagedata() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: getAboutPageType(),
    })

    // Extract relevant data
    const aboutData = response.items.map(item => {
      const gpxFileUrl = item.fields.gpxFile?.fields.file.url;
      const routeInformation = item.fields.routeInformation;
      const totalDistance = item.fields.totalDistance;
      const aboutText = item.fields.aboutText;
      const aboutHeader = item.fields.aboutHeader;
      const routeHeader = item.fields.routeHeader;

      // Extract aboutPhoto information
      const aboutPhoto = item.fields.aboutPhoto;
      const aboutPhotoURL = aboutPhoto?.fields.file.url;

      // Calculate image parameters and construct the responsive image URL
      const { width, height, quality } = calculateImageParameters();
      const responsiveAboutPhotoURL = aboutPhotoURL
        ? `${aboutPhotoURL}?w=${width}&h=${height}&q=${quality}`
        : '';

      return {
        gpxFileUrl,
        routeInformation,
        totalDistance,
        aboutPhotoURL: responsiveAboutPhotoURL,
        aboutText,
        aboutHeader,
        routeHeader,
      };
    });

    return aboutData;

  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function fetchQuote() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: getCiteType(),
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
      order: 'sys.createdAt', // Sorting by creation date in descending order
    });

    // Calculate device-specific image parameters
    const { width, height, quality } = calculateImageParameters();

    // Assuming the response is an array of entries with a 'fields' property
    const imageUrls = response.items.map((item) => {
      const imageUrl = `${item.fields.image.fields.file.url}?w=${width}&h=${height}&q=${quality}`;
      return imageUrl;
    });

    return imageUrls;
  } catch (error) {
    console.error('Error fetching image URLs:', error);
    throw error;
  }
}

export async function getGridImages() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: getGridImageContentType(),
      order: 'sys.createdAt', // Sorting by creation date in descending order
    });

    // For grid images, calculate appropriate image parameters for 4:3 aspect ratio
    // We'll calculate width based on the viewport but with 4:3 aspect ratio
    const { width, quality } = calculateImageParameters();
    const gridWidth = Math.min(width, 600); // Max width for grid items
    const gridHeight = Math.round(gridWidth * 0.75); // 4:3 aspect ratio (3/4 = 0.75)

    // Process the response and return the formatted data
    const imageUrls = response.items.map((item) => {
      const imageUrl = `${item.fields.image.fields.file.url}?w=${gridWidth}&h=${gridHeight}&q=${quality}&fit=fill`;
      return imageUrl;
    });

    return imageUrls;
  } catch (error) {
    console.error('Error fetching grid image URLs:', error);
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

    return response.items.map((item) => {

      const caption = item.fields.caption || '';
      const portfolioImageSetId = item.sys.id || '';

      const { width, height, quality } = calculateCoverImageParameters();

      const imageUrl = `${item.fields.coverImage.fields.file.url}?w=${width}&h=${height}&q=${quality}`;

      return {
        imageUrl: imageUrl,
        caption: caption,
        portfolioImageSetId: portfolioImageSetId
      };
    });
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return [];
  }
};

export const getFreeImagesFromContentful = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: getFreeImageType(), // Use the content type ID you defined in Contentful
      order: 'sys.createdAt', // Order by creation date, newest first
    });

    // Calculate device-specific image parameters
    const { width, height, quality } = calculateImageParameters();

    // Process the response and return the formatted data
    return response.items.map((item) => {
      const imageUrl = `${item.fields.image.fields.file.url}?w=${width}&h=${height}&q=${quality}`;
      const caption = item.fields.image.fields.title || ''; // Use image title as caption
      const moreInfo = item.fields.moreInfo || '';
      
      return {
        imageUrl,
        caption,
        moreInfo,
      };
    });
  } catch (error) {
    console.error('Error fetching FreeImages from Contentful:', error);
    return [];
  }
};


export const getPortfolioImageSetDataFromContentful = async (coverImageId, page = 1, limit = 3) => {
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
      if (process.env.NODE_ENV === 'development') {
        console.log('No WorkCoverImage found in the Contentful response.');
      }
      return { data: [], maxPages: 1 };
    }

    // Construct the image URLs with device-specific parameters
    const workImages = response.items.map((item) => {
      const imageUrl = `${item.fields.image.fields.file.url}?w=${width}&h=${height}&q=${quality}`;
      return {
        imageUrl,
        caption: item.fields.caption,
        moreInfo: item.fields.moreInfo,
      };
    });

    const totalItems = response.total || 0;
    const maxPages = Math.ceil(totalItems / limit);

    return { data: workImages, maxPages };
  } catch (error) {
    console.error('Error fetching WorkImages data from CMS:', error);
    return { data: [], maxPages: 1 };
  }
};