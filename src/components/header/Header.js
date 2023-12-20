// Header.js

import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

  const navRef = useRef(null);

  // ASYNC OPERATION
  const toggleMenu = () => {
    //setMenuOpen((prevMenuOpen) => !prevMenuOpen);

    if (!menuOpen) {
      setIsTransitionEnabled(true);
      setMenuOpen(true);
      console.log('isTransitionEnabled from toggleMenu, setting to true:', isTransitionEnabled);
    } else {
      console.log('toggleMenu, doing nothing to isTransitionEnabled')
      setMenuOpen(false);
    }
  };

  const onTransitionEnd = () => {
    // Only set to false if menu is not open, i.e. has to be called AFTER "setMenu(false)" has async completed 
    if (!menuOpen) {
      console.log('onTransitionEnd called, setting isTransitionEnabled to false');
      setIsTransitionEnabled(false);
    }
  };

  // Attach event listener to the DOM element after the component mounts
  useEffect(() => {
    const navElement = navRef.current;
    navElement.addEventListener('transitionend', onTransitionEnd);

    return () => {
      navElement.removeEventListener('transitionend', onTransitionEnd);
    };
  }, []);

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

