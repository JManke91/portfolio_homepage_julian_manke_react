import React, { useState, useEffect } from 'react';
import './About.css'; // Import the CSS file
import OpenStreetMap from '../general/OpenStreetMap';
import { fetchAboutPagedata } from '../../data/contentful';
import LoadingSpinner from './../loadingspinner/LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { fadeInUpVariants } from './../general/FramerMotionAnimations'

function About() {
  const [routeInformation, setRouteInformation] = useState();
  const [gpxFileUrl, setGpxFileUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [aboutPhotoURL, setAboutPhotoURL] = useState();
  const [aboutText, setAboutText] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const aboutData = await fetchAboutPagedata();

        if (aboutData && aboutData.length > 0) {
          const firstEntry = aboutData[0];

          const aboutPhotoURL = firstEntry.aboutPhotoURL;
          const aboutText = firstEntry.aboutText;

          setRouteInformation(firstEntry.routeInformation);
          setGpxFileUrl(firstEntry.gpxFileUrl);
          setAboutPhotoURL(aboutPhotoURL);
          setAboutText(aboutText);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="about-image-section">
        <motion.div
          className="text-wrapper"
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
        >
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                props.href.startsWith('/') ? (
                  <Link to={props.href}>{props.children}</Link>
                ) : (
                  <a href={props.href} target="_blank" rel="noopener noreferrer">
                    {props.children}
                  </a>
                )
              ),
              p: ({ node, ...props }) => <p>{props.children}</p>,
              span: ({ node, ...props }) => <span>{props.children}</span>,
            }}
          >
            {aboutText}
          </ReactMarkdown>
        </motion.div>

        <motion.div
          className="image-container"
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="image-overlay"></div>
          <img src={aboutPhotoURL} alt="About" />
        </motion.div>
      </section>

      <section className="horizontal-line-section">
        <div className="horizontal-line"></div>
      </section>

      <section id="about" className="about">
        <div className="map-container">
          {gpxFileUrl && <OpenStreetMap gpxFileUrl={gpxFileUrl} />}
        </div>
        <div className="route-info-container">
          <p>{routeInformation}</p>
        </div>
      </section>
    </>
  );
}

export default About;
