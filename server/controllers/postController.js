const Post = require('../database/models/Post');
const sequelize = require('../database/db');
const { QueryTypes, Op } = require('sequelize');
const Like = require('../database/models/Like');
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
    res.json({ error: true, msg });
  }
};

postController.userPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        user_id: req.user,
      },
      include: ['postLikes'],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

postController.singlePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id, {
      include: ['postLikes', 'user'],
    });
    res.status(200).json({ error: false, post });
  } catch (err) {
    res.json({ error: true, msg: err });
  }
};

postController.deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    await Post.destroy({
      where: {
        [Op.and]: [{id}, {user_id: req.user}]
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
      'SELECT posts.*, users.name, users.username, users.email FROM posts RIGHT JOIN users ON posts.user_id = users.id WHERE posts.user_id IN (SELECT friend_id FROM friends WHERE user_id = ?) OR posts.user_id = ? ORDER BY posts.createdAt DESC',
      { replacements: [req.user, req.user], type: QueryTypes.SELECT }
    );
    res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

postController.likePost = async (req, res) => {
  try {
    const id = req.params.id;
    await Like.create({
      user_id: req.user,
      post_id: id,
    });
    await Post.increment('likes', {
      by: 1,
      where: {
        id
      }
    });
    const post = await Post.findByPk(id);
    res.status(201).json({ error: false, msg: 'Liked new post', post});
  } catch (err) {
    res.json({ error: true, msg: err });
  }
};

postController.removeLike = async (req, res) => {
  try {
    const id = req.params.id;
    await Like.destroy({
      where: {
        [Op.and]: [{ user_id: req.user }, { post_id: id }],
      },
    });

    await Post.increment('likes', {
      by: -1,
      where: {
        id
      }
    });

    res.status(200).json({ error: false, msg: 'Removed like' });
  } catch (err) {
    res.json({ error: true, msg: err });
  }
};

postController.search = async(req,res) => {
  try {
    const query = req.query.term;
    const users = await User.findAll({
      where: {
        username: {
          [Op.like]: `%${query}%`
        }
      }
    });
    const posts = await Post.findAll({
      where: {
        content: {
          [Op.like]: `%${query}%`
        }
      },
      include: ['user'],
    });
    res.status(200).json({error: false, users, posts});
  } catch (err) {
    res.json({error: true, msg: err});
  }
};

module.exports = postController;
