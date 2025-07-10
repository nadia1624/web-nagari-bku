import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Users, Calendar, ShoppingBag, ArrowRight, Star, TrendingUp, Heart, Award, Sparkles, Eye, ChevronDown } from 'lucide-react';

// Mock Carousel Component for demonstration
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, bg: 'from-blue-600 to-purple-700', title: 'Pemandangan Alam' },
    { id: 2, bg: 'from-green-600 to-blue-600', title: 'Pertanian Modern' },
    { id: 3, bg: 'from-orange-500 to-red-600', title: 'Budaya Lokal' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
    </div>
  );
};

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  // Parallax and mouse tracking effects
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
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      id: 'location',
      icon: MapPin,
      title: 'Lokasi Strategis',
      description: 'Nagari Batu Kalang Utara terletak di wilayah strategis dengan pemandangan yang indah dan akses yang mudah.',
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      bgGradient: 'from-blue-50 to-purple-50',
      stats: '12 Dusun',
      trend: '+5%'
    },
    {
      id: 'population',
      icon: Users,
      title: 'Komunitas Berkembang',
      description: 'Jumlah penduduk yang terus berkembang dengan beragam profesi dan mata pencaharian yang produktif.',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      bgGradient: 'from-green-50 to-emerald-50',
      stats: '8,245 Jiwa',
      trend: '+8%'
    },
    {
      id: 'business',
      icon: ShoppingBag,
      title: 'UMKM Berkembang',
      description: 'Berbagai kegiatan kemasyarakatan dan program pembangunan yang dilaksanakan secara rutin.',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      bgGradient: 'from-orange-50 to-red-50',
      stats: '156 UMKM',
      trend: '+12%'
    }
  ];

  const quickStats = [
    { label: 'Total Penduduk', value: '8,245', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Jumlah Dusun', value: '12', icon: MapPin, color: 'from-green-500 to-emerald-500' },
    { label: 'UMKM Aktif', value: '156', icon: ShoppingBag, color: 'from-purple-500 to-pink-500' },
    { label: 'Program Aktif', value: '24', icon: Award, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Animated Background Elements */}
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

      {/* Hero Section */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Carousel />
        </div>

        {/* Interactive overlay with mouse tracking */}
        <div 
          className="absolute inset-0 z-10 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)`
          }}
        />

        {/* Floating particles */}
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
          {/* Enhanced Hero Content */}
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
            <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center space-x-2">
                <span>Jelajahi Nagari</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300 font-semibold transform hover:scale-105">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Lihat Profil</span>
              </div>
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/70" />
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
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

      {/* Main Features Section */}
      <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <Star className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-blue-800 font-semibold text-sm">Keunggulan Nagari</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Mengapa Memilih Nagari Kami?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover the unique advantages and opportunities that make our nagari special
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/50 overflow-hidden ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-gray-700" />
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{feature.stats}</div>
                    <div className="flex items-center text-green-600 text-sm font-semibold">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {feature.trend}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                <div className="flex items-center justify-between">
                  <button className="flex items-center text-gray-700 font-semibold hover:text-gray-900 transition-colors group/btn">
                    <span>Pelajari Lebih</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    <Heart className={`w-5 h-5 transition-colors ${hoveredCard === feature.id ? 'text-red-500' : 'text-gray-400'}`} />
                    <span className="text-sm text-gray-500">4.9</span>
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
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