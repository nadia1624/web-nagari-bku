import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  ShoppingBag, 
  LogOut,
  X,
  User
} from 'lucide-react';

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'profile-nagari', label: 'Profile Nagari', icon: User, path: '/admin/profile-nagari'},
    { id: 'berita', label: 'Berita', icon: Newspaper, path: '/admin/berita' },
    { id: 'umkm', label: 'UMKM', icon: ShoppingBag, path: '/admin/umkm' }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <>
<div className={`${
  isMobile 
        ? `fixed top-0 left-0 bottom-0 z-50 transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`
        : `sticky h-[100vh] ${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300`
    } bg-gradient-to-b from-red-800 to-red-900 text-white ${
      isMobile ? 'w-64' : ''
    } overflow-hidden`}>
        
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 text-white hover:text-gray-300 hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <p className="text-red-200 text-sm">Website Nagari</p>
          </div>
          
          <div className="flex-1 px-6 py-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                        : 'text-white/80 hover:bg-white/10 hover:text-white hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="flex-shrink-0 p-6 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-white/80 hover:bg-red-700 hover:text-white rounded-xl transition-all duration-200 hover:shadow-md"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;