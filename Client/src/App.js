import React, {useState, useRef, useEffect } from 'react';
import Form from "./Components/UsernameForm";
import Chat from "./Components/Chat";
import io from "socket.io-client";
import immer from "immer";
import "./App.css";
import "./WebPages.js";
import Public from "./Components/Public"
import Private from "./Components/Private"
import Projects from "./Components/Projects"
import { 
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom';

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

  return (
    <div className="App">

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
