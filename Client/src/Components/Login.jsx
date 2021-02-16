import { BrowserRouter, Link, Redirect, useHistory } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/api/user/login", {
        username,
        password,
      });
      console.log(resp);
      props.doLogin();
      setMessage("");
    } catch (e) {
      setMessage("Invalid username and password");
    }
  };
  return (
    <section className="container">
      <h1>Login</h1>
      {message && <h2>{message}</h2>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="login-label" for="username-input">
            Username: {""}
            <input
              className="form-control"
              value={username}
              id="username-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <input className="btn-primary signup-btn" type="submit" />
        </div>
      </form>
    </section>
  );
};
export default Login;