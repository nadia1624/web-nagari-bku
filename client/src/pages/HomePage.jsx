import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Calendar, ShoppingBag, ArrowRight, Star, TrendingUp, Heart, Award, Sparkles, Eye, ChevronDown } from 'lucide-react';
import Carousel from '../components/Carousel';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleScroll = () => {
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const quickStats = [
    { label: 'Total Penduduk', value: '8,245', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Jumlah Dusun', value: '12', icon: MapPin, color: 'from-green-500 to-emerald-500' },
    { label: 'UMKM Aktif', value: '156', icon: ShoppingBag, color: 'from-purple-500 to-pink-500' },
    { label: 'Program Aktif', value: '24', icon: Award, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Carousel />
        </div>

        <div 
          className="absolute inset-0 z-10 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)`
          }}
        />

        <div className="absolute inset-0 z-15">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            <div className="mb-6 inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-300 mr-2 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Website Resmi Nagari</span>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-4 leading-tight">
              SELAMAT DATANG
            </h1>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              NAGARI BATU KALANG UTARA
            </h2>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-900">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-1100 flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate('/profile')} className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center space-x-2">
                <span>Jelajahi Nagari</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/70" />
          </div>
        </div>
      </div>

      <div className="relative -mt-20 z-30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-5deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;