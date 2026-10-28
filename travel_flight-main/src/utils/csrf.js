import axios from 'axios';

export const getCsrfToken = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/csrf-token', {
            withCredentials: true // Ensure cookies are included
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return null;
    }
};