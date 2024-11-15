import React from 'react';
import HeaderAuthenticated from '../components/HeaderAuthenticated';

const StartPage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.headerWrapper}>
                <HeaderAuthenticated />
            </div>
            {/* Eventuella andra komponenter som listas här */}
        </div>
    );
};

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
}

export default StartPage;

