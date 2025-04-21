import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/chat/chatSlice';
import logger from 'redux-logger';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger)
});
