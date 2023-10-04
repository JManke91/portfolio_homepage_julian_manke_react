import React from 'react';
import './Home.css'; // Import your CSS file

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="nav-container">
          {/* Your navigation links */}
        </div>
      </header>
      <div className="content">
        <h1>Welcome to My Photography Portfolio</h1>
        <p>
          I'm a passionate photographer dedicated to capturing moments of beauty and inspiration.
          Explore my portfolio to see my latest work.
        </p>
      </div>
    </div>
  );
}

export default Home;
