'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.User, {  
        foreignKey: 'user_id',
        targetKey: 'id'
        });
      Event.hasMany(models.Notification, {
        foreignKey: 'event_id',
        sourceKey: 'id'
      });
      Event.hasMany(models.Completed, {
        foreignKey: 'event_id',
        sourceKey: 'id'
      });
    }
  }
  Event.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    all_day: DataTypes.BOOLEAN,
    color: DataTypes.STRING,
    notify: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};