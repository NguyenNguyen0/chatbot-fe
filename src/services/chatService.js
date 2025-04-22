import api from "../api/api";


export const getChatList = async () => {
    try {
        const accessToken = sessionStorage.getItem('accessToken') ?? null;
        
        if (!accessToken) {
            throw new Error('JWT token is missing');
        }
        
        const response = await api.get('/chat/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching chat list:', error);
        throw error;
    }
}

export const getChatSection = async (chatId) => {
    try {
        const accessToken = sessionStorage.getItem('accessToken') ?? null;
        
        if (!accessToken) {
            throw new Error('JWT token is missing');
        }
        
        const response = await api.get(`/chat/${chatId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching chat:', error);
        throw error;
    }
}

export const getChatBotResponse = async (messages, chatId, model) => {
    try {
        const accessToken = sessionStorage.getItem('accessToken') ?? null;
        
        const requestBody = {
            chatId: chatId,
            messages: messages,
            model: model
        };

        const headers = accessToken ? {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        } : {
            'Content-Type': 'application/json'
        };

        const response = await api.post('/chat/', requestBody, { headers });

        return response.data;
    } catch (error) {
        console.error('Error sending chat message:', error);
        throw error;
    }
}

export const deleteChat = async (chatId) => {
    try {
        const accessToken = sessionStorage.getItem('accessToken') ?? null;

        if (!accessToken) {
            throw new Error('JWT token is missing');
        }

        const response = await api.delete(`/chat/${chatId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting chat:', error);
        throw error;
    }
}

export const getModels = async () => {
    try {
        const accessToken = sessionStorage.getItem('accessToken') ?? null;
        
        if (!accessToken) {
            throw new Error('JWT token is missing');
        }
        
        const response = await api.get('/chat/models/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching models:', error);
        throw error;
    }
}


export const renameChat = async (chatId, chatTitle) => {
    try {
        const accessToken = sessionStorage.getItem('accessToken') ?? null;

        if (!accessToken) {
            throw new Error('JWT token is missing');
        }

        const response = await api.patch(`/chat/${chatId}/`, chatTitle, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'text/plain'
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error renaming chat:', error);
        throw error;
    }
}