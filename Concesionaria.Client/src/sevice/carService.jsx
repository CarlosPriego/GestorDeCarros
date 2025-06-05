import axios from 'axios'

const baseUrl = 'http://localhost:3000/concesionaria/v1/car'

export const getCarService = async () => {
    try {
        const response = await axios.get(baseUrl);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log('Error al realizar la petición GET: ', error);
        throw error;
    }
};

export const postCarService = async (carData) => {
    try {
        const response = await axios.post(baseUrl, carData);
        return response.data;
    } catch (error) {
        console.log('Error al realizar la petición POST: ', error);
        throw error;
    }
};

export const putCarService = async (carData, id) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, carData);
        return response.data;
    } catch (error) {
        console.log('Error al realizar la petición PUT: ', error);
        throw error;
    }
};

export const deleteCarService = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error al realizar la petición DELETE: ', error);
        throw error;
    }
};