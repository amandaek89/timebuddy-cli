import React, { useEffect } from 'react';
import CalendarContainer from '../components/CalendarContainer'; // Om du har en components-mapp
import HeaderAuthenticated from "../components/HeaderAuthenticated";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/AuthenticationService";

const ProfilePage = () => {
    const isAuth = isAuthenticated();  // Kontrollera autentisering

    useEffect(() => {
        if (!isAuth) {
            console.log('User is not authenticated, redirecting to Homepage');
        }
    }, [isAuth]);

    if (!isAuth) {
        // Om inte autentiserad, omdirigera till HomePage
        return <Navigate to="/" />;
    }

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <HeaderAuthenticated />

            {/* Profilinnehåll */}
            <div style={styles.mainContent}>
                <h2 style={styles.title}>Välkommen till din profil</h2>
                <CalendarContainer />
            </div>
        </div>
    );
};

// Stilar för komponenten
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f9f9f9', // Lätt bakgrundsfärg för hela sidan
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
        padding: '20px',
        overflowY: 'auto',
    }
};
export default ProfilePage;
