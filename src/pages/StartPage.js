import React, {useEffect} from 'react';
import HeaderAuthenticated from '../components/HeaderAuthenticated';
import {isAuthenticated} from "../services/AuthenticationService";
import {Navigate} from "react-router-dom";


const StartPage = () => {
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
        <div className="start-page">
            {/* Navbar */}
            <HeaderAuthenticated />

            {/* Profilinnehåll */}
            <div className={"main-content"}>
                <h2 className="start-title">Välkommen till startsidan</h2>
            </div>
        </div>
    );
}
export default StartPage;

