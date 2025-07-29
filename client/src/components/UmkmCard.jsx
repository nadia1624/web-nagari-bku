import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, User, MapPin, FileText, Search, Filter, TrendingUp, Star, Heart, ArrowRight, Sparkles, Building2, Phone } from 'lucide-react';

const UmkmCard = ({ umkm, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null); 

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
      <div className={`absolute inset-0 bg-gradient-to-br ${getRandomGradient()} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      <div className="relative h-48 overflow-hidden">
        {umkm.gambar ? (
          <img
            src={`http://localhost:5000/uploads/${umkm.gambar}`}
            alt={umkm.nama_usaha}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-500" />
          </div>
        )}

        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor()}`}>
            {umkm.kategori || 'UMKM'}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>


      <div className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors leading-tight flex-1">
            {umkm.nama_usaha}
          </h3>
        </div>

        <div className="flex items-center mb-3">
          <User className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-gray-600 text-sm font-medium">{umkm.nama_pemilik}</span>
        </div>

        <div className="flex items-start mb-4">
          <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-gray-600 text-sm leading-relaxed">{umkm.alamat}</span>
        </div>

        <div className="flex items-start mb-4">
          <FileText className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors">
            {umkm.deskripsi}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {umkm.produk && umkm.produk.split(',').slice(0, 3).map((product, i) => (
            <span 
              key={i}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
            >
              {product.trim()}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {umkm.kontak && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-xs text-blue-600">{umkm.kontak}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default UmkmCard;