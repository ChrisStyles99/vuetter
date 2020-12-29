const Post = require('../database/models/Post');
const sequelize = require('../database/db');
const {QueryTypes} = require('sequelize');
const User = require('../database/models/User');

const postController = {};

postController.newPost = async (req, res) => {
  const { content } = req.body;

  try {
    const post = await Post.create({
      content,
      user_id: req.user,
    });

    res.status(201).json(post);
  } catch (err) {
    const msg = err.errors[0].message;
    res.json({error: true, msg});
  }
};

postController.userPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        user_id: req.user,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

postController.deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    await Post.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ error: false, msg: 'Post deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
};

postController.friendsPosts = async (req, res) => {
  try {
    const posts = await sequelize.query(
      'SELECT posts.*, users.* FROM posts JOIN friends ON friends.friend_id = posts.user_id JOIN users ON users.id = posts.user_id WHERE friends.user_id = ? ORDER BY posts.createdAt DESC',
      { replacements: [req.user], type: QueryTypes.SELECT }
    );
    res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = postController;
