import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Eye, Heart, Share2, Filter, Search, TrendingUp, Newspaper, Tag, ArrowRight, Star, Sparkles } from 'lucide-react';

// Enhanced NewsCard Component
const NewsCard = ({ news, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 500) + 50);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 5);
  const cardRef = useRef(null);

  // Individual card intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '20px 0px -20px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getRandomGradient = () => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-blue-500'
    ];
    return gradients[index % gradients.length];
  };

  const getBadgeColor = () => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800',
      'bg-green-100 text-green-800',
      'bg-orange-100 text-orange-800',
      'bg-indigo-100 text-indigo-800',
      'bg-teal-100 text-teal-800'
    ];
    return colors[index % colors.length];
  };

  return (
    <div 
      ref={cardRef}
      className={`group bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 border border-white/50 overflow-hidden relative ${
        isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-20 opacity-0 blur-md'
      }`}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        filter: isVisible ? 'none' : 'blur(8px)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getRandomGradient()} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Header Image/Placeholder */}
      <div className="relative h-48 overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${getRandomGradient()} flex items-center justify-center relative`}>
          <Newspaper className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-300" />
          
          {/* Floating elements */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor()}`}>
              Breaking News
            </span>
          </div>
          
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex space-x-2">
              <button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <Share2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      <div className="p-6 relative">
        {/* Date and Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {news.date}
          </div>
          <div className="flex items-center space-x-3 text-gray-500 text-sm">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {views}
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              <span className="text-green-500">+12%</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors leading-tight line-clamp-2">
          {news.title}
        </h3>

        {/* Content Preview */}
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors">
          {news.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium flex items-center">
            <Tag className="w-3 h-3 mr-1" />
            Pembangunan
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
            Infrastruktur
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
          </div>

          <button className="group/btn flex items-center text-gray-700 font-semibold hover:text-gray-900 transition-colors">
            <span className="text-sm">Baca Selengkapnya</span>
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Hover effect shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
    </div>
  );
};

const NewsPage = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const sectionRefs = useRef({});

  const newsData = [
    {
      id: 1,
      title: "Pembangunan Infrastruktur Jalan Nagari",
      content: "Pemerintah nagari melaksanakan pembangunan infrastruktur jalan untuk meningkatkan akses transportasi warga. Proyek ini diharapkan dapat mendukung perekonomian masyarakat...",
      date: "15 Desember 2024",
      image: null,
      category: "infrastruktur"
    },
    {
      id: 2,
      title: "Musyawarah Nagari Tahun 2024",
      content: "Musyawarah nagari telah dilaksanakan dengan partisipasi aktif dari seluruh elemen masyarakat. Berbagai program pembangunan telah dibahas dan disepakati...",
      date: "10 Desember 2024",
      image: null,
      category: "pemerintahan"
    },
    {
      id: 3,
      title: "Program Bantuan Sosial",
      content: "Penyaluran bantuan sosial kepada masyarakat yang membutuhkan telah dilaksanakan dengan transparan dan akuntabel. Program ini mencakup bantuan sembako dan biaya pendidikan...",
      date: "5 Desember 2024",
      image: null,
      category: "sosial"
    },
    {
      id: 4,
      title: "Pelatihan Keterampilan Masyarakat",
      content: "Diadakan pelatihan keterampilan untuk meningkatkan kemampuan masyarakat dalam berbagai bidang seperti pertanian, kerajinan, dan teknologi informasi...",
      date: "1 Desember 2024",
      image: null,
      category: "pendidikan"
    },
    {
      id: 5,
      title: "Festival Budaya Nagari",
      content: "Festival budaya tahunan nagari telah diselenggarakan dengan meriah. Berbagai pertunjukan seni dan budaya lokal ditampilkan untuk melestarikan tradisi...",
      date: "28 November 2024",
      image: null,
      category: "budaya"
    },
    {
      id: 6,
      title: "Gotong Royong Pembersihan Lingkungan",
      content: "Kegiatan gotong royong pembersihan lingkungan dilakukan secara serentak di seluruh wilayah nagari. Partisipasi masyarakat sangat antusias dalam menjaga kebersihan...",
      date: "25 November 2024",
      image: null,
      category: "lingkungan"
    }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observers = new Map();
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px' // Trigger animation earlier and keep it longer
    };

    // Create observers for each section
    const sectionKeys = ['header', 'search', 'grid'];
    
    sectionKeys.forEach(key => {
      if (sectionRefs.current[key]) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setVisibleSections(prev => ({
              ...prev,
              [key]: entry.isIntersecting
            }));
          },
          observerOptions
        );
        observer.observe(sectionRefs.current[key]);
        observers.set(key, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || news.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-100/40 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-red-900/5"></div>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        
        {/* Enhanced Header */}
        <div 
          ref={el => sectionRefs.current.header = el}
          className={`text-center mb-12 transform transition-all duration-1000 ${
            visibleSections.header ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-10 opacity-0 blur-sm'
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <Newspaper className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-blue-800 font-semibold text-sm">Portal Berita Nagari</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 mb-4">
            Berita Terkini
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            Informasi terbaru dan terpercaya dari Nagari Batu Kalang Utara
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto rounded-full shadow-lg"></div>
        </div>

        {/* Search and Filter Section */}
        <div 
          ref={el => sectionRefs.current.search = el}
          className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-lg border border-white/50 transform transition-all duration-1000 delay-200 ${
            visibleSections.search ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-10 opacity-0 blur-sm'
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div 
          ref={el => sectionRefs.current.grid = el}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transform transition-all duration-1000 delay-400 ${
            visibleSections.grid ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-10 opacity-0 blur-sm'
          }`}
        >
          {filteredNews.map((news, index) => (
            <NewsCard key={news.id} news={news} index={index} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredNews.length === 0 && (
          <div className={`text-center py-12 transform transition-all duration-1000 ${
            visibleSections.grid ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-10 opacity-0 blur-sm'
          }`}>
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada berita ditemukan</h3>
            <p className="text-gray-600">Coba ubah kata kunci pencarian atau filter yang dipilih</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-5deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Enhanced blur transitions */
        .blur-0 {
          filter: blur(0px);
        }
        .blur-sm {
          filter: blur(4px);
        }
        .blur-md {
          filter: blur(8px);
        }
        
        /* Smooth transitions for all states */
        * {
          transition: filter 0.7s ease-in-out, transform 0.7s ease-out, opacity 0.7s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NewsPage;