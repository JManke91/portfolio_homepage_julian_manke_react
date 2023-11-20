import React, { useState, useEffect } from 'react';
import './Home.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Typewriter } from 'react-simple-typewriter';

// Import constants
import { getImageUrl } from '../../constants/constants';

function Home() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Function to fetch image URLs
    // TODO: Fetch images in lower quality
    // TODO: Provide proper error handling, if fetching of images fails
    // TODO: Make data fetching more generic, so logic can be used accross several use cases
    // TOOD: Implement repositories
    async function fetchImageUrls() {
      try {
        const response = await fetch(getImageUrl());


        if (!response.ok) {
          throw new Error(`Failed to fetch image URLs. Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the response is an array of objects with a 'name' property
        const imageNames = data.items
          .filter((item) => !item.name.endsWith('/'))
          .map((item) => item.mediaLink);

        const firstImageURL = imageNames.length > 0 ? imageNames[0] : null;
        const secondImageURL = imageNames.length > 1 ? imageNames[1] : null;

        console.log('First Image URL:', firstImageURL);
        console.log('Second Image URL:', secondImageURL);

        setImageUrls([firstImageURL, secondImageURL]);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    }

    fetchImageUrls();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="home">
      <Parallax pages={2}>
        {/* First Parallax Layer with Image */}
        <ParallaxLayer
          offset={0}
          speed={-0.1}
          factor={1}
          style={{
            backgroundImage: `url(${imageUrls[0]})`,
            backgroundSize: 'cover',
          }}
        >
          {/* Text on the First Image */}
          <div className="text-container">
            <div className="text">
              <Typewriter
                words={[
                  'Eat very long this is a very long text now and I would expect it to make a line break after reaching the end of the width',
                ]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </div>
          </div>
        </ParallaxLayer>

        {/* Second Parallax Layer with Image */}
        <ParallaxLayer
          offset={0.9}
          speed={0.1}
          factor={1.2}
          style={{
            backgroundImage: `url(${imageUrls[1]})`,
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer sticky={{ start: 1, end: 2 }} />
      </Parallax>
    </div>
  );
}

export default Home;
