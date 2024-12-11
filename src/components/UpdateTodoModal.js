import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Stängningsikon
import "../css/TodoModal.css";
import "../css/ModalForm.css";
const UpdateTodoModal = ({ todo, onClose, onUpdate }) => {
    const [title, setTitle] = useState(todo.title || "");
    const [description, setDescription] = useState(todo.description || "");
    const [time, setTime] = useState(todo.time || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const updatedTodo = { ...todo, title, description, time };

        try {
            await onUpdate(todo.id, updatedTodo);
        } catch (error) {
            console.error("Error updating todo:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Modal header */}
                <div className="modal-header">
                    <h2 className="modal-title">Redigera Todo</h2>
                    <button
                        className="icon-button close-button-update"
                        onClick={onClose}
                        aria-label="Stäng"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSave} className="modal-form">
                    <label>
                        <span className="form-label">Titel</span>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <span className="form-label">Beskrivning</span>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        <span className="form-label">Tid</span>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </label>
                    <div className="modal-buttons">
                        <button
                            type="submit"
                            className="action-button save-button"
                            disabled={isSaving}
                        >
                            {isSaving ? "Sparar..." : "Spara"}
                        </button>
                        <button
                            type="button"
                            className="action-button cancel-button"
                            onClick={onClose}
                            disabled={isSaving}
                        >
                            Avbryt
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTodoModal;
