import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

function HeaderAuthenticated() {
    return (
        <header>
            {/* Grön navbar */}
            <div className="navbar navbar-dark" style={styles.navbar}>
                <div className="container" style={styles.navbarContainer}>
                    {/* Länkar i mitten */}
                    <div style={styles.navLinks}>
                        <Link to="/startpage" style={styles.navLink}>
                            <strong>Startsida</strong>
                        </Link>
                        <Link to="/profilepage" style={styles.navLink}>
                            <strong>Min profil</strong>
                        </Link>
                    </div>

                    {/* Logout-knapp i högra hörnet */}
                    <div style={styles.logoutContainer}>
                        <Logout />
                    </div>
                </div>
            </div>
        </header>
    );
}

const styles = {
    navbar: {
        backgroundColor: '#426e5f', // Grön bakgrund
        padding: '10px 20px', // Padding för att ge navbaren utrymme
    },
    navbarContainer: {
        display: 'flex',
        justifyContent: 'space-between', // Placera länkarna till vänster och logout-knappen till höger
        alignItems: 'center',
        width: '100%',
    },
    navLinks: {
        display: 'flex',
        justifyContent: 'center', // Centra länkarna horisontellt
        alignItems: 'center',
        gap: '20px', // Lägger till mellanrum mellan länkarna
    },
    navLink: {
        textDecoration: 'none', // Ta bort understrykning
        color: '#F5F5DC', // Beige färg
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '5px 10px',
        transition: 'color 0.3s', // Lägg till en liten övergång
    },
    logoutContainer: {
        display: 'flex',
        justifyContent: 'flex-end', // Placera logout-knappen till höger
        alignItems: 'center',
    },
};

export default HeaderAuthenticated;
