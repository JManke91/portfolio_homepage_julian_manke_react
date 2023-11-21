// api.js

import { getImageUrl } from '../constants/constants';

export async function fetchImageUrls() {
  try {
    const response = await fetch(getImageUrl());

    if (!response.ok) {
      throw new Error(`Failed to fetch image URLs. Status: ${response.status}`);
    }

    const data = await response.json();

    console.log('Data:', data); // Log the data received from the API


    // Assuming the response is an array of objects with a 'name' property
    const imageUrls = data.items
      .filter((item) => !item.name.endsWith('/'))
      .map((item) => item.mediaLink);

    return imageUrls;
  } catch (error) {
    console.error('Error fetching image URLs:', error);
    throw error; // Re-throw the error to be caught by the calling function
  }
}
