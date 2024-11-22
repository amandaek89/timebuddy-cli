import React, { useState } from 'react';
import { addTodo } from '../services/TodoService';
import '../css/Modal.css';

const AddTodoModal = ({ selectedDate, onClose, onTodoAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');

    // Kontrollera att selectedDate är korrekt när modalen öppnas
    console.log("Date from calendar: ", selectedDate);

    const handleSubmit = async () => {
        if(!selectedDate) {
            console.error("No date selected");
            return;
        }

        const todoRequest = {
            title,
            description,
            time: time || null,
        };

        try {
            const newTodo = await addTodo(selectedDate, todoRequest);
            console.log('Added todo:', newTodo);
            onTodoAdded(newTodo);
            onClose();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Lägg till ny händelse</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-row">
                        <label htmlFor="title">Titel:</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="description">Beskrivning:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-row">
                        <label htmlFor="time">Tid:</label>
                        <input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="button" onClick={handleSubmit}>
                            Lägg till
                        </button>
                        <button type="button" onClick={onClose}>
                            Avbryt
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTodoModal;
