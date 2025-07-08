import React from 'react';
import { MapPin, Users, Calendar } from 'lucide-react';
import Carousel from '../components/Carousel';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="relative h-[500px] overflow-hidden">
        {/* Carousel as background */}
        <div className="absolute inset-0 z-0">
          <Carousel />
        </div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

        {/* Welcome Text */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            SELAMAT DATANG DI WEBSITE RESMI
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            NAGARI BATU KALANG UTARA
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <button className="bg-red-700 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold">
            Explore →
          </button>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <MapPin className="w-8 h-8 text-red-800 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Lokasi</h3>
            </div>
            <p className="text-gray-600">
              Nagari Batu Kalang Utara terletak di wilayah strategis dengan pemandangan yang indah
              dan akses yang mudah.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-red-800 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Penduduk</h3>
            </div>
            <p className="text-gray-600">
              Jumlah penduduk yang terus berkembang dengan beragam profesi dan mata pencaharian
              yang produktif.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Calendar className="w-8 h-8 text-red-800 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Kegiatan</h3>
            </div>
            <p className="text-gray-600">
              Berbagai kegiatan kemasyarakatan dan program pembangunan yang dilaksanakan
              secara rutin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
