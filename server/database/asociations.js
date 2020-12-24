const User = require('./models/User');
const Post = require('./models/Post');
const Friend = require('./models/Friend');

// One to Many, hasMany
User.hasMany(Post, { as: 'posts', foreignKey: 'user_id' });

Post.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

// Many to Many
User.belongsToMany(User, {
  as: 'friends',
  foreignKey: 'user_id',
  through: Friend
});

User.belongsToMany(User, {
  as: 'userFriends',
  foreignKey: 'friend_id',
  through: Friend
});