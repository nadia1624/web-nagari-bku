import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NewsPage from './pages/NewsPage';
import MappingPage from './pages/MappingPage'; 
import KorongInfoPage from './pages/KorongInfoPage'; 
import LoginPage from './pages/LoginPage';

import './App.css';
import './index.css';
import UmkmPage from './pages/UmkmPage';

// Komponen pembungkus agar bisa akses useLocation di luar Router
const AppLayout = () => {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/berita" element={<NewsPage />} />
          <Route path="/pemetaan" element={<MappingPage />} />
          <Route path="/umkm" element={<UmkmPage />} />
          <Route path="/korong/:korongName" element={<KorongInfoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
