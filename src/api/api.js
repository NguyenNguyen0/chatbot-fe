import axios from "axios";
import configs from '../config/config';
import applyCaseMiddleware from "axios-case-converter";

const api = applyCaseMiddleware(axios.create({
    baseURL: configs.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
}), { ignoreHeaders: true });

api.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        console.error("Error in response interceptor:", error.response?.status);
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = sessionStorage.getItem("refreshToken");
                
                if (!refreshToken) {
                    console.error("No refresh token available");
                    throw new Error("No refresh token");
                }
                
                const response = await applyCaseMiddleware(axios, { ignoreHeaders: true })
                    .post(`${configs.API_BASE_URL}/auth/refresh`, refreshToken, {
                        headers: { 'Content-Type': 'text/plain' }
                    });
                
                if (response.status === 200) {
                    const newAccessToken = response.data.accessToken;
                    sessionStorage.setItem("accessToken", newAccessToken);

                    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("refreshToken");
                
                // Redirect to login page
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;