import React, { useState, useEffect, useCallback } from 'react';
import { getTodosForDate, markTodoAsDone, addTodo } from '../services/TodoService';
import TodoDetailModal from './TodoDetailModal';
import AddTodoModal from './AddTodoModal';
import '../css/DayView.css';

const DayView = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

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
        fetchTodos().then(r => console.log("Fetched todos for calendar"));
    }, [fetchTodos]);

    const handleCheckboxChange = async (todoId, done) => {
        try {
            await markTodoAsDone(todoId);
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === todoId ? { ...todo, done } : todo
                )
            );
        } catch (error) {
            console.error('Error marking todo as done:', error);
        }
    };

    const handleAddTodo = async (newTodo) => {
        try {
            await addTodo(newTodo);
            await fetchTodos();
        } catch (error) {
            console.error('Error adding new todo:', error);
        }
    };

    const getTodosForTime = (timeSlot) => {
        return todos.filter(todo => {
            const todoTime = todo.time ? todo.time.split(":")[0] : null;
            return todoTime && todoTime === timeSlot.split(":")[0];
        });
    };

    const getAllDayTodos = () => todos.filter(todo => todo.allDay);

    return (
        <div className="day-view">
            <div className="header">
                <button className="add-todo-button" onClick={() => setIsAddTodoModalOpen(true)}>
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
                        return (
                            <tr key={timeSlot}>
                                <td>{timeSlot}</td>
                                <td>
                                    {getTodosForTime(timeSlot).map(todo => (
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
                                    {getTodosForTime(timeSlot).map(todo => (
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
                                {getAllDayTodos().map(todo => (
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
                <TodoDetailModal
                    todo={selectedTodo}
                    onClose={() => setSelectedTodo(null)}
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
