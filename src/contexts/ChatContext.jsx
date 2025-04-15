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
    const [model, setModel] = useState(null);

    useEffect(() => {
        // Load chats when context mounts
        if (!user) return;
        getChatList()
            .then((data) => {
                setConversations(data.chats);
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
            })
            .catch((e) => {
                console.error(e.response?.data || e);
                setMessages([]);
            });
    };

    const getChatResponse = async (conversation, messages) => {
        setMessages(messages);
        if (!conversation) {
            const newConversation = {
                chatId: null,
                model: model,
                messages: [],
                title: 'New Conversation',
                active: true,
                createdAt: new Date().toISOString(),
                isNew: true,
            };
            setCurrentConversation(newConversation);
            conversation = newConversation;
        }

        const { chatId } = conversation;

        try {
            console.log('Current conversation:', conversation);
            console.log('Messages:', messages);
            
            const response = await getChatBotResponse(messages, chatId, model);
            setMessages(prev => [...prev, { role: 'assistant', content: response.response }])

            if (conversation?.isNew && !chatId) {
                const newChatId = response.chatId || chatId;
                const updatedConversation = {
                    ...conversation,
                    chatId: newChatId,
                    model: model,
                    messages: messages,
                    title: (response.title ?? conversation.title),
                    active: true,
                    isNew: false,
                };

                setCurrentConversation(updatedConversation);
                setConversations([updatedConversation, ...conversations]);
                navigate(`/chat/${newChatId}`);
            } else if (response.title) {
                setCurrentConversation(prev => ({
                    ...prev,
                    title: response.title
                }));

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

    const updateMessages = (newMessages) => {
        return new Promise(resolve => {
            setMessages(() => {
                resolve(newMessages);
                return newMessages;
            });
        });
    }

    return (
        <ChatContext.Provider value={{
            conversations,
            setConversations,
            currentConversation,
            setCurrentConversation,
            messages,
            setMessages,
            model,
            setModel,
            updateMessages,
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

