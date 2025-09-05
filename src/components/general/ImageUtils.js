// imageUtils.js

import { DEVICE_WIDTH_PIXEL, IMAGE_WIDTH_PIXEL, ASPECT_RATIO, IMAGE_QUALITY, ASPECT_RATIO_COVER_IMAGES, COVER_IMAGE_WIDTH_PIXEL, COVER_IMAGE_QUALITY, FULLSCREEN_IMAGE_WIDTH_PIXEL, FULLSCREEN_IMAGE_QUALITY } from '../../constants/constants';

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

export const calculateCoverImageParameters = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= DEVICE_WIDTH_PIXEL.LARGE) {
        const width = COVER_IMAGE_WIDTH_PIXEL.LARGE;
        const height = Math.round(width / ASPECT_RATIO_COVER_IMAGES);
        return { width, height, quality: COVER_IMAGE_QUALITY.LARGE };
    } else if (screenWidth >= DEVICE_WIDTH_PIXEL.MEDIUM) {
        const width = COVER_IMAGE_WIDTH_PIXEL.MEDIUM;
        const height = Math.round(width / ASPECT_RATIO_COVER_IMAGES);
        return { width, height, quality: COVER_IMAGE_QUALITY.MEDIUM };
    } else {
        const width = COVER_IMAGE_WIDTH_PIXEL.SMALL;
        const height = Math.round(width / ASPECT_RATIO_COVER_IMAGES);
        return { width, height, quality: COVER_IMAGE_QUALITY.SMALL };
    }
};

export const calculateFullscreenImageParameters = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= DEVICE_WIDTH_PIXEL.LARGE) {
        const width = FULLSCREEN_IMAGE_WIDTH_PIXEL.LARGE;
        const height = Math.round(width / ASPECT_RATIO);
        return { width, height, quality: FULLSCREEN_IMAGE_QUALITY.LARGE };
    } else if (screenWidth >= DEVICE_WIDTH_PIXEL.MEDIUM) {
        const width = FULLSCREEN_IMAGE_WIDTH_PIXEL.MEDIUM;
        const height = Math.round(width / ASPECT_RATIO);
        return { width, height, quality: FULLSCREEN_IMAGE_QUALITY.MEDIUM };
    } else {
        const width = FULLSCREEN_IMAGE_WIDTH_PIXEL.SMALL;
        const height = Math.round(width / ASPECT_RATIO);
        return { width, height, quality: FULLSCREEN_IMAGE_QUALITY.SMALL };
    }
};
