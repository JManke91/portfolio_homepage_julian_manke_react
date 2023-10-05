import React from 'react';
import './Home.css'; // Assuming you have a CSS file for styling
import Header from './Header'; // Import the Header component

function Home() {
  return (
    <div className="home">
      <div className="image-container">
        <img
          src="/DJI_0111.jpg" // Path to your first image
          alt="First Photo"
          className="photo top-photo"
        />
        <img
          src="/DJI_0092.jpg" // Path to your second image
          alt="Second Photo"
          className="photo"
        />
        </div>
    </div>
  );
}

export default Home;