import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { 
      id: 1, 
      image: '/images/gambar1.jpg', 
      title: 'Agrowisata' 
    },
    { 
      id: 2, 
      image: '/images/gambar2.jpg', 
      title: 'Kantor Walinagari' 
    },
    { 
      id: 3, 
      image: '/images/gambar3.jpg', 
      title: 'Pemandangan' 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-full overflow-hidden  shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
    </div>
  );
};

export default Carousel;