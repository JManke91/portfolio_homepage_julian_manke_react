// Home.js
import React from 'react';
import './Home.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import first from './../DJI_0092.jpg';
import second from './../DJI_0111.jpg';

import { Typewriter } from 'react-simple-typewriter'

function Home() {

  return (
    <div className="home">
      <Parallax pages={2}>
        {/* First Parallax Layer with Image */}
        <ParallaxLayer
          offset={0}
          speed={-0.1}
          factor={1}
          style={{
            backgroundImage: `url(${first})`,
            backgroundSize: 'cover',
          }}
        >
          {/* Text on the First Image */}
          <div className="text-container">
            <div className="text">
              <Typewriter
                words={['Eat very long this is a very long text now and i would expect it to make a line break after reching the end of the width']}
                loop={1}
                cursor
                cursorStyle='_'
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
            backgroundImage: `url(${second})`,
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer sticky={{ start: 1, end: 2 }} />
      </Parallax>
    </div>
  );
}

export default Home;
