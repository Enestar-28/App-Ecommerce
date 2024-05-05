// api.js
import axios from 'axios';
import { API_BASE_URL } from '@env';

export const fetchProducts = async (page, size) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getproducts`, {
            params: {
                page: page,
                size: size,
            }
        });
        return response.data.result;
    } catch (error) {
        throw error;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getcategoris`);
        return response.data.result;
    } catch (error) {
        throw error;
    }
};

