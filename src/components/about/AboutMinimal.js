// Imports
import React, { useState, useEffect } from 'react';
import styles from './AboutMinimal.module.css';
import { fetchAboutPagedata } from '../../data/contentful';
import LoadingSpinner from './../loadingspinner/LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUpVariants } from './../general/FramerMotionAnimations';

function AboutMinimal() {
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [aboutImageURL, setAboutImageURL] = useState();
  const [aboutInfoText, setAboutInfoText] = useState();

  // React Hooks
  useEffect(() => {
    async function fetchData() {
      try {
        const aboutData = await fetchAboutPagedata();

        if (aboutData && aboutData.length > 0) {
          const firstEntry = aboutData[0];
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

  // Show message if content is missing
  if (!aboutImageURL && !aboutInfoText) {
    return (
      <section className={styles['about-minimal']}>
        <div className={styles['about-container']}>
          <motion.div
            className={styles['text-container']}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: '100%', textAlign: 'center' }}
          >
            <h2>About page content is not available yet</h2>
            <p>Please add the following fields to your Contentful "aboutPage" content model:</p>
            <ul style={{ textAlign: 'left', display: 'inline-block' }}>
              <li><strong>aboutImage</strong> (Media field - Image)</li>
              <li><strong>aboutInfoText</strong> (Long text field - Markdown supported)</li>
            </ul>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles['about-minimal']}>
      <div className={styles['about-container']}>
        {aboutInfoText && (
          <motion.div
            className={styles['text-container']}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className={styles['about-header']}>Über Julian Manke</h1>
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
                h1: ({ node, ...props }) => <h1>{props.children}</h1>,
                h2: ({ node, ...props }) => <h2>{props.children}</h2>,
                h3: ({ node, ...props }) => <h3>{props.children}</h3>,
              }}
            >
              {aboutInfoText}
            </ReactMarkdown>
          </motion.div>
        )}

        {aboutImageURL && (
          <motion.div
            className={styles['image-container']}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              src={aboutImageURL}
              alt="About"
              className={styles['about-image']}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default AboutMinimal;
