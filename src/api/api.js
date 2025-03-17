import axios from "axios";
import configs from '../config/config';

const api = axios.create({
    baseURL: configs.API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api; 