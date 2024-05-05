import axios from "axios";

export const fetchProducts = async (page, size) => {
    try {
        const response = await axios.get(`http://172.20.10.4:3333/api/v0/getproducts`, {
            params: {
                page: page,
                size: size,
            }
        });
        return response.data.result;
    } catch (error) {
        console.log("error message", error);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get("http://172.20.10.4:3333/api/v0/getcategoris");
        return response.data.result;
    } catch (error) {
        console.log("error message", error);
        return [];
    }
};

export const fetchAddressesByUserId = async (userId) => {
    try {
        const response = await axios.get(`http://172.20.10.4:3333/api/v0/address/${userId}`);
        return response.data.result;
    } catch (error) {
        console.log("error", error);
        return [];
    }
};
