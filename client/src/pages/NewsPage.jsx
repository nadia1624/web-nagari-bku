import React from 'react';
import NewsCard from '../components/NewsCard';

const NewsPage = () => {
  const newsData = [
    {
      id: 1,
      title: "Pembangunan Infrastruktur Jalan Nagari",
      content: "Pemerintah nagari melaksanakan pembangunan infrastruktur jalan untuk meningkatkan akses transportasi warga. Proyek ini diharapkan dapat mendukung perekonomian masyarakat...",
      date: "15 Desember 2024",
      image: null
    },
    {
      id: 2,
      title: "Musyawarah Nagari Tahun 2024",
      content: "Musyawarah nagari telah dilaksanakan dengan partisipasi aktif dari seluruh elemen masyarakat. Berbagai program pembangunan telah dibahas dan disepakati...",
      date: "10 Desember 2024",
      image: null
    },
    {
      id: 3,
      title: "Program Bantuan Sosial",
      content: "Penyaluran bantuan sosial kepada masyarakat yang membutuhkan telah dilaksanakan dengan transparan dan akuntabel. Program ini mencakup bantuan sembako dan biaya pendidikan...",
      date: "5 Desember 2024",
      image: null
    },
    {
      id: 4,
      title: "Pelatihan Keterampilan Masyarakat",
      content: "Diadakan pelatihan keterampilan untuk meningkatkan kemampuan masyarakat dalam berbagai bidang seperti pertanian, kerajinan, dan teknologi informasi...",
      date: "1 Desember 2024",
      image: null
    },
    {
      id: 5,
      title: "Festival Budaya Nagari",
      content: "Festival budaya tahunan nagari telah diselenggarakan dengan meriah. Berbagai pertunjukan seni dan budaya lokal ditampilkan untuk melestarikan tradisi...",
      date: "28 November 2024",
      image: null
    },
    {
      id: 6,
      title: "Gotong Royong Pembersihan Lingkungan",
      content: "Kegiatan gotong royong pembersihan lingkungan dilakukan secara serentak di seluruh wilayah nagari. Partisipasi masyarakat sangat antusias dalam menjaga kebersihan...",
      date: "25 November 2024",
      image: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Berita Terkini</h1>
          <p className="text-gray-600">Informasi terbaru dari Nagari Batu Kalang Utara</p>
          <div className="w-24 h-1 bg-red-800 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;