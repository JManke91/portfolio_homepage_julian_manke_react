import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import About from './components/about/About';
import PortfolioGrid from './components/portfoliogrid/portfolioGrid';
import PortfolioDetail from './components/portfoliodetail/portfoliodetail';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import { handleConsent } from './components/consent/Consent';
import ConsentPopUp from './components/consent/ConsentPopUp';

function App() {

  useEffect(() => {
    handleConsent();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<PortfolioGrid />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/about" element={<About />} />

          {/* Add more routes as needed */}
        </Routes>
        <Footer />
        <ConsentPopUp/>
      </div>
    </Router>
  );
}

export default App;
