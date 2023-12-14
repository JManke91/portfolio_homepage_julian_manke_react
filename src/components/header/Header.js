// Header.js

import React, { useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <header className={`header ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <div className="menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
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
