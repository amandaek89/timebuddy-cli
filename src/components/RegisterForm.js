import React, { useState } from 'react';
import { register } from '../services/AuthenticationService';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await register(username, password);
            if (success) {
                alert('User registered. Please log in.');
            } else {
                alert('Registration failed.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed due to a server issue.');
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
                    />
                </div>
                <button type="submit" className="btn btn-info">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
