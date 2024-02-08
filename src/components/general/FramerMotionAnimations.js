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

export const homeTextFadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      duration: 1.0,
      delay: 0.25,
    }
  }
}

export const homeTextCloudVariants = {
  hidden: {
    opacity: 0,
    scale: 0.2,
    filter: 'blur(20px)', // Start with a significant blur
    letterSpacing: '0.5em', // Initially increase letter spacing for scattering
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)', // Gradually remove the blur
    letterSpacing: '0', // Bring letter spacing back to normal
    transition: {
      opacity: {
        delay: 0.2,
        duration: 1.2,
      },
      scale: {
        delay: 0.2,
        duration: 1.0,
        ease: [0.5, 0, 0.5, 1],
      },
      filter: {
        delay: 0.2,
        duration: 1.6, // Longer duration to smoothly remove blur
        ease: 'easeInOut',
      },
      letterSpacing: {
        delay: 0.2,
        duration: 1.0, // Longer duration to bring letter spacing back to normal
        ease: 'easeInOut',
      },
    },
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


