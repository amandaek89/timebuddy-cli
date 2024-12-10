import React, { useState, useEffect } from 'react';
import '../css/StartPage.css';
import DayView from "../components/DayView"; // Importera DayView
import HeaderAuthenticated from "../components/HeaderAuthenticated"; // Importera HeaderAuthenticated

const StartPage = () => {
    const [currentTime, setCurrentTime] = useState(new Date()); // För att hålla koll på den aktuella tiden
    const [weekNumber, setWeekNumber] = useState(0); // För att hålla koll på aktuell vecka
    const [selectedDate, setSelectedDate] = useState('2024-11-22'); // Exempel på datum (kan hämtas från FullCalendar eller annan komponent)

    // Uppdatera klockan varje sekund
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Hämta aktuell vecka
        const getWeekNumber = () => {
            const startDate = new Date(currentTime.getFullYear(), 0, 1);
            const days = Math.floor((currentTime - startDate) / (24 * 60 * 60 * 1000));
            const week = Math.ceil((days + 1) / 7);
            setWeekNumber(week);
        };

        // Uppdatera vecka varje gång tiden ändras
        getWeekNumber();

        return () => clearInterval(timer); // Rensa intervallet när komponenten unmountas
    }, [currentTime]);

    // Formatera datum och tid
    const formattedDate = currentTime.toLocaleDateString('sv-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = currentTime.toLocaleTimeString('sv-SE');

    return (
        <div className="start-page">
            {/* Header */}
            <HeaderAuthenticated /> {/* Lägg till headern överst */}

            <div className="content">
                <div className="left-panel">
                    <div className="clock">
                        <p>{formattedTime}</p>
                    </div>
                    <div className="date-info">
                        <p className="date">{formattedDate}</p> {/* Datum */}
                    </div>
                    <div className="week-number">
                        <p>Vecka: {weekNumber}</p> {/* Veckonummer */}
                    </div>
                </div>

                <div className="right-panel">
                    <DayView selectedDate={selectedDate}/> {/* Skicka valfritt datum till DayView */}
                </div>
            </div>
        </div>
    );
};

export default StartPage;
