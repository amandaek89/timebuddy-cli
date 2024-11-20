import React, {useEffect} from 'react';
import HeaderAuthenticated from '../components/HeaderAuthenticated';
import {isAuthenticated} from "../services/AuthenticationService";
import {Navigate} from "react-router-dom";
import '../css/Media-queries.css';


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
                <div className="start-page-content">
                    <h1>Välkommen till startsidan</h1>
                </div>
            </div>
        </div>
    );
}
export default StartPage;

