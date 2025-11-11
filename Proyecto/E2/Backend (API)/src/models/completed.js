'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Completed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Completed.belongsTo(models.Event, {  
        foreignKey: 'event_id',
        targetKey: 'id'
      });
    }
  }
  Completed.init({
    event_id: DataTypes.INTEGER,
    completion_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Completed',
  });
  return Completed;
};