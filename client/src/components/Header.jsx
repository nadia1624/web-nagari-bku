import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu,
  ChevronDown,
  Home
} from 'lucide-react';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pageConfig = {
    '/admin/dashboard': {
      title: 'Dashboard'
    },
    '/admin/profile-nagari': {
      title: 'Manajemen Profile Nagari',
    },
    '/admin/berita': {
    title: 'Manajemen Berita'
    },
    '/admin/umkm': {
      title: 'Manajemen UMKM'
    }
  };

  const currentPage = pageConfig[location.pathname] || {
    title: 'Admin Panel',
    subtitle: 'Sistem Informasi Nagari',
    breadcrumbs: ['Admin']
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 ">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div>
              <h1 className="text-xl font-semibold text-gray-800">{currentPage.title}</h1>
              <div className="flex items-center space-x-2 mt-1">
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">

            <div className="relative">
              <button
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  A
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800">Administrator</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;