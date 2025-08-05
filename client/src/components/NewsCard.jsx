import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ArrowRight, ShoppingBag } from 'lucide-react';
import imgUrl from '../lib/imageUrl';

const NewsCard = ({ news, index, onNewsClick }) => {
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

  const handleReadMore = (e) => {
    e.preventDefault();
    if (onNewsClick) {
      onNewsClick(news.id);
    } else {
      window.location.href = `/berita/${news.id}`;
    }
  };

  const handleCardClick = () => {
    if (onNewsClick) {
      onNewsClick(news.id);
    } else {
      window.location.href = `/berita/${news.id}`;
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`group bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 border border-white/50 overflow-hidden relative cursor-pointer ${
        isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-20 opacity-0 blur-md'
      }`}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        filter: isVisible ? 'none' : 'blur(8px)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${getRandomGradient()} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      <div className="relative h-48 overflow-hidden">
        {news.image ? (
          <img
            src={`${imgUrl}/${news.image}`}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        <div 
          className={`w-full h-full bg-gray-200 flex items-center justify-center ${news.image ? 'hidden' : 'flex'}`}
        >
          <ShoppingBag className="w-12 h-12 text-gray-500" />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {news.date}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors leading-tight line-clamp-2">
          {news.title}
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors">
          {news.content}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button 
            onClick={handleReadMore}
            className="group/btn flex items-center text-gray-700 font-semibold hover:text-gray-900 transition-colors"
          >
            <span className="text-sm">Baca Selengkapnya</span>
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default NewsCard;