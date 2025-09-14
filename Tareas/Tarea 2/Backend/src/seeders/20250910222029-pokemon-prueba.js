'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pokemons', [{
      name: "Bulbasaur",
      level: 1,
      types: ["Planta", "Veneno"],
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      onSale: false,
      price: 100,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Charmander",
      level: 1,
      types: ["Fuego"],
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      onSale: false,
      userId: 2,
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Squirtle",
      level: 1,
      types: ["Agua"],
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
      onSale: false,
      userId: 3,
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Ivysaur",
      level: 1,
      types: ["Planta", "Veneno"],
      price: 300,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      onSale: true,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Charmeleon",
      level: 1,
      types: ["Fuego"],
      price: 300,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
      onSale: true,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Wartortle",
      level: 1,
      types: ["Agua"],
      price: 300,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
      onSale: true,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Venasaur",
      level: 1,
      types: ["Planta", "Veneno"],
      price: 900,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      onSale: true,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Charizard",
      level: 1,
      types: ["Fuego", "Dragón"],
      price: 900,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
      onSale: true,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Blastoise",
      level: 1,
      types: ["Agua"],
      price: 900,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
      onSale: true,
      userId: 3,
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
