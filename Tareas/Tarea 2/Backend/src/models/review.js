'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Review.belongsTo(models.User, {
        foreignKey: "authorId",
        as: "author"
      });
      
      Review.belongsTo(models.User, {
        foreignKey: "reviewedId",
        as: "reviewedUser"
      });
    }
  }
  Review.init({
    authorId: DataTypes.INTEGER,
    reviewedId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    authorName: DataTypes.STRING,
    reviewedName: DataTypes.STRING,
    date: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};