import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-red-100 mt-auto relative">
      
      {/* Background Pattern & Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900" />
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.1
          }}
        />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-5 group">
              <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                Nagari Batu Kalang Utara
              </h3>
            </div>
            <p className="text-red-100/90 text-sm mb-6 leading-relaxed">
              Website resmi Nagari Batu Kalang Utara untuk informasi profil nagari, berita, serta pemetaan wilayah. Dikelola secara profesional untuk mendukung transparansi dan pelayanan kepada masyarakat.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              {[
                {icon: Facebook, color: 'from-blue-500 to-blue-600', hoverColor: 'hover:from-blue-600 hover:to-blue-700'}, 
                {icon: Instagram, color: 'from-pink-500 to-purple-600', hoverColor: 'hover:from-pink-600 hover:to-purple-700'}, 
                {icon: Twitter, color: 'from-sky-400 to-sky-600', hoverColor: 'hover:from-sky-500 hover:to-sky-700'}, 
                {icon: Youtube, color: 'from-red-500 to-red-600', hoverColor: 'hover:from-red-600 hover:to-red-700'}
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={i} 
                    href="#" 
                    className={`w-10 h-10 bg-white/10 backdrop-blur-sm bg-gradient-to-r ${social.color} ${social.hoverColor} rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg text-white border border-white/20`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-white to-red-200 rounded-full mr-3"></div>
              Kontak Kami
            </h3>
            <ul className="space-y-4 text-sm text-red-100/90">
              <li className="flex gap-3 items-start hover:text-white transition-colors duration-300">
                <div className="p-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 mt-0.5">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span>Nagari Batu Kalang Utara, Kec. Padang Pariaman, Sumatera Barat</span>
              </li>
              <li className="flex gap-3 items-center hover:text-white transition-colors duration-300">
                <div className="p-1 rounded-lg bg-gradient-to-r from-green-500 to-teal-600">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span>(0751) xxx-xxx</span>
              </li>
              <li className="flex gap-3 items-center hover:text-white transition-colors duration-300">
                <div className="p-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span>info@batuklangtara.go.id</span>
              </li>
            </ul>
          </div>

          {/* Service Hours Section */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-white to-red-200 rounded-full mr-3"></div>
              Jam Pelayanan
            </h3>
            <ul className="space-y-3 text-sm text-red-100/90">
              <li className="flex gap-3 items-center hover:text-white transition-colors duration-300">
                <div className="p-1 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-600">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span>Senin - Jumat: 08:00 - 16:00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-red-600/30 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-red-100/80">
          <div className="text-center md:text-left mb-3 md:mb-0 hover:text-white transition-colors duration-300">
            &copy; 2025 Nagari Batu Kalang Utara. Semua hak dilindungi.
          </div>
          <div className="flex items-center gap-3">
            <a className="hover:text-white transition-colors duration-300 flex items-center gap-2 group">
              <span>By KKN UNAND 2025</span>
              <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full group-hover:animate-pulse"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 backdrop-blur-sm border border-red-500/30"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;