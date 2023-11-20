// constants.js

// cover photos cloud project urls
// constants.js

export const _bucketName = 'portfoliowebsiteimages';
export const _storageBaseURL = `https://storage.googleapis.com/storage/v1/b/${_bucketName}/o`;
export const _imagesPrefix = 'images/';
export const _captionsPrefix = 'captions/';
export const _captionFileExtension = '.txt';
export const _homeImagesPrefix = 'homeimages/';


// Function to construct image URLs
export const getImageUrl = (imageName) => {
  return `${_storageBaseURL}?prefix=${_homeImagesPrefix}`;
};
