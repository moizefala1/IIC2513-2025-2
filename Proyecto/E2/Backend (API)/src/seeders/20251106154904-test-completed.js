'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    await queryInterface.bulkInsert('Completeds', [
      // Evento 2 del admin - "Revisar reportes trimestrales" (hace 5 días)
      {
        event_id: 2,
        completion_date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Evento 6 de María - "Comprar regalo cumpleaños mamá" (hace 2 días)
      {
        event_id: 6,
        completion_date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Evento 11 de Carlos - "Entregar proyecto final universidad" (hace 3 días)
      {
        event_id: 11,
        completion_date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Completeds', null, {});
  }
};
