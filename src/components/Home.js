import React from 'react';
import './Home.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import first from './../DJI_0092.jpg';
import second from './../DJI_0111.jpg';

import SequentialTextAnimation from './SequentialTextAnimation';

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
          <SequentialTextAnimation />
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
