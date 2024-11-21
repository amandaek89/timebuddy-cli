import React, {useEffect} from 'react';
import HeaderAuthenticated from '../components/HeaderAuthenticated';
import '../css/Media-queries.css';

const StartPage = () => {
    useEffect(() => {
        document.title = "Startsida";
    }, []);

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

