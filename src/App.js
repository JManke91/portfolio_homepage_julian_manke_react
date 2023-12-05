import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import About from './components/about/About';
import Portfolio from './components/portfolio/Portfolio';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';

import BlogOverview from './components/BlogOverview';
import BlogDetail from './components/BlogDetail';

function App() {
  // Sample blog data (you can load this from your JSON file or an API)
  const blogPosts = [
    { id: 1, title: 'My First Blog Post', content: 'This is the content of my first blog post.' },
    { id: 2, title: 'Another Blog Post', content: 'This is another blog post.' },
  ];

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use the Home component */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/blog" element={<BlogOverview blogPosts={blogPosts} />} />
          <Route path="/blog/:id" element={<BlogDetail blogPosts={blogPosts} />} />
          
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
