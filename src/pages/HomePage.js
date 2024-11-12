import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const HomePage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    const handleLoginClick = () => {
        setIsVisible(true);
        setIsLogin(true);
    };

    const handleRegisterClick = () => {
        setIsVisible(true);
        setIsLogin(false);
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <header style={styles.navbar}>
                <button
                    style={styles.navButton}
                    onClick={handleLoginClick}>
                    Login
                </button>
                <button
                    style={styles.navButton}
                    onClick={handleRegisterClick}>
                    Register
                </button>
            </header>

            {/* Main Content */}
            <main style={styles.mainContent}>
                <h1 style={styles.title}>TimeBuddy</h1>
                <h2 style={styles.subtitle}>For a structured life</h2>

                {/* Form Card */}
                {isVisible && (
                    <div style={styles.card}>
                        <h3>{isLogin ? 'Sign In' : 'Register'}</h3>
                        {isLogin ? <LoginForm /> : <RegisterForm />}
                        <button
                            style={styles.toggleButton}
                            onClick={() => setIsLogin(!isLogin)}>
                            {isLogin
                                ? "Don't have an account? Register"
                                : "Already have an account? Sign In"}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomePage;

// Stilar för komponenten
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    navbar: {
        backgroundColor: '#426e5f',
        color: '#F5F5DC',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navButton: {
        backgroundColor: 'transparent',
        color: '#F5F5DC',
        border: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        padding: '10px 20px',
        margin: '0 10px',
        textDecoration: 'none',
        transition: 'color 0.3s',
    },
    navButtonHover: {
        color: '#ffffff',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#426e5f',
    },
    card: {
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        padding: '30px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        marginTop: '20px',
    },
    title: {
        marginBottom: '20px',
        fontSize: '32px',
        fontWeight: 'bold',
    },
    subtitle: {
        marginBottom: '40px',
        fontSize: '20px',
        fontWeight: 'normal',
        color: '#6c757d',
    },
    toggleButton: {
        backgroundColor: '#426e5f',
        color: '#F5F5DC',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s',
    },
    toggleButtonHover: {
        backgroundColor: '#375349',
    },
};

