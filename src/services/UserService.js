import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/user'; // Byt ut till din API-bas-URL

// Hämtar token från lokal lagring
const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return token;
};

const UserService = {
    // Hämta användarprofil baserat på användarnamn
    getUser: async (username) => {
        const token = getAuthToken();
        try {
            const response = await axios.get(
                `${API_BASE_URL}/${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            return response.data;
        } catch (error) {
            throw error.response.data || "Error fetching user";
        }
    },

    // Uppdatera lösenord
    updatePassword: async (passwordData) => {
        const token = getAuthToken();
        try {
            const response = await axios.put(
                `${API_BASE_URL}`,
                passwordData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            return response.data;
        } catch (error) {
            throw error.response.data || "Error updating password";
        }
    },

    // Ta bort användare
    deleteUser: async () => {
        const token = getAuthToken();
        try {
            const response = await axios.delete(
                `${API_BASE_URL}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            return response.data;
        } catch (error) {
            console.error("Error in getUser:", error.response || error.message);
            throw new Error(error.response?.data?.message || "Failed to fetch user");
        }
    },
};

export default UserService;
