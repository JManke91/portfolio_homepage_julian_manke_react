import React from 'react';
import './styles.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from React Router


function Header() {
    return (
      <header className="header">
        <div className="nav-container">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

export default Header;
