import React, { useEffect } from 'react';
import CalendarContainer from '../components/CalendarContainer'; // Om du har en components-mapp
import HeaderAuthenticated from "../components/HeaderAuthenticated";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/AuthenticationService";
import '../css/ProfilePage.css';

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
        <div className="profile-page">
            {/* Navbar */}
            <HeaderAuthenticated />

            {/* Profilinnehåll */}
            <div className={"main-content"}>
                <CalendarContainer />
            </div>
        </div>
    );
};

export default ProfilePage;
