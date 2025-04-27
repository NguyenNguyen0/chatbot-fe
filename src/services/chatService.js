import api from "../api/api";


export const getChatList = async () => {
    try {
        const response = await api.get('/chat/');
        return response.data;
    } catch (error) {
        console.error('Error fetching chat list:', error);
        throw error;
    }
}

export const getChatConversation = async (chatId) => {
    try {
        const response = await api.get(`/chat/${chatId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat:', error);
        throw error;
    }
}

export const getChatBotResponse = async (messages, chatId, model) => {
    try {
        const requestBody = {
            chatId: chatId,
            messages: messages,
            model: model
        };
        
        const response = await api.post('/chat/', requestBody);
        return response.data;
    } catch (error) {
        console.error('Error sending chat message:', error);
        throw error;
    }
}

export const deleteChat = async (chatId) => {
    try {
        const response = await api.delete(`/chat/${chatId}/`);

        return response.data;
    } catch (error) {
        console.error('Error deleting chat:', error);
        throw error;
    }
}

export const getModels = async () => {
    try {
        const response = await api.get('/chat/models/');

        return response.data;
    } catch (error) {
        console.error('Error fetching models:', error);
        throw error;
    }
}


export const renameChat = async (chatId, chatTitle) => {
    try {
        const response = await api.patch(`/chat/${chatId}/`, chatTitle, {
            headers: {
                'Content-Type': 'text/plain'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error renaming chat:', error);
        throw error;
    }
}