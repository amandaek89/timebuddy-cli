import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/todolist';

// Hämtar token från lokal lagring
const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return token;
};

// Hämtar todos för en användare
export const getTodosForUser = async () => {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.todos || [];
    } catch (error) {
        console.error('Failed to get todos', error);
        return [];
    }
};

// Hämtar todos för ett specifikt datum
export const getTodosForDate = async (date) => {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${date}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.todos || [];
    } catch (error) {
        console.error(`Error fetching todos for date ${date}:`, error);
        return [];
    }
};

// Lägg till en ny todo på ett specifikt datum
export const addTodoToDate = async (date, todoTitle) => {
    const token = getAuthToken();
    try {
        const response = await axios.post(
            `${API_BASE_URL}/add/${date}`,
            { title: todoTitle },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
    }
};

// Uppdatera en todo
export const updateTodo = async (id, updatedTodo) => {
    const token = getAuthToken();
    try {
        const response = await axios.put(
            `${API_BASE_URL}/${id}`,
            updatedTodo,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};

// Ta bort en todo
export const deleteTodo = async (id) => {
    const token = getAuthToken();
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};

// Markera todo som klar
export const markTodoAsDone = async (id) => {
    const token = getAuthToken();
    try {
        const response = await axios.patch(
            `${API_BASE_URL}/${id}/done`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error marking todo as done:', error);
        throw error;
    }
};

// Markera todo som inte klar
export const markTodoAsNotDone = async (id) => {
    const token = getAuthToken();
    try {
        const response = await axios.patch(
            `${API_BASE_URL}/${id}/not-done`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error marking todo as not done:', error);
        throw error;
    }

    async function getAllTodos() {
        const token = getAuthToken();

        const response = await fetch('http://localhost:8080/api/todos/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        });

        if (response.ok) {
            const todos = await response.json(); // Få tillbaka listan av todos
            displayTodos(todos); // Anropa en funktion för att visa todos
        } else {
            console.error('Failed to fetch todos');
        }
    }
};
