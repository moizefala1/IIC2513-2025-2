'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Brock',
      image: 'https://images.wikidexcdn.net/mwuploads/wikidex/3/3b/latest/20180812021535/Brock_LGPE.png',
      password: '1234',
      balance: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Ash Ketchum',
      image: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Ash_Ketchum_Journeys.png',
      password: '1234',
      balance: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Misty',
      image: 'https://images.wikidexcdn.net/mwuploads/wikidex/f/fd/latest/20180812024731/Misty_LGPE.png',
      password: '1234',
      balance: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
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
