const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class Like extends Model {};

Like.init({
  user_id: DataTypes.BIGINT,
  post_id: DataTypes.BIGINT
}, {
  sequelize,
  modelName: 'like',
  timestamps: false
});

module.exports = Like;