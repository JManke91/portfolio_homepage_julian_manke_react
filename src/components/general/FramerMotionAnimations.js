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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      duration: 0.5,
      delay: 0.125,
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
        duration: 0.6,
      },
      scale: {
        delay: 0.2,
        duration: 0.5,
        ease: [0.5, 0, 0.5, 1],
      },
      filter: {
        delay: 0.2,
        duration: 0.8, // Longer duration to smoothly remove blur
        ease: 'easeInOut',
      },
      letterSpacing: {
        delay: 0.2,
        duration: 0.5, // Longer duration to bring letter spacing back to normal
        ease: 'easeInOut',
      },
    },
  },
};

