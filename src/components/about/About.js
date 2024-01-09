import React, { useState, useEffect } from 'react';
import './About.css'; // Import the CSS file
import OpenStreetMap from '../general/OpenStreetMap';
import { fetchAboutPagedata } from '../../data/contentful';
import LoadingSpinner from './../loadingspinner/LoadingSpinner'; // Adjust the path based on your project structure

function About() {
    const [routeInformation, setRouteInformation] = useState();
    const [gpxFileUrl, setGpxFileUrl] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [aboutPhotoURL, setAboutPhotoURL] = useState();
    const [totalDistance, setTotalDistance] = useState();
    const [aboutText, setAboutText] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const aboutData = await fetchAboutPagedata();

                if (aboutData && aboutData.length > 0) {
                    const firstEntry = aboutData[0];
                    console.log('content:', firstEntry);

                    const aboutPhotoURL = firstEntry.aboutPhotoURL;
                    const totalDistance = firstEntry.totalDistance;
                    const aboutText = firstEntry.aboutText;

                    setRouteInformation(firstEntry.routeInformation);
                    setGpxFileUrl(firstEntry.gpxFileUrl);
                    setAboutPhotoURL(aboutPhotoURL);
                    setTotalDistance(totalDistance);
                    setAboutText(aboutText);
                }
                // set data
            } catch (error) {
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <section id="about" className="about">
                <div className="map-container">
                    {gpxFileUrl && <OpenStreetMap gpxFileUrl={gpxFileUrl} />}
                </div>
                <div className="route-info-container">
                    <p>{routeInformation}</p>
                </div>
            </section>

            <section className="horizontal-line-section">
                <div className="horizontal-line"></div>
            </section>

            <section className="about-image-section">
                <div className="text-container">
                    <p>{aboutText}</p>
                </div>
                <div className="image-container">
                    <img src={aboutPhotoURL} alt="About Photo" />
                </div>
            </section>
        </>
    );
}

export default About;
