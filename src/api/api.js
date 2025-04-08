import axios from "axios";
import configs from '../config/config';
import applyCaseMiddleware from "axios-case-converter";

const api = applyCaseMiddleware(axios.create({
    baseURL: configs.API_BASE_URL,
    // timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
}), { ignoreHeaders: true });

export default api; 