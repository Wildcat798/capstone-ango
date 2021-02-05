const express = require('express');
const { createPost, postPost, createComment, postComment } = require('../controllers/blog');
const router = express.Router();

router

    .get('/blog/blogForm', createPost)
    .post('/blog/blogList', postPost)
    .get('blog/createComment', createComment)
    .post('/blog/blogList', postComment)

module.exports = router;