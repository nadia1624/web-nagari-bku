'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Umkms', {
      id_umkm: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_pemilik: {
        type: Sequelize.STRING
      },
      produk: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      no_hp: {
        type: Sequelize.STRING
      },
      gambar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Umkms');
  }
};