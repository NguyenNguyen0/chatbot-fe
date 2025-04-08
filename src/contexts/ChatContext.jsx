import propTypes from 'prop-types';
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { getChatList, getChatSection, getChatBotResponse } from "../services";
import { AuthContext } from "./AuthContext";

const ChatContext = createContext();

function ChatProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Load chats when context mounts
        getChatList()
            .then((data) => {
                setConversations(data.chats);
                console.log('Conversations loaded:', data.chats);
            })
            .catch((e) => {
                console.error(e.response?.data || e);
                setConversations([]);
            });
    }, [user]);

    const deleteConversation = (conversationId) => {
        setConversations(prev => prev.filter(conv => conv.chatId !== conversationId));
    };

    const selectConversation = (id) => {
        if (!id) {
            setCurrentConversation(null);
            setMessages([]);
            return;
        }

        setConversations(prev =>
            prev.map(conv => ({
                ...conv,
                active: conv.chatId === id,
            }))
        );

        const selectedConversation = conversations.find(conv => conv.chatId === id);
        setCurrentConversation(selectedConversation);
        
        getChatSection(id)
            .then((data) => {
                setMessages(data.messages);
                console.log('Messages loaded:', data);
                console.log("Current Conversation: " + JSON.stringify(selectedConversation));
            })
            .catch((e) => {
                console.error(e.response?.data || e);
                setMessages([]);
            });
    };

    const getChatResponse = (conversation, newMessage) => {
        const updatedMessages = [...messages, newMessage];
        const { chatId, model } = conversation;
        
        setMessages(updatedMessages);
        console.log("Sending message:", updatedMessages);

        getChatBotResponse(updatedMessages, chatId, model)
            .then((data) => {
                setMessages(prev => [...prev, {role: 'assistant', content: data.response}]);
                console.log('Bot response:', data);
            })
            .catch((e) => {
                console.error(e.response?.data || e);
            });
        
        setConversations(prev =>
            prev.map(conv => ({
                ...conv,
                active: conv.id === chatId,
            }))
        );
    }

    return (
        <ChatContext.Provider value={{
            conversations,
            setConversations,
            currentConversation,
            setCurrentConversation,
            messages,
            setMessages,
            deleteConversation,
            selectConversation,
            getChatResponse,
        }}>
            {children}
        </ChatContext.Provider>
    );
}

ChatProvider.propTypes = {
    children: propTypes.node.isRequired,
}

export { ChatContext, ChatProvider };

