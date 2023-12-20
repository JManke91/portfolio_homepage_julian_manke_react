import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const navRef = useRef(null);

  const toggleMenu = () => {
    if (!menuOpen) {
      setIsTransitionEnabled(true);
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const onTransitionEnd = () => {
      if (!menuOpen) {
        setIsTransitionEnabled(false);
      }
    };

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsHeaderVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    const navElement = navRef.current;
    navElement.addEventListener('transitionend', onTransitionEnd);

    window.addEventListener('scroll', handleScroll);

    return () => {
      navElement.removeEventListener('transitionend', onTransitionEnd);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen, setIsHeaderVisible, prevScrollPos]);

  return (
    <header className={`header ${menuOpen ? 'menu-open' : ''} ${!isHeaderVisible ? 'header-hidden' : 'header-visible'}`}>
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
