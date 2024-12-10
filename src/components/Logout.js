import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../css/Logout.css'; // Importera CSS-fil

function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.removeItem('token');
        navigate('/'); // Omdirigera användaren till home page
    };

    return (
        <button onClick={handleClick} className="logout-button" type="button">
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            <span>Logga ut</span>
        </button>
    );
}

export default Logout;
