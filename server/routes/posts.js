const {Router} = require('express');
const router = Router();
const {newPost, userPosts, deletePost, friendsPosts} = require('../controllers/postController');

router.get('/user-posts', userPosts);

router.post('/new-post', newPost);

router.delete('/delete-post/:id', deletePost);

router.get('/', friendsPosts);

module.exports = router;