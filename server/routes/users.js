const {Router} = require('express');
const {register, login, addFriend, getOwnProfile, getProfile} = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/add-friend/:id', verifyToken, addFriend);

router.get('/profile', verifyToken, getOwnProfile);

router.get('/profiles/:id', verifyToken, getProfile);

module.exports = router;