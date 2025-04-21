import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/chat/chatSlice';
import logger from 'redux-logger';

const middlewares = []
if (import.meta.env.VITE_MODE === 'development') {
    middlewares.push(logger)
}

export const store = configureStore({
    reducer: {
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares)
});
