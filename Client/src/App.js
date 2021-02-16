import React, {useState, useRef, useEffect } from 'react';
import Form from "./Components/UsernameForm";
import Chat from "./Components/Chat";
import io from "socket.io-client";
import immer from "immer";
import "./App.css";
// import "./WebPages.js";
import Public from "./Components/Public"
import Private from "./Components/Private"
import Projects from "./Components/Projects"
import { 
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom';
<<<<<<< HEAD
// to connect to public blog
import Home from "./Components/Home";
import About from "./Components/About";
import SinglePost from "./Components/SinglePost";
import Post from "./Components/Post";
import Project from "./Components/Project";
import NavBar from "./Components/NavBar";

// to connect to backend
import axios from 'axios';
=======
import Home from './Components/Home';
import SignUp from './Components/Signup'
>>>>>>> master
import Login from './Components/Login';
import LoginPage from './Components/LoginPage';
import LocalStorage from './Components/Hooks/LocalStorage'
import Dashboard from './Components/Dashboard';
import { ContactsProvider } from './Components/Context/ContactsProvider'
import { ConversationsProvider } from './Components/Context/ConversationsProvider'
import { SocketProvider } from './Components/Context/SocketProvider'

// -------------------------------------------------------------
// Art Chat Stuff START
// -------------------------------------------------------------

const initialMessagesState = {
  general: [],
  lawmakers: [],
  judges: [],
  lawyers: [],
  professors: [],
  students: []
};

function App() {
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
// -------------------------------------------------------------
// Art Chat Stuff END
// -------------------------------------------------------------

  const [id, setId] = LocalStorage('id')
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
  
    // id ? dashboard : <LoginPage idSubmit={setId}/>

    <div className="App">
<<<<<<< HEAD
      <Signup />
      <Logout doLogout={doLogout} />

      <Router>
      <NavBar/>
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

        <Route component={Home} path='/' exact />
        <Route component={About} path='/about' />
        <Route component={SinglePost} path='/post/:slug' />
        <Route component={Post} path='/post' />
        <Route component={Project} path='/project' />

        </Switch>
      </Router>
    </div>
  );
=======
      

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
            <LoginPage idSubmit={setId} />
          </Route>
          <Route path="/dash" exact>
            {dashboard}
          </Route>

        </Switch>

      </Router>
    </div>
);
>>>>>>> master
}

export default App;
