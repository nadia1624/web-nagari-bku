'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FasilitasKorongs', [
      // Korong 1: Batu Kalang Tuo
      {
        id_korong: 1,
        nama_fasilitas: 'Masjid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_korong: 1,
        nama_fasilitas: 'Sekolah Dasar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_korong: 1,
        nama_fasilitas: 'Puskesmas Pembantu',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Korong 2: Pondok Kayu
      {
        id_korong: 2,
        nama_fasilitas: 'Mushola',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_korong: 2,
        nama_fasilitas: 'Balai Pertemuan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_korong: 2,
        nama_fasilitas: 'Kebun Kopi',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Korong 3: Durian Siamih
      {
        id_korong: 3,
        nama_fasilitas: 'Pasar Nagari',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_korong: 3,
        nama_fasilitas: 'Kantor Korong',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_korong: 3,
        nama_fasilitas: 'Posyandu',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Korong 4: Kampung bru
      {
        id_korong: 4,
        nama_fasilitas: 'Air Terjun',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_korong: 4,
        nama_fasilitas: 'Makam Keramat',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_korong: 4,
        nama_fasilitas: 'Kelompok Tani',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FasilitasKorongs', null, {});
  }
};
