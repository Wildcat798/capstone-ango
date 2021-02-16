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
} from "react-router-dom";
// to connect to public blog
import Home from "./Components/Home";
import About from "./Components/About";
import SinglePost from "./Components/SinglePost";
import Post from "./Components/Post";
import Project from "./Components/Project";
import NavBar from "./Components/NavBar";

// to connect to backend
import axios from "axios";
import Signup from "./Components/Signup";
import LoginPage from "./Components/LoginPage";
import LocalStorage from "./Components/Hooks/LocalStorage";
import Dashboard from "./Components/Dashboard";
import { ContactsProvider } from "./Components/Context/ContactsProvider";
import { ConversationsProvider } from "./Components/Context/ConversationsProvider";
import { SocketProvider } from "./Components/Context/SocketProvider";

function App() {

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
      <Signup />

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
        <LoginPage idSubmit={setId} />
        </Route>
        {/* <Route path="/form" exact>
          {body}
        </Route> */}
        <Route path="/dash" exact>
            {dashboard}
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
}

export default App;
