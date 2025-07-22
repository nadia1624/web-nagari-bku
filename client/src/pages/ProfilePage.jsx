import React, { useState, useEffect, useRef } from 'react';
import { Eye, Target, Users, Award, MapPin, Calendar, TrendingUp, Star, Heart, Camera, Download, Share2, ChevronRight, Sparkles, Mountain, Building2, Leaf } from 'lucide-react';

const ProfilePage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = new Map();
    
    Object.entries(sectionRefs.current).forEach(([key, ref]) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsVisible(prev => ({
              ...prev,
              [key]: entry.isIntersecting
            }));
          },
          { threshold: 0.3 }
        );
        observer.observe(ref);
        observers.set(key, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

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
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          <div 
            className="relative bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white p-8 overflow-hidden"
            ref={el => sectionRefs.current.header = el}
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
                <span className="text-white/90 text-sm font-medium">Profile Resmi Nagari</span>
              </div>
              
              <h1 className={`text-4xl md:text-5xl font-bold mb-2 transform transition-all duration-1000 ${
                isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                Profile Nagari Batu Kalang Utara
              </h1>
              <p className={`text-red-100 text-lg transform transition-all duration-1000 delay-200 ${
                isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                Mengenal lebih dekat dengan nagari yang kaya akan potensi dan budaya
              </p>
            </div>
          </div>

          <div className="p-8">
            
            <section 
              className="mb-12"
              ref={el => sectionRefs.current.introduction = el}
            >
              <h2 className={`text-3xl font-bold text-gray-800 mb-6 flex items-center transform transition-all duration-700 ${
                isVisible.introduction ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <Eye className="w-8 h-8 text-red-600 mr-3" />
                Pengenalan Singkat
              </h2>
              
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transform transition-all duration-700 delay-200 ${
                isVisible.introduction ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                        <Leaf className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">Tentang Nagari</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Nagari Batu Kalang Utara adalah sebuah nagari yang terletak di wilayah strategis
                      dengan potensi alam yang melimpah. Nagari ini memiliki sejarah panjang dalam
                      pembangunan masyarakat dan terus berkembang hingga saat ini.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Dengan jumlah penduduk yang terus bertambah dan berbagai potensi yang dimiliki,
                      Nagari Batu Kalang Utara berkomitmen untuk terus memberikan pelayanan terbaik
                      kepada masyarakat dan mengembangkan potensi yang ada.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 text-center hover:scale-105 transition-transform duration-300">
                      <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">1987</div>
                      <div className="text-sm text-gray-600">Tahun Pembentukan</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 text-center hover:scale-105 transition-transform duration-300">
                      <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">A</div>
                      <div className="text-sm text-gray-600">Akreditasi Nagari</div>
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-full flex flex-col items-center justify-center border border-gray-300 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="w-40 h-40 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                      <Mountain className="w-20 h-20 text-white" />
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </div>
                    <p className="text-gray-600 font-medium text-center">Foto Nagari</p>
                    <p className="text-gray-500 text-sm text-center mt-1">Gambar Nagari Batu Kalang Utara</p>
                    
                    <button className="absolute top-4 right-4 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group/btn">
                      <Camera className="w-4 h-4 text-yellow-800 group-hover/btn:animate-pulse" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section 
              className="mb-12"
              ref={el => sectionRefs.current.vision = el}
            >
              <h2 className={`text-3xl font-bold text-gray-800 mb-6 flex items-center transform transition-all duration-700 ${
                isVisible.vision ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <Target className="w-8 h-8 text-red-600 mr-3" />
                Visi dan Misi
              </h2>
              
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transform transition-all duration-700 delay-200 ${
                isVisible.vision ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-200 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-blue-800">Visi</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg italic">
                      "Terwujudnya Nagari Batu Kalang Utara Sebagai Nagari yang Mandiri, Maju dan Berprestasi
                      Untuk Kesejahteraan Masyarakat. "
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-800">Misi</h3>
                    </div>
                    <ul className="space-y-3 text-s">
                      {[
                        'Mewujudkan Penyelenggaraan Pemerintahan yang Baik, Bersih dan Transparan',
                        'Mewujudkan Sistem Perekonomian Berbasis Ekonomi Kerakyatan serta Penguatan Lembaga Ekonomi Nagari',
                        'Peningktan Pembangunan Infrastruktur Saranan dan Prasarana Fasilitas Umum Nagari',
                        'Peningkatan Kualitas Sumber Daya Manusia serta Pemahaman dan Pengamalan Norma - Norma Agama dan Adat Istiadat',
                        'Peningkatan Derajat dan Kualitas Kesehatan Masyarakat serta Pemetaan Lingkungan yang Bersih dan Sehat',
                        'Peningkatan Peran serta Masyarakat Terutama Perantau Untuk Kemajuan Pembangunan Nagari'
                      ].map((mission, index) => (
                        <li key={index} className="flex items-start text-gray-700 group/item hover:text-green-700 transition-colors">
                          <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200">
                            <ChevronRight className="w-3 h-3 text-white" />
                          </div>
                          <span className="leading-relaxed">{mission}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section 
              ref={el => sectionRefs.current.organization = el}
            >
              <h2 className={`text-3xl font-bold text-gray-800 mb-6 flex items-center transform transition-all duration-700 ${
                isVisible.organization ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <Users className="w-8 h-8 text-red-600 mr-3" />
                Struktur Organisasi
              </h2>
              
              <div className={`bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 rounded-2xl border border-gray-200 transform transition-all duration-700 delay-200 ${
                isVisible.organization ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <div
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50 group text-center"
                    onMouseEnter={() => setHoveredCard('wali-nagari')}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative mb-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                        <span className="text-white text-lg font-bold relative z-10">WN</span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-1">Wali Nagari</h4>
                    <p className="text-red-600 font-semibold mb-2">Nama Wali Nagari</p>
                  </div>

                  <div
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50 group text-center"
                    onMouseEnter={() => setHoveredCard('sekretaris')}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative mb-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                        <span className="text-white text-lg font-bold relative z-10">SW</span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-1">Sekretaris</h4>
                    <p className="text-blue-600 font-semibold mb-2">Nama Sekretaris</p>
                  </div>

                  <div
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50 group text-center"
                    onMouseEnter={() => setHoveredCard('kaur-keuangan')}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative mb-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                        <span className="text-white text-lg font-bold relative z-10">KK</span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-1">Kaur Keuangan</h4>
                    <p className="text-green-600 font-semibold mb-2">Nama Kaur Keuangan</p>
                  </div>

                </div>
              </div>
            </section>

          </div>
        </div>
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
      `}</style>
    </div>
  );
};

export default ProfilePage;