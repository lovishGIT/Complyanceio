import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.URL,
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                await axios.post(
                    'https://complyanceio-backend.vercel.app/api/auth/refresh_token',
                    {},
                    { withCredentials: true }
                );

                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
