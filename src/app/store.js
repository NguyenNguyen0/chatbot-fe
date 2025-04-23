import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import chatReducer from '../features/chat/chatSlice';
import authReducer from '../features/auth/authSlice';

const middlewares = []
if (import.meta.env.VITE_MODE === 'development') {
    middlewares.push(logger)
}

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares)
});
