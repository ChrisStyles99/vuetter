const User = require('../database/models/User');
const Friend = require('../database/models/Friend');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const userController = {};

userController.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (user) {
      return res.json({ error: true, msg: 'Username or email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    res.json({ error: false, msg: 'User created' });
  } catch (err) {
    const msg = err.errors[0].message;
    res.json({error: true, msg});
  }
};

userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.json({ error: true, msg: 'Email does not exists' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ error: true, msg: 'Password does not match' });
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      maxAge: 3600000,
      httpOnly: true,
    });

    res.cookie('isLoggedIn', true, {maxAge: 3600000});

    res.status(200).json({error: false, msg: 'You are now logged in'});
  } catch (err) {
    const msg = err.errors[0].message;
    res.json({error: true, msg});
  }
};

userController.getOwnProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user, {
      include: ['posts', 'friends', 'likedPosts'],
      order: [['posts', 'createdAt', 'DESC']]
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

userController.addFriend = async (req, res) => {
  try {
    const id = req.params.id;
    await Friend.create({
      user_id: req.user,
      friend_id: id,
    });
    res.status(201).json({ error: false, msg: 'Following new person' });
  } catch (err) {
    res.status(500).json({error: true, err: msg});
  }
};

userController.removeFriend = async (req, res) => {
  try {
    const id = req.params.id;
    await Friend.destroy({
      where: {
        [Op.and]: [{ user_id: req.user }, { friend_id: id }],
      },
    });

    res.status(200).json({ error: false, msg: 'Unfollowing the person' });
  } catch (err) {
    res.status(500).json({error: true, err: msg});
  }
};

userController.getProfile = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByPk(id, {
      include: ['posts', 'friends']
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({error: true, msg: err});
  }
};

userController.logout = async(req, res) => {
  res.clearCookie('token');
  res.clearCookie('isLoggedIn');
  res.status(200).json({error: false, msg: "You have successfully logged out"});
};

module.exports = userController;
