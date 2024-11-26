import React from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa"; // Ikoner
import "../css/TodoModal.css";

const TodoModal = ({ todo, onClose, onEdit, onDelete }) => {
    if (!todo) return null; // Rendera inget om det inte finns någon todo

    const handleDeleteClick = () => {
        if (window.confirm("Är du säker på att du vill ta bort den här uppgiften?")) {
            onDelete(todo.id); // Anropa onDelete med todo ID
            onClose(); // Stäng modal efter borttagning
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Detaljer</h2>
                    <div className="icon-buttons">
                        <button
                            className="icon-button"
                            onClick={() => {
                                onEdit(todo);
                                onClose();
                            }}
                            aria-label="Redigera"
                        >
                            <FaEdit />
                        </button>
                        <button
                            className="icon-button"
                            onClick={handleDeleteClick}
                            aria-label="Ta bort"
                        >
                            <FaTrash />
                        </button>
                        <button
                            className="icon-button close-button"
                            onClick={onClose}
                            aria-label="Stäng"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
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
