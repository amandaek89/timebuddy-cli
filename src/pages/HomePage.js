import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import '../css/Media-queries.css';
import '../css/HomePage.css';

const HomePage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        setIsVisible(true);
        setIsLogin(true);
    };

    const handleRegisterClick = () => {
        setIsVisible(true);
        setIsLogin(false);
    };

    return (
        <div className="container">
            {/* Navbar */}
            <header className="navbar">
                <button className="navButton" onClick={handleLoginClick}>
                    Login
                </button>
                <button className="navButton" onClick={handleRegisterClick}>
                    Register
                </button>
            </header>

            {/* Main Content */}
            <main className="mainContent">
                <h1 className="title">TimeBuddy</h1>
                <h2 className="subtitle">För ett strukturerat liv</h2>

                {/* Form Card */}
                {isVisible && (
                    <div className="card">
                        <h2>{isLogin ? 'Logga in' : 'Registrera'}</h2>
                        {isLogin ? (
                            <LoginForm navigate={navigate} />
                        ) : (
                            <RegisterForm />
                        )}
                        <button
                            className="toggleButton"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin
                                ? 'Har du inget konto? Registrera dig'
                                : 'Har du redan ett konto? Logga in'}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomePage;
