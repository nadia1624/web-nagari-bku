import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto relative">
      
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.2
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-5">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Nagari Batu Kalang Utara
              </h3>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Website resmi Nagari Batu Kalang Utara untuk informasi profil nagari, berita, serta pemetaan wilayah. Dikelola secara profesional untuk mendukung transparansi dan pelayanan kepada masyarakat.
            </p>

            <div className="flex gap-3">
              {[{icon: Facebook, color: 'blue-600'}, {icon: Instagram, color: 'pink-500'}, {icon: Twitter, color: 'sky-500'}, {icon: Youtube, color: 'red-600'}].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a key={i} href="#" className={`w-10 h-10 bg-gray-700 hover:bg-${social.color} rounded-full flex items-center justify-center transition transform hover:scale-110`}>
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-blue-400">Kontak Kami</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                Nagari Batu Kalang Utara, Kec. Padang Pariaman, Sumbar
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-green-400" />
                (0751) xxx-xxx
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-purple-400" />
                info@batuklangtara.go.id
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-blue-400">Jam Pelayanan</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-3 items-center">
                <Clock className="text-blue-400 w-5 h-5" />
                <span>Senin - Jumat: 08:00 - 16:00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="text-center md:text-left mb-3 md:mb-0">
            &copy; 2025 Nagari Batu Kalang Utara. Semua hak dilindungi.
          </div>
          <div className="flex items-center gap-3">
            <a className="hover:text-blue-400">By KKN UNAND 2025</a>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
