import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <button onClick={handleClick} style={styles.logoutButton} type="button">
            <strong>Logga ut</strong>
        </button>
    );
}

const styles = {
    logoutButton: {
        backgroundColor: 'transparent', // Ingen bakgrund
        color: '#F5F5DC', // Beige färg
        fontSize: '18px',
        fontWeight: 'bold',
        border: 'none', // Ingen kantlinje
        padding: '0', // Ingen padding runt texten
        cursor: 'pointer', // Pekarens form som visar att det är en knapp
        textDecoration: 'none', // Ingen textdekoration (understrykning eller liknande)
    },
};

export default Logout;
