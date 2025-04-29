import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getChatList, getChatConversation, getChatBotResponse, deleteChat } from '../../services';

export const fetchChatList = createAsyncThunk('chat/fetchChatList', async () => {
    const data = await getChatList();
    return data.chats;
});

export const fetchChatConversation = createAsyncThunk('chat/fetchChatConversation', async (chatId) => {
    const data = await getChatConversation(chatId);
    return { chatId, messages: data.messages };
});

export const fetchChatResponse = createAsyncThunk(
    'chat/fetchChatResponse',
    async ({ conversation, messages, model }) => {
        const chatId = conversation?.chatId || null;
        const response = await getChatBotResponse(messages, chatId, model);
        return { response, conversation, messages };
    }
);

export const deleteChatById = createAsyncThunk('chat/deleteChat', async (chatId) => {
    await deleteChat(chatId);
    return chatId;
});

const newChat = {
    chatId: null,
    model: null,
    messages: [],
    title: 'New Conversation',
    active: true,
    createdAt: new Date().toISOString(),
    isNew: true,
};

const initialState = {
    conversations: [],
    currentConversation: newChat,
    messages: [],
    model: null,
    isLoading: false,
    streaming: false,
    streamContent: '',
    error: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        startStreaming(state) {
            state.streaming = true;
            state.streamContent = '';
            state.isLoading = true;
            state.error = null; // clear error on new stream
        },
        appendStreamContent(state, action) {
            state.streamContent += action.payload;
        },
        finishStreaming(state, action) {
            state.messages = [
                ...state.messages,
                { role: 'assistant', content: action.payload }
            ];
            state.streaming = false;
            state.streamContent = '';
            state.isLoading = false;
            state.error = null; // clear error on finish
        },
        stopStreaming(state, action) {
            state.streaming = false;
            state.streamContent = '';
            state.isLoading = false;
            state.error = action?.payload || null; // set error if provided
        },
        setModel(state, action) {
            state.model = action.payload;
        },
        updateMessages(state, action) {
            state.messages = action.payload;
        },
        selectConversation(state, action) {
            const chatId = action.payload;
            state.conversations = state.conversations.map(conv => ({
                ...conv,
                active: conv.chatId === chatId
            }));
            state.currentConversation = state.conversations.find(conv => conv.chatId === chatId) || null;
            state.error = null; // clear error on conversation change
        },
        clearConversation(state) {
            state.currentConversation = newChat;
            state.messages = [];
            state.error = null; // clear error on clear
        },
        renameConversation(state, action) {
            const { chatId, newTitle } = action.payload;
            state.conversations = state.conversations.map(conv =>
                conv.chatId === chatId ? { ...conv, title: newTitle } : conv
            );
            if (state.currentConversation?.chatId === chatId) {
                state.currentConversation.title = newTitle;
            }
        },
        setError(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatList.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchChatList.fulfilled, (state, action) => {
                state.conversations = action.payload;
                state.error = null;
            })
            .addCase(fetchChatList.rejected, (state, action) => {
                state.error = action.error?.message || 'Failed to fetch chat list';
            })
            .addCase(fetchChatConversation.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchChatConversation.fulfilled, (state, action) => {
                state.messages = action.payload.messages;
                state.error = null;
            })
            .addCase(fetchChatConversation.rejected, (state, action) => {
                state.error = action.error?.message || 'Failed to fetch conversation';
            })
            .addCase(fetchChatResponse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchChatResponse.fulfilled, (state, action) => {
                const { response, conversation, messages } = action.payload;
                state.messages = [...messages, { role: 'assistant', content: response.response }];

                if (conversation?.isNew && !conversation.chatId) {
                    const newConv = {
                        ...conversation,
                        chatId: response.chatId,
                        title: response.title || conversation.title,
                        model: state.model,
                        isNew: false,
                        active: true
                    };
                    state.currentConversation = newConv;
                    state.conversations.unshift(newConv);
                } else {
                    if (response.title && response.chatId) {
                        state.currentConversation.title = response.title;
                        state.conversations = state.conversations.map(conv =>
                            conv.chatId === conversation.chatId ? { ...conv, title: response.title } : conv
                        );
                    }
                }
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchChatResponse.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error?.message || 'Failed to get chat response';
            })
            .addCase(deleteChatById.fulfilled, (state, action) => {
                const id = action.payload;
                state.conversations = state.conversations.filter(conv => conv.chatId !== id);
                if (state.currentConversation?.chatId === id) {
                    state.currentConversation = null;
                    state.messages = [];
                }
                state.error = null;
            })
            .addCase(deleteChatById.rejected, (state, action) => {
                state.error = action.error?.message || 'Failed to delete chat';
            });
    }
});

export const {
    setModel,
    updateMessages,
    selectConversation,
    clearConversation,
    renameConversation,
    startStreaming,
    appendStreamContent,
    finishStreaming,
    stopStreaming,
    setError
} = chatSlice.actions;

export default chatSlice.reducer;
