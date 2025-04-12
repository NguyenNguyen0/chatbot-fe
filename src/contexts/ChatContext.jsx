import propTypes from 'prop-types';
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getChatList, getChatSection, getChatBotResponse, deleteChat } from "../services";
import { AuthContext } from "./AuthContext";

const ChatContext = createContext();

function ChatProvider({ children }) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Load chats when context mounts
        if (!user) return;
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

    const deleteConversation = async (conversationId) => {
        if (!conversationId) return;
        
        try {
            await deleteChat(conversationId);
            setConversations(prev => prev.filter(conv => conv.chatId !== conversationId));
            if (currentConversation?.chatId === conversationId) {
                navigate('/chat');
                setCurrentConversation(null);
                setMessages([]);
            }
        } catch (e) {
            console.error(e.response?.data || e);
        }
    };

    const selectConversation = (id) => {
        if (!id) {
            setCurrentConversation(null);
            setMessages([]);
            return;
        }

        navigate(`/chat/${id}`);
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

    const getChatResponse = async (conversation, newMessage) => {
        const updatedMessages = [...messages, newMessage];
        const { chatId, model } = conversation;
        
        setMessages(updatedMessages);
        console.log("Sending message:", updatedMessages);

        try {
            const response = await getChatBotResponse(updatedMessages, chatId, model);
            setMessages(prev => [...prev, { role: 'assistant', content: response.response }])
            console.log('Bot response:', response);
            
            if (conversation?.isNew && !chatId) {
                const newChatId = response.chatId || chatId;
                const updatedConversation = {
                    ...conversation,
                    chatId: newChatId,
                    model: model,
                    messages: updatedMessages,
                    title: (response.title ?? conversation.title),
                    active: true,
                    isNew: false,
                };

                setCurrentConversation(updatedConversation);
                setConversations([updatedConversation, ...conversations]);
                navigate(`/chat/${newChatId}`);
            } else if (response.title) {
                // Update title for existing chats if response contains a title
                setCurrentConversation(prev => ({
                    ...prev,
                    title: response.title
                }));

                // Also update in the conversations list
                setConversations(prev =>
                    prev.map(conv =>
                        conv.chatId === chatId
                            ? { ...conv, title: response.title }
                            : conv
                    )
                );
            }
        } catch (e) {
            console.error(e.response?.data || e);
        }
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

