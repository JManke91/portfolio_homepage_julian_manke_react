// Imports
import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/wb_logo.png';

function Header() {
  // State
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  // References
  const navRef = useRef(null);
  const headerRef = useRef();

  // react-router-dom
  const location = useLocation();

  // State Controls
  const toggleMenu = () => {
    if (!menuOpen) {
      setIsTransitionEnabled(true);
      setMenuOpen(true);
      disableScrolling();
    } else {
      setMenuOpen(false);
      enableScrolling();
    }
  };

  const disableScrolling = () => {
    document.body.style.overflow = 'hidden';
  }

  const enableScrolling = () => {
    document.body.style.overflow = 'visible';
  }

  // React Hooks
  useEffect(() => {
    const onTransitionEnd = () => {
      if (!menuOpen) {
        setIsTransitionEnabled(false);
        enableScrolling();
      }
    };

    const navElement = navRef.current;
    navElement.addEventListener('transitionend', onTransitionEnd);

    return () => {
      navElement.removeEventListener('transitionend', onTransitionEnd);
    };
  }, [menuOpen]);

  useEffect(() => {
    // Extract the route name from the location pathname
    const currentRoute = location.pathname.split('/')[1];

    setActiveLink(currentRoute || 'home'); // Set default to 'home' if no route is present
  }, [location.pathname]);

  // Render
  return (
    <header ref={headerRef} className={`header ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <div className="menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="favicon">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <nav
          ref={navRef}
          className={`nav-links ${menuOpen ? 'open' : 'close'} ${isTransitionEnabled ? 'transition-enabled' : 'no-transition'
            }`}
        >
          <ul>
            <li><Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={activeLink === 'home' ? 'active' : ''}
            >Home</Link></li>
            <li><Link
              to="/places"
              onClick={() => setMenuOpen(false)}
              className={activeLink === 'places' ? 'active' : ''}
            >Places</Link></li>
            <li><Link
              to="/things"
              onClick={() => setMenuOpen(false)}
              className={activeLink === 'things' ? 'active' : ''}
            >Things</Link></li>
            <li><Link
              to="/portfolio"
              onClick={() => setMenuOpen(false)}
              className={activeLink === 'portfolio' ? 'active' : ''}
            >Work</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
