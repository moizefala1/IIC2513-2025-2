'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [{
      authorId: 1,
      reviewedId: 2,
      comment: 'prueba1',
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      date: new Date()
    }, {
      authorId: 2,
      reviewedId: 3,
      comment: 'prueba2',
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      date: new Date()
    },{
      authorId: 3,
      reviewedId: 1,
      comment: 'prueba3',
      rating: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      date: new Date()
    },{
      authorId: 3,
      reviewedId: 2,
      comment: 'prueba4',
      rating: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      date: new Date()
    },{
      authorId: 2,
      reviewedId: 1,
      comment: 'prueba5',
      rating: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      date: new Date()
    },{
      authorId: 1,
      reviewedId: 3,
      comment: 'prueba6',
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      date: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
