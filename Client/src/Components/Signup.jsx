import React, { useState } from 'react';
import axios from 'axios';

function Signup(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');

    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();    
        const resp = await axios.post('/api/user/signup', {
        username,
        password,
        country,
        email
        });
        console.log(resp);

            setMessage('');
    };

return (
    <section>
        <h1>Sign Up</h1>
        
        { message && <h2>{message}</h2>}
        
        <form onSubmit={onSubmit}>
            <label>
                Username:
                <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />    
            </label>
            <br />
            <label>
                Country:
                <input
                value={country}
                onChange={e => setCountry(e.target.value)}
                />    
            </label>
            <br />
            <label>
                Email:
                <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />    
            </label>
            <br />
            <input type="submit" />
        </form>
    </section>
    );
}

export default Signup;