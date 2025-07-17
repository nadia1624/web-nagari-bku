import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  ShoppingBag, 
  Users, 
  LogOut,
  Menu,
  X,
  Bell,
} from 'lucide-react';
import BeritaManagement from '../components/BeritaManagement';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    };
    checkAuth();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path:'/dashboard'},
    { id: 'berita', label: 'Berita', icon: Newspaper, path:'/berita' },
    { id: 'umkm', label: 'UMKM', icon: ShoppingBag, path:'/umkm' }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'berita':
        return <BeritaManagement />;
      case 'umkm':
        return (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manajemen UMKM</h2>
            <p className="text-gray-600">Fitur UMKM akan segera hadir...</p>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Newspaper className="w-10 h-10 opacity-80" />
                <span className="text-3xl font-bold">24</span>
              </div>
              <h3 className="text-lg font-semibold">Total Berita</h3>
              <p className="text-sm opacity-80">+3 minggu ini</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <ShoppingBag className="w-10 h-10 opacity-80" />
                <span className="text-3xl font-bold">156</span>
              </div>
              <h3 className="text-lg font-semibold">Total UMKM</h3>
              <p className="text-sm opacity-80">+12 bulan ini</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${
        isSidebarOpen ? 'w-64' : 'w-0'
      } bg-gradient-to-b from-red-800 to-red-900 text-white transition-all duration-300 overflow-hidden ${
        isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    if (isMobile) setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeMenu === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 mt-8 text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-600 hover:text-gray-800"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {menuItems.find(item => item.id === activeMenu)?.label || 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">          
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-800">Admin</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header> 

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;