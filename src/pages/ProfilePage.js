import React, { useState, useEffect } from 'react';
import CalendarContainer from '../components/CalendarContainer';
import HeaderAuthenticated from "../components/HeaderAuthenticated";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/AuthenticationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from '../components/ProfileModal';  // Importera ProfileModal-komponenten
import '../css/ProfilePage.css';

const ProfilePage = () => {
    const isAuth = isAuthenticated();  // Kontrollera autentisering
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

    const username = localStorage.getItem('username');

    useEffect(() => {
        if (!isAuth) {
            console.log('User is not authenticated, redirecting to Homepage');
        }
    }, [isAuth]);

    if (!isAuth) {
        // Om inte autentiserad, omdirigera till HomePage
        return <Navigate to="/" />;
    }

    // Funktioner för att öppna och stänga modalen
    const openPasswordModal = () => setIsPasswordModalVisible(true);
    const closePasswordModal = () => setIsPasswordModalVisible(false);

    return (
        <div className="profile-page">
            {/* Navbar */}
            <HeaderAuthenticated />

            {/* Profilknappen */}
            <button
                className="profile-button"
                onClick={openPasswordModal}
                aria-label="Byt lösenord"
            >
                <FontAwesomeIcon icon={faUser} size="2x" />
            </button>

            {/* Huvudinnehåll */}
            <div className={"main-content"}>
                <CalendarContainer />
            </div>

            {/* Modal för lösenordsändring */}
            <ProfileModal
                isOpen={isPasswordModalVisible}
                onClose={closePasswordModal}
            />
        </div>
    );
};

export default ProfilePage;
