const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class Post extends Model {}

Post.init({
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "The post can't be null"
      },
      len: {
        args: [1, 240],
        msg: 'Post must be from 1 character to 240'
      }
    }
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'post'
});

module.exports = Post;