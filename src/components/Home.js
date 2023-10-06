import React from 'react';
import './Home.css'; // Assuming you have a CSS file for styling
import Header from './Header'; // Import the Header component
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import first from './../DJI_0092.jpg';
import second from './../DJI_0111.jpg';

function Home() {
  return (
    <div className="home">
      <Parallax pages={2}>
        <ParallaxLayer
          offset={0}
          speed={-0.1}
          factor={1}
          style={{
            backgroundImage: `url(${first})`,
            backgroundSize: 'cover',
          }}
        />

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