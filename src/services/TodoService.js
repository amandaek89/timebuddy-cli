import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/todos';

// Hämtar token från lokal lagring
const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return token;
};

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

export const markTodoAsDone = async (id, done) => {  // Accept 'done' parameter
    const token = getAuthToken();
    try {
        const response = await axios.patch(
            `${API_BASE_URL}/${id}/${done}`, // Pass 'done' directly to the URL
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

export const getAllTodos = async () => {
    const token = getAuthToken();
    try {
        const response = await fetch('http://localhost:8080/api/todos/all', {
                method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log('API response:', data); // Logga svaret för att se om det är korrekt
        return data; // Returnera data
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

export const addTodo = async (date, todoRequest) => {
    const token = getAuthToken();
    try {
        const response = await axios.post(`${API_BASE_URL}/add/${date}`, todoRequest, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

export const getTodosForDate = async (date) => {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_BASE_URL}/date/${date}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
        } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};