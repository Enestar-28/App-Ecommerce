// api.js
import axios from 'axios';
import { API_BASE_URL } from '@env';


export const login = async (user) => {
    try {
        console.log('user', user);
        const response = await axios.post(`${API_BASE_URL}/login`, user);
        return response;
    } catch (error) {
        throw error;
    }
};

export const register = async (user) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, user);
        return response.data.result;
    } catch (error) {
        throw error;
    }
}




export const fetchAddressesByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/address/${userId}`);
        return response.data.result;
    } catch (error) {
        throw error;
    }
};
