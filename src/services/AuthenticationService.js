import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
        console.log('API response:', response.data); // Logga hela svaret
        const { data } = response.data; // Extrahera data
        const token = data;  // Token är direkt i data (från svaret)

        console.log('Token:', token);  // Logga token för att se vad du får

        if (token) {
            localStorage.setItem('token', token); // Om token finns, spara den
            return true;
        } else {
            console.error('Token was not returned by the backend');
            return false;
        }
    } catch (error) {
        console.error('Login failed', error);
        return false;
    }
};

export const register = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {username, password});
        const {message} = response.data;
        if (response.status === 201 || response.status === 200) {
            console.log("User registered")
            return {success: true, message: message || 'User registered successfully.'}
        }
    } catch (error) {
        console.error('Registration failed', error);
        return {success: false, message: error.response?.data?.message || 'An error occurred during registration.'};
    }
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; //!! to ensure true is returned if there is a token and false if there is no token.
}


