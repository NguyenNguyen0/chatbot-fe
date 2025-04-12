import api from '../api/api';

export const register = async (formData) => {
    const response = await api.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
    });
    
    if (response.data.accessToken || response.data.refreshToken) {
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
        sessionStorage.setItem('accessToken', response.data.accessToken);
    }

    return response.data;
};


export const login = async (formData) => {
    const response = await api.post('/auth/login', {
        username: formData.username,
        password: formData.password,
    });
    
    if (response.data.accessToken || response.data.refreshToken) {
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
        sessionStorage.setItem('accessToken', response.data.accessToken);
    }

    return response.data;
};


export const getUser = async (token) => {
    const response = await api.get('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.data) {
        sessionStorage.setItem('accessToken', token);
    }

    return response.data;
};

export const logout = async (accessToken, refreshToken) => {
    const response = await api.post('/auth/logout', {
        accessToken, refreshToken
    });

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');

    return response.data;
}