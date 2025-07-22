import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Building2, ArrowLeft, Sparkles } from 'lucide-react';

const KorongInfoPage = () => {
  const { korongName } = useParams();

  const formatKorongName = (name) => {
    return name.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const displayKorongName = formatKorongName(korongName);

  const korongDetails = {
    "korong-a": {
      nama: "Korong A",
      deskripsi: "Korong A adalah salah satu dari empat korong utama di Nagari Batu Kalang Utara. Dikenal dengan lahan pertaniannya yang subur dan kerukunan warganya.",
      penduduk: "± 1.500 jiwa",
      fasilitas: ["Masjid", "Sekolah Dasar", "Puskesmas Pembantu"]
    },
    "korong-b": {
      nama: "Korong B",
      deskripsi: "Korong B memiliki keindahan alam yang menawan dengan sungai yang mengalir deras, cocok untuk pengembangan wisata alam. Mayoritas penduduknya bekerja sebagai petani dan pekebun.",
      penduduk: "± 1.200 jiwa",
      fasilitas: ["Mushola", "Balai Pertemuan", "Kebun Kopi"]
    },
    "korong-c": {
      nama: "Korong C",
      deskripsi: "Korong C adalah pusat kegiatan masyarakat, dengan pasar tradisional dan berbagai usaha kecil menengah. Masyarakatnya sangat aktif dalam kegiatan kebudayaan.",
      penduduk: "± 2.000 jiwa",
      fasilitas: ["Pasar Nagari", "Kantor Korong", "Posyandu"]
    },
    "korong-d": {
      nama: "Korong D",
      deskripsi: "Korong D berbatasan langsung dengan hutan lindung, menjadikannya strategis untuk konservasi lingkungan. Warganya menjaga erat adat dan tradisi leluhur.",
      penduduk: "± 800 jiwa",
      fasilitas: ["Air Terjun", "Makam Keramat", "Kelompok Tani"]
    },
  };

  const currentKorong = korongDetails[korongName] || {
    nama: displayKorongName,
    deskripsi: "Informasi untuk korong ini belum tersedia.",
    penduduk: "-",
    fasilitas: []
  };

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          
          <div className="relative bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-20 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 left-20 w-24 h-24 border-2 border-white transform rotate-45"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/20 rounded-lg transform rotate-12"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-yellow-300 mr-2 animate-pulse" />
                <span className="text-white/90 text-sm font-medium">Informasi Korong</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Informasi {currentKorong.nama}
              </h1>
              <p className="text-red-100 text-lg">
                Detail lebih lanjut mengenai {currentKorong.nama} di Nagari Batu Kalang Utara
              </p>
            </div>
          </div>

          <div className="p-8">
            <section className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Deskripsi</h2>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {currentKorong.deskripsi}
                </p>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Demografi</h2>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center">
                  <span className="text-gray-700 text-lg">Jumlah Penduduk:</span>
                  <span className="ml-3 text-2xl font-bold text-green-700">{currentKorong.penduduk}</span>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Fasilitas Umum</h2>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                {currentKorong.fasilitas.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentKorong.fasilitas.map((item, index) => (
                      <div key={index} className="bg-white/80 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-purple-100">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                          <span className="text-gray-700 font-medium">{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">Belum ada data fasilitas yang tersedia.</p>
                )}
              </div>
            </section>

            <div className="flex justify-center pt-6">
              <Link 
                to="/pemetaan" 
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                Kembali ke Peta
              </Link>
            </div>
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

export default KorongInfoPage;