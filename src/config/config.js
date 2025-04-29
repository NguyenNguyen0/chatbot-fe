const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const WEBSOCKET_CHAT_URL = import.meta.env.VITE_WEBSOCKET_CHAT_URL || 'ws://localhost:8000/chat/ws';

const configs = {
  API_BASE_URL,
  WEBSOCKET_CHAT_URL
};

export default configs;