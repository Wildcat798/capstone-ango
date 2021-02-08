import React, {useState, useRef, useEffect } from 'react';
import Form from "./Components/UsernameForm";
import Chat from "./Components/Chat";
import io from "socket.io-client";
import immer from "immer";
import "./App.css";
import Public from "./Components/Public"
import Private from "./Components/Private"
import Projects from "./Components/Projects"
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './Components/Home';

// to connect to backend
import axios from 'axios';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Logout from './Components/Logout';

const initialMessagesState = {
  general: [],
  lawmakers: [],
  judges: [],
  lawyers: [],
  professors: [],
  students: []
};

function App() {
  // to connect to backend
  const [loggedIn, setloggedIn] = useState(false);
  const [blogs, setBlogs] = useState([]);

  // async function retrieveBlog() {
  //   const resp = await axios.get('/api/blog')
  //   // -------------Blog Data-------------------------------
  //   console.log(data)
  //   // -----------------------------------------------------
  //   setBlogs(resp.data.blogs);
  // }

  function doLogin() {
    console.log("You're logged in.");
    setloggedIn(true);
  }

  function doLogout() {
    console.log("You're out.");
    setloggedIn(false);
  }

  useEffect(() => {
    async function checkLogin() {
      try {      
        const resp = await axios.get('/api/user/login-status');
        console.log('you are logged in already');
        setloggedIn(true);
      } catch (e) {
        console.log('error means not logged in');
        setloggedIn(false);
      }
    }
    checkLogin();    
  }, []);

  useEffect(() => {
    console.log(`Value of loggedIn: ${loggedIn}`);
    if (loggedIn) {
      // retrieveBlog();
      console.log("ayy")
    }
  }, [loggedIn]);
  // -------------------------------------------------------------
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState (false);
  const [currentChat, setCurrentChat] = useState({ isChannel: true, chatName: "general", receiverId: "" });
  const [connectedRooms, setConnectedRooms] = useState(["general"]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState(initialMessagesState);
  const [message, setMessage] = useState("");
  const socketRef = useRef();

  function handleMessageChange(e) {
    setMessage(e.target.value);
  };

  useEffect(() => {
    setMessage("");
  }, [messages]);

  function sendMessage() {
    const payload = {
      content: message,
      to: currentChat.isChannel ? currentChat.chatName : currentChat.receiverId,
      sender: username,
      chatName: currentChat.chatName,
      isChannel: currentChat.isChannel
    };
    socketRef.current.emit("send message", payload);
    const newMessages = immer(messages, draft => {
      draft[currentChat.chatName].push({
        sender: username,
        content: message
      });
    });
    setMessages(newMessages);
  }

  function roomJoinCallback(incomingMessages, room) {
    const newMessages = immer(messages, draft => {
      draft[room] = incomingMessages;
    });
    setMessages(newMessages);
  }

  function joinRoom(room) {
    const newConnectedRooms = immer(connectedRooms, draft => {
      draft.push(room);
    });

    socketRef.current.emit("join room", room, (messages) => roomJoinCallback(messages, room));
    setConnectedRooms(newConnectedRooms);
  }

  function toggleChat(currentChat) {
    if (!messages[currentChat.chatName]) {
      const newMessages = immer(messages, draft => {
        draft[currentChat.chatName] = [];
      });
      setMessages(newMessages);
    }
    setCurrentChat(currentChat);
  }

  function handleChange(e) {
    setUsername(e.target.value);
  };

  function connect() {
    setConnected(true);
    socketRef.current = io.connect("/");
    socketRef.current.emit("join server", username);
    socketRef.current.emit("join room", "general", (messages) => roomJoinCallback(messages, "general"));
    socketRef.current.on("new user", allUsers => {
      setAllUsers(allUsers);
    });
    socketRef.current.on("new message", ({ content, sender, chatName }) => {
      setMessages(messages => {
        const newMessages = immer(messages, draft => {
          if (draft[chatName]) {
            draft[chatName].push({ content, sender });
          } else {
            draft[chatName] = [{ content, sender }];
          }
        });
        return newMessages;
      });
    });
  }

  let body;
  if (connected) {
    body = (
      <Chat
        message={message}
        handleMessageChange={handleMessageChange}
        sendMessage={sendMessage}
        yourId={socketRef.current ? socketRef.current.id : "" }
        allUsers={allUsers}
        joinRoom={joinRoom}
        connectedRooms={connectedRooms}
        currentChat={currentChat}
        toggleChat={toggleChat}
        messages={messages[currentChat.chatName]}
      />
    );
  } else {
    body = (
      <Form username={username} onChange={handleChange} connect={connect} />
    );
  }

  return (
    <div className="App">
      <Signup />
      <Logout doLogout={doLogout} />

    <Router>
      <Switch>

        <Route path="/public" exact>
          <Public />
        </Route>
        <Route path="/private" exact>
          <Private />
        </Route>
        <Route path="/projects" exact>
          <Projects />
        </Route>
        <Route path="/chat" exact>
          {body}
        </Route>
        <Route path="/form" exact>
          {body}

        </Route>

      </Switch>

  </Router>
  </div>
);
}

export default App;
