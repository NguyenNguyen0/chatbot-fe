import api from '../api/api';

export const register = async (formData) => {
    const response = await api.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
    });

    return response.data;
};


export const login = async (formData) => {
    const response = await api.post('/auth/login', {
        username: formData.username,
        password: formData.password,
    });
    
    return response.data;
};


export const getUser = async (token) => {
    const response = await api.get('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const refreshToken = async (refreshToken) => {
    const response = await api.post('/auth/refresh', {
        refreshToken,
    });

    return response.data;
}

export const logout = async (accessToken, refreshToken) => {
    const response = await api.post('/auth/logout', {
        accessToken, refreshToken
    });

    return response.data;
}