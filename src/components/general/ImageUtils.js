// imageUtils.js

import { DEVICE_WIDTH_PIXEL, IMAGE_WIDTH_PIXEL, ASPECT_RATIO, IMAGE_QUALITY } from '../../constants/constants';

export const calculateImageParameters = () => {
    const screenWidth = window.innerWidth;
  
    if (screenWidth >= DEVICE_WIDTH_PIXEL.LARGE) {
      // Large screens, 3 columns x 2 rows
      const width = IMAGE_WIDTH_PIXEL.LARGE;
      const height = Math.round(width / ASPECT_RATIO);
      return { width, height, quality: IMAGE_QUALITY.LARGE };
    } else if (screenWidth >= DEVICE_WIDTH_PIXEL.MEDIUM) {
      // Medium screens, 2 columns x 2 rows
      const width = IMAGE_WIDTH_PIXEL.MEDIUM;
      const height = Math.round(width / ASPECT_RATIO);
      return { width, height, quality: IMAGE_QUALITY.MEDIUM };
    } else {
      // Small screens, 1 column x 2-3 rows
      const width = IMAGE_WIDTH_PIXEL.SMALL;
      const height = Math.round(width / ASPECT_RATIO);
      return { width, height, quality: IMAGE_QUALITY.SMALL };
    }
  };
  