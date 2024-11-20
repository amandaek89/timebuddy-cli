import React, { useState } from 'react';

const TodoModal = ({ todos, selectedDate, onClose, onUpdate, onDelete, onAdd }) => {
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            onAdd(newTodo);
            setNewTodo('');
        } else {
            alert('Todo cannot be empty');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Todos for {selectedDate}</h2>
                <ul>
                    {todos.length === 0 ? (
                        <li>No todos for this date</li>
                    ) : (
                        todos.map(todo => (
                            <li key={todo.id}>
                                <span
                                    style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}
                                    onClick={() => onUpdate(todo)} // Update todo when clicked
                                >
                                    {todo.title}
                                </span>
                                <button onClick={() => onDelete(todo.id)}>Delete</button>
                            </li>
                        ))
                    )}
                </ul>

                {/* Add new todo */}
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new todo"
                />
                <button onClick={handleAddTodo}>Add Todo</button>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default TodoModal;

