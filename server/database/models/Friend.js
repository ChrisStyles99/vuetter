const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class Friend extends Model {}

Friend.init({
  user_id: DataTypes.BIGINT,
  friend_id: DataTypes.BIGINT
}, {
  sequelize,
  modelName: 'friend',
  timestamps: false
});

module.exports = Friend;