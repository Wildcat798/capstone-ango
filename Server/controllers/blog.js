const { layout } = require('../utils')
const { Post } = require('../models');

const createPost = (req, res) => {
    res.render('blog/blogForm', {
        locals: {
            ...layout
        }
    });
};

const postPost = async (req, res) => {
    const { title, content } = req.body;
    const { id, username } = req.session.user;
    const { file } = req;
    let mediaPic = file ? UPLOAD_URL + file.filename : "";
    if (title && id) {
        const post = await Post.create({
            userid: id,
            username,
            title,
            media: mediaPic,
            content,
        });
        res.status(200).json({
            message: "Created new post",
            id
        });
    } else {
        res.redirect(req.url);
    }
    
};


module.exports = {
    createPost,
    postPost,
};