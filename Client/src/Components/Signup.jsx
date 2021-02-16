import React, { useState } from "react";
import axios from "axios";
function Signup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.post("/api/user/signup", {
      username,
      password,
      country,
      email,
    });
    console.log(resp);
    setMessage("");
  };
  return (
    <section className="container">
      <h1>Sign Up</h1>
      {message && <h2>{message}</h2>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="signup-label" for="username-input">
            Username:{" "}
          </label>
          <input
            className="form-control"
            value={username}
            id="username-input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <label className="signup-label" for="password-input">
          {" "}
          Password:{" "}
        </label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label className="signup-label" for="country-input">
          Country:
        </label>
        <input
          className="form-control"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />
        <label className="signup-label" for="email-input">
          Email:{" "}
        </label>
        <input
          className="form-control"
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input className="btn-primary signup-btn" type="submit" />
      </form>
    </section>
  );
}
export default Signup;