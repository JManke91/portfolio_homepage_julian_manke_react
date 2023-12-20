import React, { useState, useEffect } from 'react';
import './Home.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Typewriter } from 'react-simple-typewriter';

import { getHomeImages } from '../../data/contentful';

function Home() {
  // LIFECYCLE:
  // useState hook initializes the imageUrls state to an empty array, and the component renders with an initial state.
  // When the Home component mounts, the useState hook initializes the imageUrls state to an empty array, and the component renders with an initial state.
  // the state update triggers a re-render of the component.
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Function to fetch image URLs
    // TODO: Fetch images in lower quality
    // TODO: Provide proper error handling, if fetching of images fails
    // TODO: Make data fetching more generic, so logic can be used accross several use cases
    // TOOD: Implement repositories
    async function fetchData() {
      try {
        const urls = await getHomeImages();
        setImageUrls(urls);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
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
