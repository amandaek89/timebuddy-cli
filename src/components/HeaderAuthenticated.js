import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import Logout from './Logout';
import ProfileModal from './ProfileModal'; // Importera ProfileModal
import '../css/HeaderAuthenticated.css';

function HeaderAuthenticated() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Funktion för att öppna modal
    const openProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    // Funktion för att stänga modal
    const closeProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    return (
        <header>
            <div className="navbar">
                <div className="navbar-container">
                    {/* Länkar i mitten med ikoner */}
                    <div className="nav-links">
                        <Link to="/hem" className="nav-link">
                            <FontAwesomeIcon icon={faHome} size="lg" />
                        </Link>
                        <Link to="/kalender" className="nav-link">
                            <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
                        </Link>

                        {/* Profilikon för att öppna modal */}
                        <button
                            className="profile-button"
                            onClick={openProfileModal}
                            aria-label="Öppna profil"
                        >
                            <FontAwesomeIcon icon={faUser} size="lg" />
                        </button>
                    </div>

                    {/* Logout-knapp i högra hörnet med text */}
                    <div className="logout-container">
                        <Logout />
                    </div>
                </div>
            </div>

            {/* Profilmodal */}
            <ProfileModal isOpen={isProfileModalOpen} onClose={closeProfileModal} />
        </header>
    );
}

export default HeaderAuthenticated;
