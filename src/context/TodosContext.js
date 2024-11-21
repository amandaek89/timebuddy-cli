import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    getAllTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    markTodoAsDone,
    markTodoAsNotDone
} from '../services/TodoService'; // Importera funktionerna

// Skapa Contexten för Todos
const TodosContext = createContext();

// Custom Hook för att använda TodosContext
export const useTodos = () => {
    return useContext(TodosContext);
};

// TodosProvider-komponent som hanterar alla Todo-relaterade operationer
export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    // Hämta todos när komponenten laddas
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const fetchedTodos = await getAllTodos();
                setTodos(fetchedTodos);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    // Lägg till en ny todo
    const addNewTodo = async (date, newTodo) => {
        try {
            const addedTodo = await addTodo(date, newTodo);
            setTodos((prevTodos) => [...prevTodos, addedTodo]);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    // Uppdatera en existerande todo
    const updateExistingTodo = async (id, updatedTodo) => {
        try {
            const updated = await updateTodo(id, updatedTodo);
            setTodos((prevTodos) =>
                prevTodos.map(todo =>
                    todo.id === id ? { ...todo, ...updated } : todo
                )
            );
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // Ta bort en todo
    const removeTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Uppdatera todo-status (Done/Not Done)
    const TodoStatus = async (id, isDone) => {
        try {
            const updatedTodo = isDone ? await markTodoAsDone(id) : await markTodoAsNotDone(id);

            setTodos((prevTodos) =>
                prevTodos.map(todo =>
                    todo.id === id ? { ...todo, done: updatedTodo.done } : todo
                )
            );
        } catch (error) {
            console.error('Error updating todo status:', error);
        }
    };

    return (
        <TodosContext.Provider
            value={{
                todos,
                addNewTodo,
                updateExistingTodo,
                removeTodo,
                TodoStatus
            }}
        >
            {children}
        </TodosContext.Provider>
    );
};
