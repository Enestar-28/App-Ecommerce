// api.js
import axios from 'axios';


import { API_BASE_URL } from '@env';


export const fetchAddressesByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/address/${userId}`);
        return response.data.result;
    } catch (error) {
        throw error;
    }
};
