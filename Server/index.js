require('dotenv').config();

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const helmet = require('helmet');
const morgan = require('morgan');
const es6Renderer = require('express-es6-template-engine');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const logger = morgan('tiny');

let users = [];

app.use(session({
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(logger);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const homeRoutes = require("./routers/home")
const userRoutes = require("./routers/user")
const blogRoutes = require("./routers/blog")

const { requireLogin } = require('./auth')

app.use("/", homeRoutes)

app.use("/api/user", userRoutes)
app.use("/api/blog", blogRoutes)

app.get('/unauthorized', (req, res) => {
    res.send(`You must gather your party before venturing forth.`);
});

server.listen(6000, () => console.log('server is running on port 6000'));