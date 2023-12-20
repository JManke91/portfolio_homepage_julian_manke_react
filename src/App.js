import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import About from './components/about/About';
import PortfolioGrid from './components/portfoliogrid/portfolioGrid';
import PortfolioDetail from './components/portfoliodetail/portfoliodetail';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';

import GetImageAndCaptionDataAndUpdateState from './components/portfoliogrid/getDataAndUpdateState';

function App() {
  // TODO: Fetch Data only when page is clicked
  const { blogItemsData } = GetImageAndCaptionDataAndUpdateState();

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use the Home component */}
          <Route path="/portfolio" element={<PortfolioGrid blogItemsData={blogItemsData} />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/about" element={<About />} />

          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
