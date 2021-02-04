require('dotenv').config();

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

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

const messages = {
    general: [],
    lawmakers: [],
    judges: [],
    lawyers: [],
    professors: [],
    students: []
};

io.on('connection', socket => {
    socket.on("join server", (username) => {
        const user = {
            username,
            id: socket.id,
        };
        users.push(user);
        io.getMaxListeners("new user", users);
    });

    socket.on("join room", (roomName, cb) => {
        socket.join(roomName);
        cb(messages[roomName]);
    });

    socket.on('send message', ({ content, to, sender, chatName, isChannel }) => {
        if (isChannel) {
            const payload = {
                content,
                chatName,
                sender,
            };
            socket.to(to).emit("new message", payload);
        } else {
            const payload = {
                content,
                chatName,
                sender,
            };
            socket.to(to).emit("new message", payload);
        }
        if (messages[chatName]) {
            messages[chatName].push({
                sender,
                content
            });
        };
    })

    socket.on("disconnect", () => {
        users = users.filter(u => u.id !== socket.id);
        io.emit("new user", users);
    });
});

app.use("/", homeRoutes)
app.use("/user", userRoutes)

server.listen(1337, () => console.log('server is running on port 1337'));


//     if (!users[socket.id]) {
//         users[socket.id] = socket.id;
//     }
//     socket.emit("yourID", socket.id);
//     io.sockets.emit("allUsers", users);
//     socket.on('disconnect', () => {
//         delete users[socket.id];
//     })

//     socket.on("callUser", (data) => {
//         io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
//     })

//     socket.on("acceptCall", (data) => {
//         io.to(data.to).emit('callAccepted', data.signal);
//     })
// });

// server.listen(8000, () => console.log('server is running on port 8000'));
