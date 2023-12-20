// Header.js

import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

  const navRef = useRef(null);

  const toggleMenu = () => {

    if (!menuOpen) {
      setIsTransitionEnabled(true);
      setMenuOpen(true);
      console.log('isTransitionEnabled from toggleMenu, setting to true:', isTransitionEnabled);
    } else {
      console.log('toggleMenu, doing nothing to isTransitionEnabled')
      setMenuOpen(false);
    }
  };


  // Attach event listener to the DOM element after the component mounts
  useEffect(() => {
    // This code runs after the component is mounted
  
    const onTransitionEnd = () => {
      // Only set to false if menu is not open
      if (!menuOpen) {
        console.log('onTransitionEnd called, setting isTransitionEnabled to false');
        setIsTransitionEnabled(false);
      }
    };
  
    const navElement = navRef.current;
    navElement.addEventListener('transitionend', onTransitionEnd);
  
    // Cleanup the event listener when the component unmounts
    return () => {
      navElement.removeEventListener('transitionend', onTransitionEnd);
    };
  }, [menuOpen]); // Make sure "useEffect" runs again if "menuOpen" changes to assure "onTransitionEnd" uses the latest value
  

  return (
    <header className={`header ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <div className="menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav
          ref={navRef}
          className={`nav-links ${menuOpen ? 'open' : 'close'} ${isTransitionEnabled ? 'transition-enabled' : 'no-transition'
            }`}
        >
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

