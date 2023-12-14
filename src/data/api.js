// api.js

import { getImageUrl } from '../constants/constants';
import { contentfulConfig, getHomeImagesContentType } from './../constants/constants';
import { createClient } from 'contentful';

const { spaceId, accessToken } = contentfulConfig;

const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
});

// TODO: Rename appropriately 
export async function fetchImageUrls() {
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
