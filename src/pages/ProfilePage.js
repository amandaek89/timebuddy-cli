import React, { useState, useEffect } from 'react';
import CalendarContainer from '../components/CalendarContainer';
import HeaderAuthenticated from "../components/HeaderAuthenticated";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/AuthenticationService";
import '../css/ProfilePage.css';

const ProfilePage = () => {

    return (
        <div className="profile-page">
            {/* Navbar */}
            <HeaderAuthenticated />

            {/* Huvudinnehåll */}
            <div className={"main-content"}>
                <CalendarContainer />
            </div>

        </div>
    );
};

export default ProfilePage;
