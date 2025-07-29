import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Share2, Bookmark, Clock, User, Eye } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/axios';

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setLoading(!entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '20px 0px -20px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        
        const response = await api.get(`/api/berita/${id}`);
        const berita = response.data;
        
        const formattedBerita = {
          id: berita.id_berita,
          title: berita.judul,
          content: berita.isi_berita,
          date: new Date(berita.createdAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          time: new Date(berita.createdAt).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          image: berita.gambar || null,
          views: berita.views || 0
        };

        setNewsData(formattedBerita);

        const relatedResponse = await api.get('/api/berita', {
          params: {
            kategori: berita.kategori,
            limit: 4,
            exclude: id
          }
        });

        const formattedRelated = relatedResponse.data
          .filter(item => item.id_berita !== parseInt(id))
          .slice(0, 3)
          .map(item => ({
            id: item.id_berita,
            title: item.judul,
            date: new Date(item.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            image: item.gambar || null,
            category: item.kategori || 'umum'
          }));

        setRelatedNews(formattedRelated);
        
      } catch (error) {
        console.error("Error fetching news detail:", error);
        setError("Gagal memuat detail berita");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }

    return () => observer.disconnect();
  }, [id]);

  const handleBack = () => {
    navigate('/berita');
  };

  const handleRelatedNewsClick = (newsId) => {
    navigate(`/berita/${newsId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="animate-pulse mb-6">
            <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="animate-pulse">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-6 mb-6">
              <div className="flex space-x-4 mb-4">
                <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
                <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
                <div className="w-1/6 h-6 bg-gray-200 rounded"></div>
              </div>
              <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
              <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !newsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button 
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Kembali ke Berita</span>
          </button>

          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-red-500 text-2xl">⚠️</div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Berita Tidak Ditemukan</h3>
            <p className="text-gray-600 mb-4">{error || "Berita yang Anda cari tidak tersedia"}</p>
            <button 
              onClick={handleBack}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Kembali ke Daftar Berita
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={cardRef}
      className={`min-h-screen bg-gradient-to-br from-gray-100 to-white ${
        loading ? 'translate-y-20 opacity-0 blur-md' : 'translate-y-0 opacity-100 blur-0'
      } transition-all duration-700`}
    >
      <div className="max-w-4xl mx-auto px-4 py-6">
        <button 
          onClick={handleBack}
          className="inline-flex items-center px-4 py-2 mb-6 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all duration-300 group backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Kembali ke Berita</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 border border-white/50 overflow-hidden relative p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 hover:opacity-5 transition-opacity duration-500"></div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 mr-2" />
                  <span>{newsData.date} • {newsData.time}</span>
                </div>
                {newsData.views > 0 && (
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 text-gray-500 mr-2" />
                    <span>{newsData.views.toLocaleString()} views</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 hover:text-gray-900 transition-colors leading-tight mb-6">
            {newsData.title}
          </h1>

          {newsData.image && (
            <div className="w-full h-96 md:h-80 bg-gray-200 rounded-lg mb-6 overflow-hidden">
              <img 
                src={`http://localhost:5000/uploads/${newsData.image}`}
                alt={newsData.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="prose prose-gray max-w-none mb-6">
            {newsData.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="text-gray-700 leading-relaxed mb-4 text-justify text-base md:text-lg">
                  {paragraph.trim()}
                </p>
              )
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Dipublikasikan {newsData.date}
            </div>
          </div>
        </div>

        {relatedNews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Berita Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedNews.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleRelatedNewsClick(item.id)}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 border border-white/50 overflow-hidden relative cursor-pointer group"
                >
                  {item.image && (
                    <div className="w-full h-32 bg-gray-200 overflow-hidden">
                      <img 
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-600">{item.date}</span>
                    </div>
                    <h3 className="font-medium text-gray-800 line-clamp-2 hover:text-gray-900 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button 
            onClick={handleBack}
            className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-xl text-gray-700 hover:text-gray-900 hover:bg-white/90 rounded-full transition-all duration-300 group shadow-lg border border-white/50"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Kembali ke Halaman Berita</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;