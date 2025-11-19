// Imports
import React, { useState, useEffect } from 'react';
import styles from './About.module.css';
import OpenStreetMap from '../general/OpenStreetMap';
import { fetchAboutPagedata } from '../../data/contentful';
import LoadingSpinner from './../loadingspinner/LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUpVariants } from './../general/FramerMotionAnimations'
import Reveal from './../general/Reveal';

function About() {
  // State
  const [routeInformation, setRouteInformation] = useState();
  const [gpxFileUrl, setGpxFileUrl] = useState();
  const [headerText, setHeaderText] = useState();
  const [routeHeader, setRouteHeader] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [aboutPhotoURL, setAboutPhotoURL] = useState();
  const [aboutText, setAboutText] = useState();
  const [aboutImageURL, setAboutImageURL] = useState();
  const [aboutInfoText, setAboutInfoText] = useState();

  // React Hooks
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
          setAboutImageURL(firstEntry.aboutImageURL);
          setAboutInfoText(firstEntry.aboutInfoText);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Rendering
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className={styles['about-image-section']}>
        <motion.div
          className={styles['text-wrapper']}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
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
          className={styles['image-container']}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles['image-overlay']}></div>
          <img src={aboutPhotoURL} alt="About" />
        </motion.div>
      </section>

      <section className={styles['horizontal-line-section']}>
        <motion.div
          className={styles['horizontal-line']}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
        >
        </motion.div>
      </section>

      {aboutImageURL && aboutInfoText && (
        <section className={styles['new-about-section']}>
          <motion.div
            className={styles['new-about-image-container']}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
          >
            <img src={aboutImageURL} alt="About" className={styles['new-about-image']} />
          </motion.div>

          <motion.div
            className={styles['new-about-text-container']}
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
              {aboutInfoText}
            </ReactMarkdown>
          </motion.div>
        </section>
      )}

      <section className={styles['horizontal-line-section']}>
        <motion.div
          className={styles['horizontal-line']}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
        >
        </motion.div>
      </section>

      <section id="about" className={styles['about']}>
        <motion.div
          className={styles['map-container']}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
        >
          {gpxFileUrl && <OpenStreetMap gpxFileUrl={gpxFileUrl} />}
        </motion.div>

        <motion.div
          className={styles['route-info-container']}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
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
