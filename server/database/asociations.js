const User = require('./models/User');
const Post = require('./models/Post');
const Friend = require('./models/Friend');
const Like = require('./models/Like');

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

// Many to Many
// Post.hasMany(Like, {
//   as: 'postLikes',
//   foreignKey: 'post_id'
// });

// Like.belongsTo(Post, {
//   as: 'likes',
//   foreignKey: 'post_id'
// });

// User.hasMany(Like, {
//   as: 'likedPosts',
//   foreignKey: 'user_id'
// });

// Like.belongsTo(User, {
//   as: 'users',
//   foreignKey: 'user_id'
// });

Post.belongsToMany(User, {as: 'postLikes', foreignKey: 'post_id', through: Like});
User.belongsToMany(Post, {as: 'likedPosts', foreignKey: 'user_id', through: Like});