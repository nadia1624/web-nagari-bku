'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Korongs', {
      id_korong: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_korong: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deskripsi_korong: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      jumlah_wanita: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      jumlah_pria: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    await queryInterface.dropTable('Korongs');
  }
};