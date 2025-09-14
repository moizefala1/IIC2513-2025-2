'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Pokemon, {
        foreignKey: 'userId',
        as: 'pokemons'
      });

      User.hasMany(models.Review, {
        foreignKey: 'authorId',
        as: 'writtenReviews'
      });
      
      User.hasMany(models.Review, {
        foreignKey: 'reviewedId',
        as: 'receivedReviews'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};