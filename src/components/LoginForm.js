import React, { useState } from 'react';
import { login } from '../services/AuthenticationService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            // small delay to make sure token is saved
            setTimeout(() => {
                navigate('/startsida');
                console.log('Signed in');
            }, 100);
        } else {
            alert('Sign in failed')
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
                        type="username"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        autoComplete={"username"}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="pwd"
                        placeholder="Enter password"
                        autoComplete={"current-password"}
                    />
                </div>
                <div className="checkbox">

                </div>
                <button type="submit" className="btn btn-info">Sign in</button>
            </form>
        </div>

    );
};

export default LoginForm;