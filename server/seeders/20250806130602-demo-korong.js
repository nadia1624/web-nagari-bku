'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Korongs', [
      {
        nama_korong: 'Korong Batu Kalang Tuo',
        deskripsi_korong: 'Korong A adalah salah satu dari empat korong utama di Nagari Batu Kalang Utara. Dikenal dengan lahan pertaniannya yang subur dan kerukunan warganya.',
        jumlah_pria: 750,
        jumlah_wanita: 750,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_korong: 'Korong Pondok Kayu',
        deskripsi_korong: 'Korong B memiliki keindahan alam yang menawan dengan sungai yang mengalir deras, cocok untuk pengembangan wisata alam. Mayoritas penduduknya bekerja sebagai petani dan pekebun.',
        jumlah_pria: 600,
        jumlah_wanita: 600,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_korong: 'Korong Durian Siamih',
        deskripsi_korong: 'Korong C adalah pusat kegiatan masyarakat, dengan pasar tradisional dan berbagai usaha kecil menengah. Masyarakatnya sangat aktif dalam kegiatan kebudayaan.',
        jumlah_pria: 1000,
        jumlah_wanita: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_korong: 'Korong Kampung Baru',
        deskripsi_korong: 'Korong D berbatasan langsung dengan hutan lindung, menjadikannya strategis untuk konservasi lingkungan. Warganya menjaga erat adat dan tradisi leluhur.',
        jumlah_pria: 400,
        jumlah_wanita: 400,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Korongs', null, {});
  }
};
