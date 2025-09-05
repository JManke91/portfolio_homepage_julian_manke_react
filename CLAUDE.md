# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (opens Chrome automatically)
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Project Architecture

This is a React-based photography portfolio website with the following key architectural patterns:

### Content Management
- **Contentful CMS Integration**: All content (images, text, portfolio items) is managed via Contentful
- **Content Types**: `homeImage`, `workCoverImage`, `workImage`, `freeImage`, `cite`, `aboutPage`
- **API Client**: Centralized in `src/data/contentful.js` with functions for fetching different content types
- **Configuration**: Contentful space ID and access token in `src/constants/constants.js`

### Image Optimization System
- **Responsive Images**: Dynamic image sizing based on device breakpoints (SMALL: 500px, MEDIUM: 768px, LARGE: 1200px)
- **Quality Optimization**: Different quality levels per device size to optimize loading
- **Server-side Pagination**: Portfolio images load incrementally for performance
- **Image Parameters**: Calculated via `ImageUtils.js` functions (`calculateImageParameters`, `calculateCoverImageParameters`)

### Component Structure
- **Main App**: `App.js` handles routing and Google Analytics initialization with consent management
- **Core Pages**: Home, About, Portfolio Grid, Portfolio Detail, News
- **Key Components**: Header, Footer, ConsentPopUp, LoadingSpinner, ImageModal
- **Utilities**: FramerMotionAnimations, Logger, OpenStreetMap integration
- **Styling**: CSS modules alongside traditional CSS files

### Routing & State Management
- **React Router**: Client-side routing with routes for `/`, `/news`, `/portfolio`, `/portfolio/:id`, `/about`
- **Google Analytics**: Integrated with consent management system using react-ga4
- **Cookie Consent**: Custom consent popup system with local storage management

### Key Features
- **Portfolio Detail View**: Dynamic portfolio pages with infinite scroll loading
- **Map Integration**: Leaflet/OpenStreetMap for route visualization with GPX file support
- **News Section**: Dedicated news/blog functionality
- **Mobile Optimization**: Responsive design with masonry layout for portfolio grid
- **Animation System**: Framer Motion integration for smooth transitions

### Important Files
- `src/constants/constants.js`: All configuration constants including breakpoints, image settings, content types
- `src/data/contentful.js`: Contentful API integration and data fetching functions
- `src/components/general/`: Shared utilities and components
- `src/components/portfoliogrid/getDataAndUpdateState.js`: Portfolio data management logic

### Development Notes
- Uses Create React App as base framework
- FontAwesome icons integrated
- Custom loading spinner and image modal components
- GPX route parsing for outdoor photography locations
- GitHub Actions pipeline for deployment