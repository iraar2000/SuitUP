import axios, { AxiosError } from 'axios';

// Use environment variable if available, otherwise fallback to default
const API_BASE_URL = import.meta.env.MAP_API_URL || 'http://localhost:1111/api';

// Create axios instance with default config
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
    (config) => {
        // console.log('API Request:', {
        //     url: config.url,
        //     method: config.method,
        //     params: config.params,
        //     data: config.data,
        // });
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling and logging
apiClient.interceptors.response.use(
    (response) => {
        // console.log('API Response:', {
        //     url: response.config.url,
        //     status: response.status,
        //     data: response.data,
        // });
        return response;
    },
    (error: AxiosError) => {
        // console.error('API Error:', {
        //     url: error.config?.url,
        //     method: error.config?.method,
        //     status: error.response?.status,
        //     data: error.response?.data,
        //     message: error.message,
        // });
        return Promise.reject(error);
    }
);