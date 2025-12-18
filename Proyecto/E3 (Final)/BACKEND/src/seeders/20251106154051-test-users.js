'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Hash de contraseñas
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: hashedPassword,
        email: 'admin@dawdle.com',
        image: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff',
        age: 30,
        birthday: new Date('1994-01-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'maria_lopez',
        password: hashedPassword,
        email: 'maria.lopez@example.com',
        image: 'https://ui-avatars.com/api/?name=Maria+Lopez&background=FF6B6B&color=fff',
        age: 25,
        birthday: new Date('1999-05-20'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'carlos_gomez',
        password: hashedPassword,
        email: 'carlos.gomez@example.com',
        image: 'https://ui-avatars.com/api/?name=Carlos+Gomez&background=4ECDC4&color=fff',
        age: 28,
        birthday: new Date('1996-08-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
