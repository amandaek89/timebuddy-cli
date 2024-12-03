import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importera useNavigate för omdirigering
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { login } from '../services/AuthenticationService'; // Importera login-funktionen
import '../css/Media-queries.css';

const HomePage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate(); // Skapa en navigeringsfunktion

    const handleLoginClick = () => {
        setIsVisible(true);
        setIsLogin(true);
    };

    const handleRegisterClick = () => {
        setIsVisible(true);
        setIsLogin(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            // Hämta användarnamn och lösenord från formuläret
            const username = e.target.username.value; // Använd dessa fält från LoginForm-komponenten
            const password = e.target.password.value;

            // Anropa login-funktionen från authService
            const isLoggedIn = await login(username, password);

            if (isLoggedIn) {
                navigate('/startpage'); // Navigera till StartPage när inloggningen lyckas
            } else {
                alert('Login failed, please try again.');
            }
        } else {
            // Om användaren registrerar sig, kan du anropa register-funktionen här
            navigate('/'); // Navigera till startsidan eller en annan sida vid registrering
        }
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <header style={styles.navbar}>
                <button style={styles.navButton} onClick={handleLoginClick}>
                    Login
                </button>
                <button style={styles.navButton} onClick={handleRegisterClick}>
                    Register
                </button>
            </header>

            {/* Main Content */}
            <main style={styles.mainContent}>
                <h1 style={styles.title}>TimeBuddy</h1>
                <h2 style={styles.subtitle}>För ett strukturerat liv</h2>

                {/* Form Card */}
                {isVisible && (
                    <div style={styles.card}>
                        <h2>{isLogin ? 'Logga in' : 'Registrera'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            {isLogin ? <LoginForm /> : <RegisterForm />}
                            <button type="submit" style={styles.submitButton}>
                                {isLogin ? 'Logga in' : 'Registrera'}
                            </button>
                        </form>
                        <button
                            style={styles.toggleButton}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin
                                ? "Har du inget konto? Registrera dig"
                                : "Har du redan ett konto? Logga in"}
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
        backgroundColor: '#a4a0a0',
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
        color: '#897f93',
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
    submitButton: {
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
};
