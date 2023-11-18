// PhotoGrid.js
import React from 'react';
import { Grid } from 'react-visual-grid'; // Import the Grid component

const PhotoGrid = ({ blogPosts }) => {
  return (
    <VisualGrid columns={2}>
      {blogPosts.map((post, index) => (
        <div key={post.id}>
          <img
            src={`/images/image${index + 1}.png`}
            alt={post.title}
          />
          <h2>{post.title}</h2>
        </div>
      ))}
    </VisualGrid>
  );
};

export default PhotoGrid;