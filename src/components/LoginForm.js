import React, { useState } from 'react';
import { login } from '../services/AuthenticationService';

const LoginForm = ({ navigate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login(username, password);
            if (token) {
                navigate('/startpage'); // Navigera när inloggningen lyckas
            } else {
                alert('Sign in failed. Check username or password.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed due to a server issue.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        autoComplete="username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit" className="btn btn-info">
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
