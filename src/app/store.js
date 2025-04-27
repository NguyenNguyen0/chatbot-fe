import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import chatReducer from '../features/chat/chatSlice';
import authReducer from '../features/auth/authSlice';
import toastReducer from '../features/toast/toastSlice';

const middlewares = []
if (import.meta.env.VITE_MODE === 'development') {
    middlewares.push(logger)
}

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        auth: authReducer,
        toast: toastReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares)
});
