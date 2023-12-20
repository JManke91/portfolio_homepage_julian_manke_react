// api.js

import { contentfulConfig, getHomeImagesContentType, getContentType } from '../constants/constants';
import { createClient } from 'contentful';

const { spaceId, accessToken } = contentfulConfig;

const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
});

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

export const getCoverImagesDataFromContentful = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: getContentType(),
      // Add any additional filters or options as needed
    });

    console.log('Contentful API Response:', response);

    return response.items.map((item) => {
      console.log('Item Fields:', item.fields); // Log the fields of one item

      return {
        imageUrl: item.fields.coverImage.fields.file.url,
        caption: item.fields.caption,
        portfolioImageSetId: item.fields.portfolioImageSet.sys.id,
      };
    });
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return [];
  }
};

export const getPortfolioImageSetDataFromContentful = async (portfolioImageSetId) => {
  console.log('portfolioImageSetId is:', portfolioImageSetId);

  try {
    const response = await contentfulClient.getEntry(portfolioImageSetId);

    console.log('Contentful Response:', response);

    if (!response.fields.images || response.fields.images.length === 0) {
      console.log('No images found in the Contentful response.');
    }

    return response.fields.images?.map((image) => ({
      imageUrl: image.fields.file.url,
      caption: image.fields.caption,
    })) || [];
  } catch (error) {
    console.error('Error fetching PortfolioImageSet data from Contentful:', error);
    return [];
  }
};
