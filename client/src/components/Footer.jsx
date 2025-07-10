import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Nagari Batu Kalang Utara</h3>
            <p className="text-gray-300 text-sm">
              Website resmi Nagari Batu Kalang Utara yang menyajikan informasi terkini tentang
              profil nagari, berita, dan pemetaan wilayah.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📍 Alamat: Nagari Batu Kalang Utara</p>
              <p>📞 Telepon: (0751) xxx-xxx</p>
              <p>✉️ Email: info@batuklangtara.go.id</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Jam Pelayanan</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Senin - Jumat: 08:00 - 16:00</p>
              <p>Sabtu: 08:00 - 12:00</p>
              <p>Minggu: Tutup</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Nagari Batu Kalang Utara. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;