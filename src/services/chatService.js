import api from "../api/api";


export const getChatList = async () => {
    try {
        const jwtToken = sessionStorage.getItem('jwt') ?? null;
        
        if (!jwtToken) {
            throw new Error('JWT token is missing');
        }
        
        const response = await api.get('/chat/', {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
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
        const jwtToken = sessionStorage.getItem('jwt') ?? null;
        
        if (!jwtToken) {
            throw new Error('JWT token is missing');
        }
        
        const response = await api.get(`/chat/${chatId}/`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
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
        const jwtToken = sessionStorage.getItem('jwt') ?? null;

        if (!jwtToken) {
            throw new Error('JWT token is missing');
        }

        // Create the request body with the correct structure
        const requestBody = {
            chatId: chatId,
            messages: messages,
            model: model
        };

        const response = await api.post('/chat/', requestBody, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error sending chat message:', error);
        throw error;
    }
}

export const deleteChat = async (chatId) => {
    try {
        const jwtToken = sessionStorage.getItem('jwt') ?? null;

        if (!jwtToken) {
            throw new Error('JWT token is missing');
        }

        const response = await api.delete(`/chat/${chatId}/`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting chat:', error);
        throw error;
    }
}