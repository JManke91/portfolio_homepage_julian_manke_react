// Header.js

import React, { useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

  // ASYNC OPERATION
  const toggleMenu = () => {
    //setMenuOpen((prevMenuOpen) => !prevMenuOpen);

    if (!menuOpen) {
      setIsTransitionEnabled(true);
      setMenuOpen(true);
      console.log('isTransitionEnabled from toggleMenu:', isTransitionEnabled);
    } else {
      //setIsTransitionEnabled(true);
      setMenuOpen(false);
    }
  };

  const onAnimationEnd = () => {
    // FIXME: NEVER BEING CALLED
    console.log('onAnimationEnd called');
    setIsTransitionEnabled(false);
  };

  return (
    <header className={`header ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <div className="menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav
          onAnimationEnd={onAnimationEnd}
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

