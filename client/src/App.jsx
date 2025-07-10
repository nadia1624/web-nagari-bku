import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NewsPage from './pages/NewsPage';
import MappingPage from './pages/MappingPage'; 
import KorongInfoPage from './pages/KorongInfoPage'; 

import './App.css';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/berita" element={<NewsPage />} />
            <Route path="/pemetaan" element={<MappingPage />} />
            <Route path="/korong/:korongName" element={<KorongInfoPage />} />
            {/* Fallback untuk rute tidak ditemukan */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;