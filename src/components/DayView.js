import React, { useState, useEffect } from 'react';
import { getTodosForDate, markTodoAsDone } from '../services/TodoService'; // Hämta och uppdatera todos
import TodoDetailModal from './TodoDetailModal'; // Importera TodoDetailModal
import '../css/CalendarContainer.css'; // Din CSS för styling

const DayView = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTodo, setSelectedTodo] = useState(null); // För att hålla koll på den valda TODOn

    // Hämtar dagens datum
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // YYYY-MM-DD format
    };

    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            try {
                const date = getTodayDate(); // Hämtar dagens datum
                const todosData = await getTodosForDate(date); // Hämtar todos från backend
                setTodos(todosData);
            } catch (error) {
                console.error('Error fetching todos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTodos();
    }, []); // Hämtar todos när komponenten laddas

    const handleCheckboxChange = async (todoId, done) => {
        try {
            await markTodoAsDone(todoId); // Uppdaterar todo som klar i backend
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === todoId ? { ...todo, done } : todo
                )
            );
        } catch (error) {
            console.error('Error marking todo as done:', error);
        }
    };

    const handleTodoClick = (todo) => {
        setSelectedTodo(todo); // Sätt den valda TODOn
    };

    const handleCloseModal = () => {
        setSelectedTodo(null); // Stäng modalen genom att rensa den valda TODOn
    };

    return (
        <div className="todo-day-view">
            <h2>Dagens Uppgifter</h2>
            {isLoading ? (
                <p>Laddar...</p>
            ) : (
                <div className="todo-list">
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id} onClick={() => handleTodoClick(todo)}>
                                <div className="todo-item">
                                    <span>{todo.title}</span>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={todo.done}
                                            onChange={() =>
                                                handleCheckboxChange(todo.id, !todo.done)
                                            }
                                        />
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedTodo && (
                <TodoDetailModal
                    todo={selectedTodo}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default DayView;

