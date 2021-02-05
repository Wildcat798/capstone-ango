const { layout } = require('../layout')
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

const createComment = async (req, res) => {
    const { id } = req.params;

    const post = await Post.findByPk(id);
    const users = await User.findAll({
        order: [["username", "asc"]],
    });

    res.render("createComment", {
        locals: {
        title: "Add Comment",
        post,
        users,
        },
        ...layout,
    });
};

const postComment = async (req, res) => {
    const post = req.params.id;
    const { content } = req.body;
    const { id } = req.session.user;
    if (title && id) {
        const comment = await Comment.create({
            content,
            userid: id,
            postid: post,
        });
        res.status(200).json({
            message: "Created comment",
            id
        });
    } else {
    res.redirect(req.url);
    }
};



module.exports = {
    createPost,
    postPost,
    createComment,
    postComment
};
