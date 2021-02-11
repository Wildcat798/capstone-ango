import React, { useState } from "react";
import { Link, BrowserRouter, useHistory } from "react-router-dom";
import axios from "axios";

function SignUp(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");

    let history = useHistory();

    const processSignUp = async (e) => {
        e.preventDefault();
        const newUser = {
            username,
            password,
            country,
            email,
        };
        const resp = await axios.post("/api/user/signup", newUser);

        console.log(resp);

        history.push("/login");
    };

    return (
    <main className="">
        <form onSubmit={processSignUp}>
        <h1 className="">Sign Up Here</h1>
        <label className="">
            {" "}
            Username
            <input
            type="text"
            value={username}
            className=""
            name="username"
            placeholder="Username"
            onChange={(e) => {
                setUsername(e.target.value);
            }}
            required
            autoFocus
            />
        </label>
<br></br>
        <label className="">
            Password
            <input
            type="password"
            value={password}
            className=""
            name="password"
            placeholder="Password"
            onChange={(e) => {
                setPassword(e.target.value);
            }}
            required
            />
        </label>
<br></br>
        <label className="">
            {" "}
            Country
            <input
            type="text"
            value={country}
            className=""
            name="country"
            placeholder="Country"
            onChange={(e) => {
                setCountry(e.target.value);
            }}
            required
            />
        </label>
<br></br>
        <label className="">
            Email Address
            <input
            type="text"
            value={email}
            className=""
            name="email"
            placeholder="Email address"
            onChange={(e) => {
                setEmail(e.target.value);
            }}
            required
            />
        </label>
<br></br>
        <input className="" type="submit" value="Submit" />
        </form>
<br></br>
        <BrowserRouter>
            <Link to="/login">
                <button className="">Log In</button>
            </Link>
        </BrowserRouter>
        <p class="">&copy; 2021</p>
    </main>
    );
}

export default SignUp;