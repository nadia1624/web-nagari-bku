import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NewsPage from './pages/NewsPage';
// import MappingPage from './pages/MappingPage';

import './App.css'
import './index.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'profile':
        return <ProfilePage />;
      case 'berita':
        return <NewsPage />;
      // case 'pemetaan':
      //   return <MappingPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
