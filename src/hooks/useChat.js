import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    fetchChatList,
    fetchChatSection,
    fetchChatResponse,
    deleteChatById,
    setModel,
    updateMessages,
    selectConversation,
    clearConversation,
    renameConversation
} from '../features/chat/chatSlice';

export const useChat = () => {
    const dispatch = useDispatch();

    const {
        conversations,
        currentConversation,
        messages,
        model
    } = useSelector(state => state.chat);

    const loadConversations = useCallback(() => {
        dispatch(fetchChatList());
    }, [dispatch]);

    const selectChat = useCallback((chatId) => {
        if (!chatId) {
            dispatch(clearConversation());
        } else {
            dispatch(selectConversation(chatId));
            dispatch(fetchChatSection(chatId));
        }
    }, [dispatch]);

    const sendMessage = useCallback((conversation, messageList) => {
        dispatch(fetchChatResponse({ conversation, messages: messageList, model }));
    }, [dispatch, model]);

    const removeConversation = useCallback((chatId) => {
        dispatch(deleteChatById(chatId));
    }, [dispatch]);

    const renameConversationHandler = useCallback((chatId, newTitle) => {
        if (newTitle.trim()) {
            dispatch(renameConversation({ chatId, newTitle }));
        }
    }, [dispatch]);

    const updateMessageList = useCallback((newMessages) => {
        dispatch(updateMessages(newMessages));
    }, [dispatch]);

    const changeModel = useCallback((modelName) => {
        dispatch(setModel(modelName));
    }, [dispatch]);

    return {
        conversations,
        currentConversation,
        messages,
        model,

        loadConversations,
        selectChat,
        sendMessage,
        removeConversation,
        renameConversation: renameConversationHandler,
        updateMessages: updateMessageList,
        changeModel,
    };
};
