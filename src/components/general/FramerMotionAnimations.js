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

export const imageSlideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    }
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    }
  })
};

export const imageCrossfadeVariants = {
  enter: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  center: {
    zIndex: 1,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Hybrid variants for proper initial/navigation separation
export const hybridInitialVariants = {
  initial: false, // No initial animation - preserves CSS expand
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1200 : -1200,
    opacity: 0,
    scale: 0.96,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 32,
      mass: 0.7,
    }
  })
};

export const hybridNavigationVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 600 : -600,
    opacity: 0,
    scale: 0.98,
    zIndex: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
      mass: 0.4,
    }
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
      mass: 0.4,
    }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 600 : -600,
    opacity: 0,
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 30,
      mass: 0.3,
    }
  })
};

export const hybridCrossfadeVariants = {
  enter: {
    opacity: 0,
    scale: 0.98,
    zIndex: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  center: {
    zIndex: 1,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const hybridReducedMotionVariants = {
  initial: false,
  enter: {
    opacity: 0,
    transition: { duration: 0.1 }
  },
  center: {
    opacity: 1,
    transition: { duration: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 }
  }
};

// Safari-optimized animation variants - simple opacity-only transitions
export const safariOptimizedCrossfadeVariants = {
  enter: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  }
};


