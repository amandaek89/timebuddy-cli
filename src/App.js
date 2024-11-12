import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StartPage from './pages/StartPage';
import { isAuthenticated } from './services/AuthenticationService';

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(isAuthenticated()); // Kontrollera om användaren är autentiserad
    }, []);

    let routes;

    if (isAuth) {
        routes = (
            <Fragment>
                <Route path="/" element={<HomePage />} />
                <Route path="/startPage" element={<StartPage />} />
                <Route path="/*" element={<Navigate to="/startPage" />} />
            </Fragment>
        );
    } else {
        routes = (
            <Fragment>
                <Route path="/" element={<HomePage />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Fragment>
        );
    }

    return (
        <Router>
            <Routes>
                {routes}
            </Routes>
        </Router>
    );
}

export default App;

