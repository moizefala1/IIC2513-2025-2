'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    await queryInterface.bulkInsert('Notifications', [
      // Evento 1 del admin - "Reunión de planificación mensual" (en 2 días)
      // Notificación 1 hora antes
      {
        event_id: 1,
        notif_time: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Evento 3 del admin - "Conferencia Tech Summit 2025" (en 15 días)
      // Notificación 1 día antes
      {
        event_id: 3,
        notif_time: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Evento 4 del admin - "Entrevistas de candidatos" (mañana)
      // Notificación 2 horas antes
      {
        event_id: 4,
        notif_time: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Evento 5 de María - "Clase de yoga" (mañana)
      // Notificación 30 minutos antes
      {
        event_id: 5,
        notif_time: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000 - 30 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Evento 7 de María - "Dentista - Limpieza dental" (en 1 semana)
      // Notificación 1 día antes
      {
        event_id: 7,
        notif_time: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Evento 9 de María - "Cena con amigas" (en 3 días)
      // Notificación 3 horas antes
      {
        event_id: 9,
        notif_time: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Evento 10 de Carlos - "Partido de fútbol" (en 2 días)
      // Notificación 1 hora antes
      {
        event_id: 10,
        notif_time: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Evento 12 de Carlos - "Vacaciones en la playa" (en 30 días)
      // Notificación 1 semana antes
      {
        event_id: 12,
        notif_time: new Date(today.getTime() + 23 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Evento 14 de Carlos - "Cumpleaños de papá" (en 10 días)
      // Notificación 1 día antes
      {
        event_id: 14,
        notif_time: new Date(today.getTime() + 9 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};
