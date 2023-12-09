import React, { useState, useRef, useEffect } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

  const overlayRef = useRef();
  const navLinksRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (!menuOpen) {
        // Reset transformations for larger devices
        resetParameters()
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => {
      const navLinks = navLinksRef.current;
      const overlay = overlayRef.current;

      if (navLinks && overlay) {
        setIsTransitionEnabled(true);
        if (!prevMenuOpen) {
          // Open menu
          navLinks.style.transform = 'translateX(0)';
          overlay.style.opacity = '1';

        } else {
          // Close menu
          navLinks.style.transform = 'translateX(100%)';
          overlay.style.opacity = '0';
        }
      }

      return !prevMenuOpen; // Toggle the menu state
    });
  };


  const closeMenu = () => {
    // setIsTransitionEnabled(true);
    setMenuOpen(false);

    resetParameters()
      
    setIsTransitionEnabled(false);
  };

  const handleTransitionEnd = () => {
    setIsTransitionEnabled(false);
  };

  const resetParameters = () => {
    const navLinks = navLinksRef.current;
    const overlay = overlayRef.current;

    if (navLinks && overlay) {
      navLinks.style.transform = '';
      overlay.style.opacity = '';
    }
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
          ref={navLinksRef}
          className={`nav-links ${isTransitionEnabled ? 'transition' : ''}`}
          onTransitionEnd={handleTransitionEnd}
        >
          <ul>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/portfolio" onClick={closeMenu}>Portfolio</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          </ul>
        </nav>
        <div
          ref={overlayRef}
          className="overlay"
          onClick={toggleMenu}
        ></div>
      </div>
    </header>
  );
}

export default Header;
