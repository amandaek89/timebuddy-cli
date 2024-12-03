import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StartPage from './pages/StartPage';
import ProfilePage from './pages/ProfilePage';
import { isAuthenticated } from './services/AuthenticationService';
import { TodosProvider } from './context/TodosContext';  // Importera TodosProvider

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuthStatus = () => {
            // Kontrollera om användaren är autentiserad
            const authStatus = isAuthenticated();
            setIsAuth(authStatus);
        };

        checkAuthStatus(); // Kolla autentiseringstatus vid inläsning

        // Om användaren precis har loggat in, omdirigera till StartPage
        if (isAuth) {
            <Navigate to="/startpage" />
        }
    }, [isAuth]); // Uppdatera statusen när den ändras

    return (
        <TodosProvider>  {/* Flytta TodosProvider här för att omge hela Router */}
            <Router>
                <Routes>
                    {/* Hem-sidan (för inloggning och registrering), tillgänglig för alla */}
                    <Route path="/" element={!isAuth ? <HomePage /> : <Navigate to="/startpage" />} />

                    {/* Start-sidan, tillgänglig endast om användaren är autentiserad */}
                    <Route path="/startpage" element={isAuth ? <StartPage /> : <Navigate to="/" />} />

                    {/* Profil-sidan, tillgänglig endast om användaren är autentiserad */}
                    <Route path="/profilepage" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />

                    {/* Fångar alla andra vägar, och omdirigerar till HomePage om användaren inte är autentiserad */}
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </TodosProvider>
    );
}

export default App;
