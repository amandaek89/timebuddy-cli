import React from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa"; // Ikoner
import "../css/TodoModal.css"; // Se till att din CSS-fil är korrekt länkad

const TodoModal = ({ todo, onClose, onEdit, onDelete }) => {
    // Returnera ingenting om ingen todo finns
    if (!todo) return null;

    // Hanterar borttagning av todo
    const handleDeleteClick = () => {
        if (window.confirm("Är du säker på att du vill ta bort den här uppgiften?")) {
            onDelete(todo.id); // Ta bort uppgiften med dess ID
            onClose(); // Stäng modalen efter borttagning
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Header med titel och ikoner */}
                <div className="modal-header">
                    <h2 className="modal-title">Detaljer</h2>
                    <div className="icon-buttons">
                        {/* Redigera-knapp */}
                        <button
                            className="icon-button"
                            onClick={() => {
                                onEdit(todo); // Skicka todo för redigering
                                onClose(); // Stäng modal
                            }}
                            aria-label="Redigera"
                        >
                            <FaEdit />
                        </button>
                        {/* Ta bort-knapp */}
                        <button
                            className="icon-button"
                            onClick={handleDeleteClick}
                            aria-label="Ta bort"
                        >
                            <FaTrash />
                        </button>
                        {/* Stäng-knapp */}
                        <button
                            className="icon-button close-button"
                            onClick={onClose} // Stäng modal
                            aria-label="Stäng"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
                {/* Detaljer om todo */}
                <div className="todo-details">
                    <p>
                        <strong>Titel:</strong> {todo.title}
                    </p>
                    <p>
                        <strong>Beskrivning:</strong> {todo.description || "Ingen beskrivning"}
                    </p>
                    <p>
                        <strong>Datum:</strong> {todo.date}
                        {todo.time && (
                            <>
                                {" "} | <strong>Tid:</strong> {todo.time}
                            </>
                        )}
                    </p>
                    <p>
                        <strong>Heldag:</strong> {todo.allDay ? "Ja" : "Nej"}
                    </p>
                    <p>
                        <strong>Klar:</strong> {todo.done ? "Ja" : "Nej"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TodoModal;

