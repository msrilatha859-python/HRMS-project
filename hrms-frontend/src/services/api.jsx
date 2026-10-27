import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

// Attach the current access token to API requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('access');

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

// Refresh the access token when it expires
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            const refresh = localStorage.getItem('refresh');

            if (!refresh) {
                localStorage.removeItem('access');
                window.location.href = '/';
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/token/refresh/',
                    { refresh }
                );

                const newAccess = response.data.access;

                localStorage.setItem('access', newAccess);

                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;

                return API(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                window.location.href = '/';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;