import React from 'react';

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {news.image ? (
          <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500">Gambar Berita</span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{news.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{news.content}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{news.date}</span>
          <button className="text-red-800 hover:text-red-600 font-medium">
            Baca Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;