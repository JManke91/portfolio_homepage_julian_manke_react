// constants.js

// cover photos cloud project urls
// constants.js
export const contentfulConfig = {
  spaceId: 'f3dcvyrobx5w', // Replace with your actual Contentful Space ID
  accessToken: 'jHgld8SH8a9xe2a2pPrYCYEJQmMpjkPiMkP0NO0alKA', // Replace with your actual Contentful Access Token
};

export const getHomeImagesContentType = () => 'homeImage';
export const getContentType = () => 'portfolioCoverImage';
export const getWorkCoverImageType = () => 'workCoverImage';
export const getWorkImageType = () => 'workImage';

// Layout
// Constants for responsive breakpoints and column counts
export const DEVICE_WIDTH_PIXEL = { SMALL: 500, MEDIUM: 1000, LARGE: 1100 };
export const COLUMN_COUNTS_LAYOUT = { SMALL: 1, MEDIUM: 2, LARGE: 3 };
export const MAX_NUMBER_ROWS_LAYOUT = 2;

// Responsive API Request
export const IMAGE_WIDTH_PIXEL = { LARGE: 3200, MEDIUM: 2400, SMALL: 1600};
export const IMAGE_QUALITY = { LARGE: 80, MEDIUM: 70, SMALL: 60 };
export const ASPECT_RATIO = 16 / 9;
