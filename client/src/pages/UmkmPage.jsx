import React, { useState, useEffect, useRef } from 'react';
import UmkmCard from '../components/UmkmCard';
import { ShoppingBag, User, MapPin, FileText, Search, Filter, TrendingUp, Star, Heart, ArrowRight, Sparkles, Building2, Phone } from 'lucide-react';


const UmkmPage = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observers = new Map();
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'
    };

    const sectionKeys = ['header', 'search', 'stats', 'grid'];
    
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

  const umkmData = [
    {
      id: 1,
      nama_usaha: "Warung Rendang Ibu Sari",
      nama_pemilik: "Ibu Sari Wahyuni",
      alamat: "Jl. Raya Nagari No. 15, Korong A",
      deskripsi: "Warung yang menyajikan rendang khas Minang dengan resep turun temurun. Menggunakan daging sapi pilihan dan santan kelapa segar dari kebun sendiri.",
      produk: "Rendang, Gulai, Dendeng",
      kategori: "Kuliner",
      kontak: "081234567890"
    },
    {
      id: 2,
      nama_usaha: "Kerajinan Anyaman Bambu Pak Budi",
      nama_pemilik: "Budi Santoso",
      alamat: "Korong B, RT 02/RW 01",
      deskripsi: "Usaha kerajinan anyaman bambu yang menghasilkan berbagai produk seperti tas, topi, dan hiasan rumah dengan kualitas ekspor.",
      produk: "Tas Anyaman, Topi, Hiasan Dinding",
      kategori: "Kerajinan",
      kontak: "082345678901"
    },
    {
      id: 3,
      nama_usaha: "Toko Kelontong Berkah",
      nama_pemilik: "Andi Rahman",
      alamat: "Jl. Masjid Korong C No. 8",
      deskripsi: "Toko kelontong yang melayani kebutuhan sehari-hari masyarakat dengan harga terjangkau dan pelayanan ramah.",
      produk: "Sembako, Minuman, Makanan Ringan",
      kategori: "Retail",
      kontak: "083456789012"
    },
    {
      id: 4,
      nama_usaha: "Bengkel Motor Jaya",
      nama_pemilik: "Yudi Pratama",
      alamat: "Jl. Utama Korong D No. 25",
      deskripsi: "Bengkel motor yang menyediakan jasa service, perbaikan, dan penjualan sparepart motor dengan teknisi berpengalaman.",
      produk: "Service Motor, Sparepart, Oli",
      kategori: "Otomotif",
      kontak: "084567890123"
    },
    {
      id: 5,
      nama_usaha: "Kue Tradisional Nenek Mina",
      nama_pemilik: "Minarti",
      alamat: "Korong A, Dekat Balai Nagari",
      deskripsi: "Produsen kue tradisional khas Minang seperti lamang, lemper, dan kue basah lainnya untuk berbagai acara.",
      produk: "Lamang, Lemper, Kue Basah",
      kategori: "Kuliner",
      kontak: "085678901234"
    },
    {
      id: 6,
      nama_usaha: "Konveksi Busana Muslim Sari",
      nama_pemilik: "Sari Dewi",
      alamat: "Jl. Pendidikan Korong B No. 12",
      deskripsi: "Konveksi yang memproduksi busana muslim berkualitas dengan desain modern dan harga terjangkau untuk semua kalangan.",
      produk: "Baju Muslim, Hijab, Gamis",
      kategori: "Fashion",
      kontak: "086789012345"
    }
  ];

  const filteredUmkm = umkmData.filter(umkm => {
    const matchesSearch = umkm.nama_usaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         umkm.nama_pemilik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         umkm.produk.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || umkm.kategori.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-100/40 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-red-900/5"></div>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        
        <div 
          ref={el => sectionRefs.current.header = el}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 mb-8"
        >
          <div 
            className="relative bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white p-8 overflow-hidden"
          >
            <div 
              className="absolute inset-0 opacity-20 transition-all duration-300"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.3) 0%, transparent 50%)`
              }}
            />
            
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-20 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 left-20 w-24 h-24 border-2 border-white transform rotate-45"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/20 rounded-lg transform rotate-12"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-yellow-300 mr-2 animate-pulse" />
                <span className="text-white/90 text-sm font-medium">Direktori UMKM Nagari</span>
              </div>
              
              <div className={`flex items-center mb-2 transform transition-all duration-1000 ${
                visibleSections.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <ShoppingBag className="w-8 h-8 mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold">UMKM Nagari</h1>
              </div>
              <p className={`text-red-100 text-lg transform transition-all duration-1000 delay-200 ${
                visibleSections.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                Temukan dan dukung usaha mikro kecil menengah di Nagari Batu Kalang Utara
              </p>
            </div>
          </div>
        </div>

        <div 
          ref={el => sectionRefs.current.search = el}
          className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-lg border border-white/50 transform transition-all duration-1000 delay-200 ${
            visibleSections.search ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-10 opacity-0 blur-sm'
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari UMKM, pemilik, atau produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div 
          ref={el => sectionRefs.current.grid = el}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transform transition-all duration-1000 delay-400 ${
            visibleSections.grid ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-10 opacity-0 blur-sm'
          }`}
        >
          {filteredUmkm.map((umkm, index) => (
            <UmkmCard key={umkm.id} umkm={umkm} index={index} />
          ))}
        </div>

        {filteredUmkm.length === 0 && (
          <div className={`text-center py-12 transform transition-all duration-1000 ${
            visibleSections.grid ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-10 opacity-0 blur-sm'
          }`}>
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada UMKM ditemukan</h3>
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

export default UmkmPage;