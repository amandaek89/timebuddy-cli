import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import '../css/HeaderAuthenticated.css';

function HeaderAuthenticated() {
    return (
        <header>
            <div className="navbar">
                <div className="navbar-container">
                    {/* Länkar i mitten */}
                    <div className="nav-links">
                        <Link to="/startpage" className="nav-link">
                            <strong>Startsida</strong>
                        </Link>
                        <Link to="/profilepage" className="nav-link">
                            <strong>Min profil</strong>
                        </Link>
                    </div>

                    {/* Logout-knapp i högra hörnet */}
                    <div className="logout-container">
                        <Logout />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderAuthenticated;
