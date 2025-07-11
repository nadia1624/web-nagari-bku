'use strict';
const bcrypt = require('bcryptjs'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('adminbku123', 10); 

    await queryInterface.bulkInsert('Users', [{
      username: 'AdminBKU',
      role: 'Admin',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { username: 'AdminBKU' }, {});
  }
};
