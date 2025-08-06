'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FasilitasKorongs', {
      id_fasilitas: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_korong: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Korongs',
          key: 'id_korong'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nama_fasilitas: {
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
    await queryInterface.dropTable('FasilitasKorongs');
  }
};