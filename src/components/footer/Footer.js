import React from 'react';
import './Footer.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
          {/* Your other footer content */}
          <p className="follow-text">Follow</p>
          <a
            href="https://www.instagram.com/julian.manke/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </footer>
    );
  }

export default Footer;

