import axios from "axios";
import configs from '../config/config';
import applyCaseMiddleware from "axios-case-converter";

// Create the API instance first
const api = applyCaseMiddleware(axios.create({
    baseURL: configs.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
}), { ignoreHeaders: true });

// Now add interceptors to this instance (not global axios)
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

// Fix the response interceptor on your api instance
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        console.log("Error in response interceptor:", error.response?.status);
        
        // Only proceed if it's a 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("Attempting token refresh...");

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
                
                console.log("Refresh token response:", response.data);
                console.log("Refresh response:", response.status);
                
                if (response.status === 200) {
                    const newAccessToken = response.data.accessToken;
                    sessionStorage.setItem("accessToken", newAccessToken);

                    // Update auth header in the api instance
                    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    
                    console.log("Token refreshed successfully, retrying original request");
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