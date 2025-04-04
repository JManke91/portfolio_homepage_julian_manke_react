import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import About from './components/about/About';
import News from './components/news/News';
import PortfolioGrid from './components/portfoliogrid/portfolioGrid';
import PortfolioDetail from './components/portfoliodetail/portfoliodetail';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import { handleConsent } from './components/consent/Consent';
import ConsentPopUp from './components/consent/ConsentPopUp';
import { GOOGLE_TRACKING_ID } from './constants/constants';
import ReactGA from "react-ga4";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AppRoutes />
        <Footer />
        <ConsentPopUp />
      </div>
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();
  const [isGAInitialized, setIsGAInitialized] = useState(false);

  useEffect(() => {
    if (!isGAInitialized) {
      handleConsent((consentStatus) => {
        if (consentStatus) {
          // Consent has been granted -> Start tracking instance
          if (process.env.NODE_ENV === 'development') {
            console.log('Consent given. Initialize tracking...');
          }
          ReactGA.initialize(GOOGLE_TRACKING_ID);
          setIsGAInitialized(true);
        }
      })
    }
  }, [isGAInitialized]); // Only runs once after component mounts

  useEffect(() => {
    if (isGAInitialized) {
      if (process.env.NODE_ENV === 'development') {
        console.log('sending tracking event pageView for page:', location.pathname);
      }

      ReactGA.send({ hitType: "pageview", page: location.pathname });

    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('ReactGA is not initialized or status is not fetched yet, no tracking events sent');
      }
    }
  }, [isGAInitialized, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<News />} />
      <Route path="/portfolio" element={<PortfolioGrid />} />
      <Route path="/portfolio/:id" element={<PortfolioDetail />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App;
