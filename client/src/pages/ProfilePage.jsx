import React from 'react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-red-800 text-white p-8">
            <h1 className="text-3xl font-bold mb-2">Profile Nagari Batu Kalang Utara</h1>
            <p className="text-red-100">Mengenal lebih dekat dengan nagari kami</p>
          </div>

          <div className="p-8">
            {/* Pengenalan Singkat */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Pengenalan Singkat</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-4">
                    Nagari Batu Kalang Utara adalah sebuah nagari yang terletak di wilayah yang strategis
                    dengan potensi alam yang melimpah. Nagari ini memiliki sejarah panjang dalam
                    pembangunan masyarakat dan terus berkembang hingga saat ini.
                  </p>
                  <p className="text-gray-600">
                    Dengan jumlah penduduk yang terus bertambah dan berbagai potensi yang dimiliki,
                    Nagari Batu Kalang Utara berkomitmen untuk terus memberikan pelayanan terbaik
                    kepada masyarakat dan mengembangkan potensi yang ada.
                  </p>
                </div>
                <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-32 h-32 bg-gray-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white">Foto Nagari</span>
                    </div>
                    <p className="text-sm">Gambar Nagari Batu Kalang Utara</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Visi dan Misi */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Visi dan Misi</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Visi</h3>
                  <p className="text-gray-700">
                    "Mewujudkan Nagari Batu Kalang Utara yang maju, sejahtera, dan berkelanjutan
                    dengan tetap mempertahankan nilai-nilai budaya dan kearifan lokal."
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Misi</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Meningkatkan kualitas pelayanan kepada masyarakat</li>
                    <li>• Mengembangkan potensi ekonomi dan pariwisata</li>
                    <li>• Melestarikan budaya dan tradisi lokal</li>
                    <li>• Membangun infrastruktur yang memadai</li>
                    <li>• Meningkatkan kualitas sumber daya manusia</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Struktur Organisasi */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Struktur Organisasi</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="w-16 h-16 bg-red-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white text-sm">WN</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Wali Nagari</h4>
                    <p className="text-sm text-gray-600">Nama Wali Nagari</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white text-sm">SW</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Sekretaris</h4>
                    <p className="text-sm text-gray-600">Nama Sekretaris</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white text-sm">KK</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Kaur Keuangan</h4>
                    <p className="text-sm text-gray-600">Nama Kaur Keuangan</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;