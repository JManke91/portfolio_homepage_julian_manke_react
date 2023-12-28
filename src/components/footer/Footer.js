import React, { useState, useEffect } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    const [isFooterVisible, setIsFooterVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const scrollThreshold = 20; // Adjust this threshold as needed

            if (Math.abs(prevScrollPos - currentScrollPos) > scrollThreshold) {
                setIsFooterVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
                setPrevScrollPos(currentScrollPos);
            }
        };


        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <footer className={`footer ${isFooterVisible ? 'footer-visible' : 'footer-hidden'}`}>
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
