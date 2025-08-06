'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('InformasiNagaris', [
      {
        deskripsi: `Nagari Batu Kalang Utara merupakan salah satu nagari yang berada di wilayah pesisir Sumatera Barat. Nagari ini dikenal dengan keindahan alamnya yang asri, sawah yang membentang luas, serta kehidupan masyarakat yang harmonis dan menjunjung tinggi nilai-nilai adat dan budaya Minangkabau.`,
        visi: `Menjadikan Nagari Batu Kalang Utara sebagai nagari yang mandiri, berbudaya, dan berdaya saing berbasis potensi lokal serta teknologi informasi.`,
        misi: `1. Meningkatkan kualitas pendidikan, kesehatan, dan pelayanan publik\n2. Mengembangkan potensi ekonomi masyarakat melalui pertanian, UMKM, dan pariwisata\n3. Melestarikan adat dan budaya Minangkabau\n4. Meningkatkan partisipasi masyarakat dalam pembangunan nagari\n5. Mewujudkan tata kelola pemerintahan nagari yang transparan dan akuntabel`,
        struktur: 'gambar-1753179902851.jpg',
        kontak: '0812-3456-7890',
        email: 'nagari.batukalangutara@example.com',
        vidio: 'https://www.youtube.com/watch?v=dummyprofilvideo',
        jam_pelayanan: 'Senin - Jumat, 08.00 - 16.00 WIB',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('InformasiNagaris', null, {});
  }
};
