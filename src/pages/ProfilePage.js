import React from 'react';
import CalendarContainer from '../components/CalendarContainer';
import HeaderAuthenticated from "../components/HeaderAuthenticated";
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
