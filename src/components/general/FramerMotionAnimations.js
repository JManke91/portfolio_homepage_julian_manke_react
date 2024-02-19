import { INFO_TEXT_FADE_IN_ANIMATION_DURARION } from './../../constants/constants'

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      duration: 0.5,
      delay: 0.25 // Add a delay of 0.25s
    }
  },
};

export const buttonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  hover: { opacity: 0.8 },
  tap: { opacity: 0.6 }
};

export const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const infoTextVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: {
      duration: INFO_TEXT_FADE_IN_ANIMATION_DURARION
    }
  },
  visible: {
    opacity: 1,
    y: -10,
    transition: {
      duration: INFO_TEXT_FADE_IN_ANIMATION_DURARION,
    },
  },
};


