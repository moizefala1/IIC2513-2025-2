'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    await queryInterface.bulkInsert('Events', [
      // ========== EVENTOS DEL ADMIN (user_id: 1) ==========
      {
        user_id: 1,
        title: 'Reunión de planificación mensual',
        description: 'Revisar objetivos y métricas del equipo',
        date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // En 2 días
        end_date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2 horas después
        all_day: false,
        color: '#FF6B6B',
        notify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        title: 'Revisar reportes trimestrales',
        description: 'Análisis de resultados Q4',
        date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), // Hace 5 días (completada)
        end_date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
        all_day: false,
        color: '#4ECDC4',
        notify: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        title: 'Conferencia Tech Summit 2025',
        description: 'Asistir a la conferencia anual de tecnología',
        date: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000), // En 15 días
        end_date: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000),
        all_day: true,
        color: '#9B59B6',
        notify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        title: 'Entrevistas de candidatos',
        description: 'Proceso de selección para nuevo desarrollador',
        date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000), // Mañana
        end_date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
        all_day: false,
        color: '#F39C12',
        notify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // ========== EVENTOS DE MARIA (user_id: 2) ==========
      {
        user_id: 2,
        title: 'Clase de yoga',
        description: 'Sesión semanal de yoga en el gimnasio',
        date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000), // Mañana
        end_date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000),
        all_day: false,
        color: '#E74C3C',
        notify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        title: 'Comprar regalo cumpleaños mamá',
        description: 'Buscar regalo especial para el cumpleaños',
        date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), // Hace 2 días (completada)
        end_date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        all_day: true,
        color: '#3498DB',
        notify: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        title: 'Dentista - Limpieza dental',
        description: 'Cita de control semestral',
        date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // En 1 semana
        end_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000),
        all_day: false,
        color: '#1ABC9C',
        notify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        title: 'Estudiar para certificación',
        description: 'Repasar módulos 5-7 de React Advanced',
        date: today, // Hoy
        end_date: new Date(today.getTime() + 3 * 60 * 60 * 1000),
        all_day: false,
        color: '#E67E22',
        notify: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        title: 'Cena con amigas',
        description: 'Reunión mensual en el restaurante italiano',
        date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // En 3 días
        end_date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
        all_day: false,
        color: '#E91E63',
        notify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // ========== EVENTOS DE CARLOS (user_id: 3) ==========
      {
        user_id: 3,
        title: 'Partido de fútbol',
        description: 'Encuentro semanal con amigos en la cancha',
        date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // En 2 días
        end_date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        all_day: false,
        color: '#2ECC71',
        notify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        title: 'Entregar proyecto final universidad',
        description: 'Subir código y documentación a la plataforma',
        date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000), // Hace 3 días (completada)
        end_date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        all_day: true,
        color: '#9B59B6',
        notify: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        title: 'Vacaciones en la playa',
        description: 'Viaje familiar a Viña del Mar',
        date: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000), // En 30 días
        end_date: new Date(today.getTime() + 37 * 24 * 60 * 60 * 1000), // 7 días de duración
        all_day: true,
        color: '#3498DB',
        notify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        title: 'Mantenimiento del auto',
        description: 'Cambio de aceite y revisión general',
        date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // En 5 días
        end_date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        all_day: false,
        color: '#95A5A6',
        notify: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        title: 'Cumpleaños de papá',
        description: 'Celebración familiar en casa',
        date: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), // En 10 días
        end_date: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000),
        all_day: true,
        color: '#F39C12',
        notify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
