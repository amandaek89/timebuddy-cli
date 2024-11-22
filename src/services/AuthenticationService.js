import axios from "axios";

// API base URL från miljövariabel eller localhost om den inte finns
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Login-funktion
export const login = async (username, password) => {
    try {
        // Skicka POST-request för att logga in
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });

        // Logga hela svaret för att debugga och se strukturen på svaret
        console.log('API response:', response.data);

        // Extrahera token från svaret (om strukturen är response.data.data.token)
        const token = response.data?.data?.token;

        // Kontrollera om token finns och spara den i localStorage
        if (token) {
            localStorage.setItem('token', token); // Spara token i localStorage
            console.log('Token:', token); // Logga token för att kontrollera
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

// Register-funktion
export const register = async (username, password) => {
    try {
        // Skicka POST-request för att registrera användaren
        const response = await axios.post(`${API_BASE_URL}/auth/register`, { username, password });

        // Hämta eventuellt meddelande från servern
        const { message } = response.data;

        // Kontrollera om registreringen lyckades
        if (response.status === 201 || response.status === 200) {
            console.log("User registered successfully");
            return { success: true, message: message || 'User registered successfully.' };
        }
    } catch (error) {
        // Logga fel om registreringen misslyckas
        console.error('Registration failed', error);
        return {
            success: false,
            message: error.response?.data?.message || 'An error occurred during registration.'
        };
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log('Token in localStorage:', token);
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 > Date.now(); // Kontrollera om token inte är utgången
    } catch {
        return false;
    }
};
