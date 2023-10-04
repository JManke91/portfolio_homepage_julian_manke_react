import React from 'react';
import './styles.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'; // Import the email icon from free-regular-svg-icons

function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
          {/* Your other footer content */}
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

