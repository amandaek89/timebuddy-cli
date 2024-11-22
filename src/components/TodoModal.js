import React from "react";
import "../css/Modal.css"; // CSS för styling av modalen

const TodoModal = ({ event, onClose }) => {
    // Hantera om inget event skickas
    if (!event) return null;

    // Extract event properties with safe fallback values
    const { title = "Okänt", description = "Ingen beskrivning", start, allDay = false, done = false } = event;

    // Skapa en "start"-datum från date och time, om det finns ett time
    const startDate = start ? new Date(start) : null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>

                <p><strong>Beskrivning:</strong> {description}</p>

                {start && (
                    <>
                        <p><strong>Datum:</strong> {new Date(start).toLocaleDateString("sv-SE")}</p>
                        <p>
                            <strong>Tid:</strong>{" "}
                            {allDay ? "Hela dagen" : new Date(start).toLocaleTimeString("sv-SE")}
                        </p>
                    </>
                )}

                <p><strong>Status:</strong> {done ? "Klar" : "Inte klar"}</p>

                <div className="modal-buttons">
                    <button onClick={onClose} className="close-button">Stäng</button>
                </div>
            </div>
        </div>
    );
};

export default TodoModal;


