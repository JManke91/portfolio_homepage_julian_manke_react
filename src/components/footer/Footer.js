// Imports
import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {

    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Your other footer content */}
                <div className="follow-section">

                    <div className="instagram-section">
                        <a
                            href="https://www.instagram.com/julian.manke/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="instagram-link"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="1x" />
                        </a>
                        <p className="hello-text">Julian.Manke</p>
                    </div>
                    {/* Add another Instagram logo and text */}
                    <div className="instagram-section">
                        <a
                            href="https://www.instagram.com/nadjablochberger/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="instagram-link"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="1x" />
                        </a>
                        <p className="hello-text">nadjablochberger</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
