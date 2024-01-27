import React, { useState, useEffect } from 'react';
import './About.css'; // Import the CSS file
import OpenStreetMap from '../general/OpenStreetMap';
import { fetchAboutPagedata } from '../../data/contentful';
import LoadingSpinner from './../loadingspinner/LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { fadeInUpVariants } from './../general/FramerMotionAnimations'
import Reveal from './../general/Reveal';

function About() {
  const [routeInformation, setRouteInformation] = useState();
  const [gpxFileUrl, setGpxFileUrl] = useState();
  const [headerText, setHeaderText] = useState();
  const [routeHeader, setRouteHeader] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [aboutPhotoURL, setAboutPhotoURL] = useState();
  const [aboutText, setAboutText] = useState();

  const mainAnimationControl = useAnimation();

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
          setHeaderText(firstEntry.aboutHeader);
          setRouteHeader(firstEntry.routeHeader);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
        // control the state of the animation
        mainAnimationControl.start("visible");
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
          animate={mainAnimationControl}
        >
          <h2>{headerText}</h2>
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
          animate={mainAnimationControl}
        >
          <div className="image-overlay"></div>
          <img src={aboutPhotoURL} alt="About" />
        </motion.div>
      </section>

      <section className="horizontal-line-section">
        <motion.div
          className="horizontal-line"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={mainAnimationControl}
        >
        </motion.div>
      </section>

      <section id="about" className="about">
        <motion.div
          className="map-container"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={mainAnimationControl}
        >
          {gpxFileUrl && <OpenStreetMap gpxFileUrl={gpxFileUrl} />}
        </motion.div>

        <motion.div
          className="route-info-container"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={mainAnimationControl}
        >
          <h2>{routeHeader}</h2>
          <Reveal>
            <p>{routeInformation}</p>
          </Reveal>
        </motion.div>


      </section>
    </>
  );
}

export default About;
