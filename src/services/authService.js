import api from '../api/api';

export const register = async (formData) => {
    const response = await api.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
    });
    
    if (response.data.token) {
        sessionStorage.setItem('jwt', response.data['access_token']);
    }

    return response.data;
};


export const login = async (formData) => {
    const response = await api.post('/auth/login', {
        username: formData.username,
        password: formData.password,
    });
    
    if (response.data.token) {
        sessionStorage.setItem('jwt', response.data['access_token']);
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
        sessionStorage.setItem('jwt', token);
    }

    return response.data;
};

export const logout = async (token) => {
    const response = await api.post('/auth/logout', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    sessionStorage.removeItem('jwt');

    return response.data;
}