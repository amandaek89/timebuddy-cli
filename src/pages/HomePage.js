import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import '../css/Media-queries.css';
import '../css/HomePage.css';

const HomePage = () => {
    const [isLogin, setIsLogin] = useState(true); // Bestämmer om vi ska visa login eller register
    const [isVisible, setIsVisible] = useState(false); // Hanterar om modalen ska vara synlig
    const navigate = useNavigate();

    // Funktion för att visa loginformuläret
    const handleLoginClick = () => {
        setIsVisible(true);
        setIsLogin(true);
    };

    // Funktion för att visa registreringsformuläret
    const handleRegisterClick = () => {
        setIsVisible(true);
        setIsLogin(false);
    };

    // Funktion för att stänga modalen
    const handleCloseModal = () => {
        setIsVisible(false);
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
                <h1 className="title">Structivo</h1>
                <h2 className="subtitle">För ett strukturerat liv</h2>

                {/* Form Card - Visa form enligt isVisible */}
                {isVisible && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{isLogin ? 'Logga in' : 'Registrera'}</h2>
                            {isLogin ? (
                                <LoginForm navigate={navigate} onClose={handleCloseModal} />
                            ) : (
                                <RegisterForm onClose={handleCloseModal} />
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
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomePage;
