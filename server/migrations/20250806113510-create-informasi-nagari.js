'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InformasiNagaris', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      visi: {
        type: Sequelize.TEXT
      },
      misi: {
        type: Sequelize.TEXT
      },
      struktur: {
        type: Sequelize.TEXT
      },
      kontak: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      vidio: {
        type: Sequelize.STRING
      },
      jam_pelayanan: {
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
    await queryInterface.dropTable('InformasiNagaris');
  }
};