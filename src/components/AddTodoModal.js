import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Stängningsikon
import {addTodo} from "../services/TodoService";
import "../css/ModalForm.css";
import "../css/TodoModal.css";

const AddTodoModal = ({ selectedDate, onClose, onTodoAdded }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedDate) {
            console.error("No date selected");
            return;
        }

        const todoRequest = {
            title,
            description,
            time: time || null,
        };

        setIsSaving(true);
        try {
            const newTodo = await addTodo(selectedDate, todoRequest);
            onTodoAdded(newTodo);
            onClose();
        } catch (error) {
            console.error("Error adding todo:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Header */}
                <div className="modal-header">
                    <h2 className="modal-title">Lägg till ny händelse</h2>
                    <button
                        className="icon-button close-button-add"
                        onClick={onClose}
                        aria-label="Stäng"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
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
                            {isSaving ? "Sparar..." : "Lägg till"}
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

export default AddTodoModal;

