// api.js

import { contentfulConfig, getHomeImagesContentType, getWorkCoverImageType, getWorkImageType, getCiteType, getAboutPageType } from '../constants/constants';
import { createClient } from 'contentful';
import { calculateImageParameters, calculateCoverImageParameters } from '../components/general/ImageUtils'

const { spaceId, accessToken } = contentfulConfig;

const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
});

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