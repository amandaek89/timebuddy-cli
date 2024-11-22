import React from 'react';
import '../css/Modal.css'; // Din CSS för styling av modalen

const TodoDetailModal = ({ todo, onClose }) => {
    if (!todo) return null; // Om inget todo skickas, visa inte modalen

    const { title, description, time, done } = todo;
    const formattedTime = time ? new Date(`1970-01-01T${time}:00`).toLocaleTimeString("sv-SE", { hour: '2-digit', minute: '2-digit' }) : "Ingen tid satt";
    const status = done ? "Klar" : "Inte klar";

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p><strong>Beskrivning:</strong> {description}</p>
                <p><strong>Tid:</strong> {formattedTime}</p>
                <p><strong>Status:</strong> {status}</p>

                <div className="modal-buttons">
                    <button onClick={onClose}>Stäng</button>
                </div>
            </div>
        </div>
    );
};

export default TodoDetailModal;
