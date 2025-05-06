import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import AboutPage from './pages/AboutPage';
import TemplatesPage from './pages/TemplatesPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-vietnam">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/story/:id" element={<StoryPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;