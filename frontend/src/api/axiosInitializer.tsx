import axios from 'axios';

const api = axios.create({
    baseURL: 'https://complyanceio-api.vercel.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to handle errors
axios.defaults.withCredentials = true;
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
        }
        return Promise.reject(error);
    }
);

export default api;
