import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Public Components
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';

// Public Pages
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NewsPage from './pages/NewsPage';
import MappingPage from './pages/MappingPage'; 
import KorongInfoPage from './pages/KorongInfoPage'; 
import LoginPage from './pages/LoginPage';
import UmkmPage from './pages/UmkmPage';
import NewsDetailPage from './pages/NewsDetailPage';
import AgriMappingPage from './pages/AgriMappingPage';

// Admin Pages
import AdminDashboard from './pages/AdminDashboardPage';
import AdminBerita from './pages/BeritaManagementPage';
import AdminUmkm from './pages/AdminUmkm';
import AdminInformasi from './pages/AdminInformasiPage'

// Admin Layout Components
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/Header';

import './App.css';
import './index.css';

// Public Layout Component
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Admin Layout Component
const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={isMobile}
      />
      
      <div className="flex-1">
        <AdminHeader 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

const AppLayout = () => {
  const location = useLocation();
  
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';
  
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={
        <PublicLayout>
          <HomePage />
        </PublicLayout>
      } />
      
      <Route path="/profile" element={
        <PublicLayout>
          <ProfilePage />
        </PublicLayout>
      } />
      
      <Route path="/berita" element={
        <PublicLayout>
          <NewsPage />
        </PublicLayout>
      } />
      
      <Route path="/pemetaan" element={
        <PublicLayout>
          <MappingPage />
        </PublicLayout>
      } />

      <Route path='/pemetaan/pertanian' element={
        <PublicLayout>
          <AgriMappingPage />
        </PublicLayout>
      } />
      
      <Route path="/umkm" element={
        <PublicLayout>
          <UmkmPage />
        </PublicLayout>
      } />
      
      <Route path="/korong/:korongName" element={
        <PublicLayout>
          <KorongInfoPage />
        </PublicLayout>
      } />

      <Route path="/berita/:id" element={
        <PublicLayout>
          <NewsDetailPage />
          </PublicLayout>
} />
      
      <Route path="/admin/dashboard" element={
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      } />
      
      <Route path="/admin/berita" element={
        <AdminLayout>
          <AdminBerita />
        </AdminLayout>
      } />
      
      <Route path="/admin/umkm" element={
        <AdminLayout>
          <AdminUmkm />
        </AdminLayout>
      } />

      <Route path="/admin/informasi-nagari" element={
        <AdminLayout>
          <AdminInformasi />
        </AdminLayout>
      } />
      
      <Route path="*" element={
        <PublicLayout>
          <HomePage />
        </PublicLayout>
      } />
    </Routes>
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