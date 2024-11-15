import React, { useState } from 'react';
import { register } from '../services/AuthenticationService';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username);
        const success = await register(username, password);
        if (success) {
            console.log('User registered');
            alert('User registered. Log in to continue')
        } else {
            alert('Registration failed. ')
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label form="username">Username</label>
                    <input type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        id="email"
                        placeholder="Enter username"></input>
                </div>
                <div className="form-group">
                    <label form="pwd">Password:</label>
                    <input type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className="form-control"
                        id="pwd"
                        placeholder="Enter password"></input>
                </div>
                <div className="checkbox">
                </div>
                <button type="submit" className="btn btn-info">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
