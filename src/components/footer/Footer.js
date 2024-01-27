// Imports
import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import _debounce from 'lodash/debounce';
import { DEBOUNCE_SCROLLING } from '../../constants/constants';

function Footer() {
    // State
    const [isFooterVisible, setIsFooterVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    // References
    const footerRef = useRef(null);

    // React Hooks
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const scrollThreshold = 20; // Adjust this threshold as needed

            const windowHeight = window.innerHeight;
            const myPadding = 0.4 * window.innerHeight;
            const footerHeight = footerRef.current.clientHeight + myPadding;

            if (Math.abs(prevScrollPos - currentScrollPos) > scrollThreshold) {
                setIsFooterVisible(
                    prevScrollPos > currentScrollPos ||
                    currentScrollPos + footerHeight >= windowHeight ||
                    currentScrollPos === 0
                );
                setPrevScrollPos(currentScrollPos);
            }
        };

        // Debouncing necessary to avoid bug in Safari, in which nav bar re appears when scrolling to the top woth bouncing
        const debouncedHandleScroll = _debounce(handleScroll, DEBOUNCE_SCROLLING); // Adjust the debounce delay


        window.addEventListener('scroll', debouncedHandleScroll);

        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, [prevScrollPos]);

    return (
        <footer ref={footerRef} className={`footer ${isFooterVisible ? 'footer-visible' : 'footer-hidden'}`}>
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
