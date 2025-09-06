// constants.js

// cover photos cloud project urls
export const contentfulConfig = {
  spaceId: 'f3dcvyrobx5w', // Replace with your actual Contentful Space ID
  accessToken: 'jHgld8SH8a9xe2a2pPrYCYEJQmMpjkPiMkP0NO0alKA', // Replace with your actual Contentful Access Token
};

export const getHomeImagesContentType = () => 'homeImage';
export const getGridImageContentType = () => 'gridImage';
export const getContentType = () => 'portfolioCoverImage';
export const getWorkCoverImageType = () => 'workCoverImage';
export const getFreeImageType = () => 'freeImage';
export const getWorkImageType = () => 'workImage';
export const getCiteType = () => 'cite';
export const getAboutPageType = () => 'aboutPage';
export const getGridImagePlacesType = () => 'gridImagePlaces';
export const getGridImageThingsType = () => 'gridImageThings';

// Debounce Scrolling
export const DEBOUNCE_SCROLLING = 50; 

// Layout
// Constants for responsive breakpoints and column counts
export const DEVICE_WIDTH_PIXEL = { SMALL: 500, MEDIUM: 768, LARGE: 1200 };
export const COLUMN_COUNTS_LAYOUT = { SMALL: 1, MEDIUM: 2, LARGE: 3 };
export const MAX_NUMBER_ROWS_LAYOUT = 2;

// Responsive API Request
export const IMAGE_WIDTH_PIXEL = { LARGE: 1400, MEDIUM: 1000, SMALL: 700};
export const IMAGE_QUALITY = { LARGE: 80, MEDIUM: 75, SMALL: 70 };

// Fullscreen Image Parameters (high quality for modal viewing)
export const FULLSCREEN_IMAGE_WIDTH_PIXEL = { LARGE: 2400, MEDIUM: 1800, SMALL: 1200};
export const FULLSCREEN_IMAGE_QUALITY = { LARGE: 90, MEDIUM: 85, SMALL: 80 };
export const ASPECT_RATIO = 16 / 9;

export const ASPECT_RATIO_COVER_IMAGES = 1 / 1;
export const COVER_IMAGE_WIDTH_PIXEL = { LARGE: 1600, MEDIUM: 1200, SMALL: 800};
export const COVER_IMAGE_QUALITY = { LARGE: 60, MEDIUM: 50, SMALL: 40 };

// Masonry Layout constants
export const GUTTER_VALUE = '24px'; // Set your desired gutter value here

// Cookie & Tracking Values
export const ANALYTICS_CONSENT_KEY = 'analytics_consent';
export const GOOGLE_TRACKING_ID = 'G-8HPBSMWJR5';

// PortfolioGrid Detail
export const BACK_BUTTON_TEXT = 'Previous';

// Animation Control Constants
export const INFO_TEXT_FADE_IN_ANIMATION_DURARION = 0.5;
export const OVERLAY_IMAGE_OPACITY_TRANSITION_DURATION = 0.5;
export const OVERLAY_IMAGE_END_OPACITY = 0.6;
export const OVERLAY_IMAGE_BLUR_VALUE = '5px';
