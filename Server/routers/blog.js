const express = require('express');
const { createPost, postPost } = require('../controllers/blog');
const router = express.Router();

router

    .get('/blog/blogForm', createPost)
    .post('/blog/blogList', postPost)

module.exports = router;