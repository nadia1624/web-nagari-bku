import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, User, Newspaper, Map, ShoppingBag, ChevronDown, Sprout, Sparkles } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/', color: 'from-blue-500 to-purple-600'},
    { id: 'profile', label: 'Profile Desa', icon: User, path:'/profile', color: 'from-green-500 to-teal-600' },
    { id: 'berita', label: 'Berita', icon: Newspaper, path: '/berita', color: 'from-orange-500 to-red-600' },
    { id: 'umkm', label:'UMKM', icon: ShoppingBag, path:'/umkm', color: 'from-purple-500 to-pink-600' },
    { 
      id: 'pemetaan', 
      label: 'Pemetaan Wilayah', 
      icon: Map, 
      path: '/pemetaan',
      color: 'from-emerald-500 to-cyan-600',
      hasSubmenu: true,
      submenu: [
        { id: 'pemetaan-pertanian', label: 'Pemetaan Pertanian', icon: Sprout, path: '/pemetaan/pertanian', color: 'from-green-400 to-emerald-500' }
      ]
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isActiveRoute = (path) => {
    if (path === '/pemetaan') {
      return location.pathname === '/pemetaan' || location.pathname.startsWith('/pemetaan/');
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Glassmorphism overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-purple-900/10 to-blue-900/20 backdrop-blur-3xl"></div>
      </div>
      
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-red-900/95 via-red-800/95 to-red-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'bg-gradient-to-r from-red-900/90 via-red-800/90 to-red-900/90 backdrop-blur-lg'
      }`}>
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/10 rounded-full animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-white via-red-50 to-red-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <div className="w-7 h-7 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div className="group-hover:scale-105 transition-transform duration-300">
                <h1 className="text-sm font-bold bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                  WEBSITE NAGARI
                </h1>
                <p className="text-xs text-red-100/80 group-hover:text-red-100 transition-colors">
                  BATU KALANG UTARA
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2">
              {navItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="relative" 
                  ref={item.hasSubmenu ? dropdownRef : null}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.hasSubmenu ? (
                    <div>
                      <button
                        onClick={handleDropdownToggle}
                        className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          isActiveRoute(item.path)
                            ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                            : 'text-red-100 hover:bg-white/10 hover:text-white hover:shadow-lg'
                        }`}
                      >
                        <div className={`p-1 rounded-lg bg-gradient-to-r ${item.color} ${
                          isActiveRoute(item.path) ? 'shadow-lg' : ''
                        }`}>
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="relative">
                          {item.label}
                          {hoveredItem === item.id && (
                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
                          )}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Enhanced Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                          <div className="absolute -top-2 left-6 w-4 h-4 bg-white/95 backdrop-blur-xl transform rotate-45 border-l border-t border-white/20"></div>
                          
                          <Link
                            to={item.path}
                            onClick={() => setIsDropdownOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-xl text-sm transition-all duration-200 hover:scale-105 ${
                              location.pathname === item.path
                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                                : 'text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700'
                            }`}
                          >
                            <div className={`p-1 rounded-lg bg-gradient-to-r ${item.color}`}>
                              <item.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium">{item.label}</span>
                          </Link>
                          
                          <div className="my-2 mx-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                          
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.id}
                              to={subItem.path}
                              onClick={() => setIsDropdownOpen(false)}
                              className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-xl text-sm transition-all duration-200 hover:scale-105 ${
                                location.pathname === subItem.path
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-100 hover:text-green-700'
                              }`}
                            >
                              <div className={`p-1 rounded-lg bg-gradient-to-r ${subItem.color}`}>
                                <subItem.icon className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-medium">{subItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        isActiveRoute(item.path)
                          ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                          : 'text-red-100 hover:bg-white/10 hover:text-white hover:shadow-lg'
                      }`}
                    >
                      <div className={`p-1 rounded-lg bg-gradient-to-r ${item.color} ${
                        isActiveRoute(item.path) ? 'shadow-lg' : ''
                      }`}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="relative">
                        {item.label}
                        {hoveredItem === item.id && (
                          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
                        )}
                      </span>
                      {isActiveRoute(item.path) && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-2 text-white hover:text-gray-300 focus:outline-none transition-all duration-300 hover:scale-110"
              >
                <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 transform rotate-90 transition-transform duration-300" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 animate-in slide-in-from-top duration-300">
              <div className="space-y-2 bg-white/10 backdrop-blur-xl rounded-2xl p-4 mt-4 border border-white/20">
                {navItems.map((item, index) => (
                  <div key={item.id} className="animate-in slide-in-from-left duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                    {item.hasSubmenu ? (
                      <div>
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                            location.pathname === item.path
                              ? 'bg-white/20 text-white shadow-lg'
                              : 'text-red-100 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className={`p-1 rounded-lg bg-gradient-to-r ${item.color}`}>
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <span>{item.label}</span>
                        </Link>
                        
                        <div className="ml-6 mt-2 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.id}
                              to={subItem.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center space-x-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                                location.pathname === subItem.path
                                  ? 'bg-white/20 text-white shadow-lg'
                                  : 'text-red-100 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              <div className={`p-1 rounded-lg bg-gradient-to-r ${subItem.color}`}>
                                <subItem.icon className="w-3 h-3 text-white" />
                              </div>
                              <span>{subItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                          isActiveRoute(item.path)
                            ? 'bg-white/20 text-white shadow-lg'
                            : 'text-red-100 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className={`p-1 rounded-lg bg-gradient-to-r ${item.color}`}>
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;