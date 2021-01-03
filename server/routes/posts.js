const {Router} = require('express');
const router = Router();
const {newPost, userPosts, deletePost, friendsPosts, likePost, removeLike, singlePost, search} = require('../controllers/postController');

router.get('/user-posts', userPosts);

router.post('/new-post', newPost);

router.delete('/delete-post/:id', deletePost);

router.get('/', friendsPosts);

router.get('/post/:id', singlePost);

router.post('/like-post/:id', likePost);

router.delete('/remove-like/:id', removeLike);

router.get('/search', search);

module.exports = router;