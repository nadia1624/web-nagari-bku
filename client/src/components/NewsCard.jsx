import React, { useState, useEffect, useRef  } from 'react';
import { Calendar, Newspaper, ArrowRight} from 'lucide-react';

const NewsCard = ({ news, index }) => {
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
        <div className={`w-full h-full bg-gradient-to-br ${getRandomGradient()} flex items-center justify-center relative`}>
          <Newspaper className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-300" /> 
        </div>
      </div>

      <div className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {news.date}
          </div>
          <div className="flex items-center space-x-3 text-gray-500 text-sm">
            
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors leading-tight line-clamp-2">
          {news.title}
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors">
          {news.content}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
          </div>

          <button className="group/btn flex items-center text-gray-700 font-semibold hover:text-gray-900 transition-colors">
            <span className="text-sm">Baca Selengkapnya</span>
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default NewsCard;