const express = require('express');
const { createPost, postPost } = require('../controllers/blog');
const router = express.Router();

const {
    createPost,
    postPost
} = require('../controllers/blog');

router

    .get('/new', createPost)
    .post('/new', postPost)

module.exports = router;