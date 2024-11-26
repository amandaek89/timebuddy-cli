import React, { useState, useEffect, useCallback } from 'react';
import {deleteTodo, getTodosForDate, markTodoAsDone, updateTodo} from '../services/TodoService';
import TodoModal from './TodoModal';
import UpdateTodoModal from './UpdateTodoModal';
import AddTodoModal from './AddTodoModal';
import '../css/DayView.css';

const DayView = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const getTodayDate = () => new Date().toISOString().split('T')[0];

    const fetchTodos = useCallback(async () => {
        setIsLoading(true);
        try {
            const todosData = await getTodosForDate(getTodayDate());
            setTodos(todosData);
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos().then(() => console.log("Fetched todos"));
    }, [fetchTodos]);

    const handleCheckboxChange = async (todoId, done) => {
        try {
            await markTodoAsDone(todoId);
            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo.id === todoId ? { ...todo, done } : todo))
            );
        } catch (error) {
            console.error('Error marking todo as done:', error);
        }
    };

    const handleEditClick = (todo) => {
        setSelectedTodo(null); // Stäng detaljmodal
        setTodoToEdit(todo); // Öppna redigering för vald todo
        setIsEditModalOpen(true); // Öppna redigeringsmodal
    };

    const handleUpdateTodo = async (id, updatedTodo) => {
        try {
            const updatedData = await updateTodo(id, updatedTodo);

            // Direkt lokal uppdatering för snabb feedback
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, ...updatedData } : todo
                )
            );

            // Hämta nya todos från backend för att synkronisera
            await fetchTodos();

            // Stäng modal och rensa redigeringsstate
            setIsEditModalOpen(false);
            setTodoToEdit(null);

            console.log("Todo updated successfully.");
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id); // Anropa delete-funktion
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Uppdatera state
            console.log("Todo deleted successfully.");
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };


    const handleAddTodo = (newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const getTodosForTime = (timeSlot) =>
        todos.filter((todo) => {
            const todoTime = todo.time?.split(":")[0];
            return todoTime === timeSlot.split(":")[0];
        });

    const getAllDayTodos = () => todos.filter((todo) => todo.allDay);

    return (
        <div className="day-view">
            <div className="header">
                <button
                    className="add-todo-button"
                    onClick={() => setIsAddTodoModalOpen(true)}
                >
                    Lägg till händelse
                </button>
            </div>

            {isLoading ? (
                <p>Laddar...</p>
            ) : (
                <table className="todos-table">
                    <thead>
                    <tr>
                        <th>Tid</th>
                        <th>Uppgift</th>
                        <th>Klar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from({ length: 10 }, (_, index) => {
                        const timeSlot = `${8 + index}:00`;
                        const todosForSlot = getTodosForTime(timeSlot);

                        return (
                            <tr key={timeSlot}>
                                <td>{timeSlot}</td>
                                <td>
                                    {todosForSlot.map((todo) => (
                                        <div
                                            key={todo.id}
                                            className="todo-item"
                                            onClick={() => setSelectedTodo(todo)}
                                        >
                                            <span>{todo.title}</span>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {todosForSlot.map((todo) => (
                                        <label key={todo.id} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={todo.done}
                                                onChange={() =>
                                                    handleCheckboxChange(todo.id, !todo.done)
                                                }
                                            />
                                        </label>
                                    ))}
                                </td>
                            </tr>
                        );
                    })}

                    {getAllDayTodos().length > 0 && (
                        <tr>
                            <td colSpan="3" className="all-day-row">
                                <h3>Övrigt</h3>
                                {getAllDayTodos().map((todo) => (
                                    <div
                                        key={todo.id}
                                        className="todo-item"
                                        onClick={() => setSelectedTodo(todo)}
                                    >
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
                                ))}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}

            {selectedTodo && (
                <TodoModal
                    todo={selectedTodo}
                    onClose={() => setSelectedTodo(null)}
                    onEdit={(todo) => {
                        setTodoToEdit(todo);
                        setIsEditModalOpen(true);
                    }}
                    onDelete={handleDeleteTodo} // Lägg till onDelete
                />
            )}

            {isEditModalOpen && (
                <UpdateTodoModal
                    todo={todoToEdit}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleUpdateTodo}
                />
            )}

            {isAddTodoModalOpen && (
                <AddTodoModal
                    selectedDate={getTodayDate()}
                    onClose={() => setIsAddTodoModalOpen(false)}
                    onTodoAdded={handleAddTodo}
                />
            )}
        </div>
    );
};

export default DayView;

