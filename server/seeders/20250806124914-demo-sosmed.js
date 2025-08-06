'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SosialMedia', [
      {
        facebook: 'https://facebook.com/nadia.hanifah',
        instagram: 'https://instagram.com/nadiahanifah',
        x: 'https://x.com/nadiahanifah',
        youtube: 'https://youtube.com/@nadiahanifah',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SosialMedia', null, {});
  }
};
