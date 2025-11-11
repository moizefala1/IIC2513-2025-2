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
      User.hasMany(models.Event, {
         foreignKey: 'user_id',
         sourceKey: 'id'
       });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    birthday: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};