import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useRef } from 'react';
import {
	fetchChatList,
	fetchChatConversation,
	fetchChatResponse,
	deleteChatById,
	setModel,
	updateMessages,
	selectConversation,
	clearConversation as handleClearConversation,
	renameConversation,
	startStreaming,
	appendStreamContent,
	finishStreaming,
	stopStreaming,
	setError,
} from '../features/chat/chatSlice';
import configs from '../config/config';

export const useChat = () => {
	const dispatch = useDispatch();
	const wsRef = useRef(null);

	const {
		conversations,
		currentConversation,
		messages,
		model: currentModel,
		isLoading,
		streaming,
		streamContent,
	} = useSelector(state => state.chat);
	const { token } = useSelector(state => state.auth);

	const sendMessageStream = useCallback(
		(conversation, messageList, model) => {
			if (wsRef.current && wsRef.current.readyState === 1) {
				wsRef.current.close();
			}
			dispatch(startStreaming());

			let wsUrl = configs.WEBSOCKET_CHAT_URL;
			if (token) {
				wsUrl += `?token=${token}`;
			}
			const ws = new WebSocket(wsUrl);

			wsRef.current = ws;

			ws.onopen = () => {
				try {
					ws.send(
						JSON.stringify({
							command: 'chat',
							messages: messageList,
							model: model || currentModel,
							chat_id: conversation?.chatId,
						}),
					);
				} catch (e) {
					console.error('WebSocket send error:', e);
					dispatch(setError('Failed to send message to server.'));
					dispatch(stopStreaming('Failed to send message to server.'));
					ws.close();
				}
			};

			ws.onmessage = event => {
				try {
					const data = JSON.parse(event.data);
					if (data.status === 'streaming' && data.chunk) {
						dispatch(appendStreamContent(data.chunk));
					}
					if (data.status === 'complete' && data.message) {
						dispatch(finishStreaming(data.message));
						ws.close();
					}
					if (data.status === 'error') {
						dispatch(setError(data.error || 'Server error during streaming.'));
						dispatch(stopStreaming(data.error || 'Server error during streaming.'));
						ws.close();
					}
				} catch (e) {
					console.error('Error parsing WebSocket message:', e, event.data);
					dispatch(setError('Error parsing server response.'));
					dispatch(stopStreaming('Error parsing server response.'));
					ws.close();
				}
			};

			ws.onerror = event => {
				console.error('WebSocket error:', event);
				dispatch(setError('WebSocket connection error.'));
				dispatch(stopStreaming('WebSocket connection error.'));
				ws.close();
			};

			ws.onclose = event => {
				if (!event.wasClean) {
					console.warn('WebSocket closed unexpectedly:', event);
					dispatch(setError('WebSocket closed unexpectedly.'));
				}
				dispatch(stopStreaming());
			};
		},
		[dispatch, token, currentModel],
	);

	const loadConversations = useCallback(() => {
		dispatch(fetchChatList());
	}, [dispatch]);

	const selectChat = useCallback(
		chatId => {
			if (!chatId) {
				dispatch(handleClearConversation());
			} else {
				dispatch(selectConversation(chatId));
				dispatch(fetchChatConversation(chatId));
			}
		},
		[dispatch],
	);

	const sendMessage = useCallback(
		(conversation, messageList) => {
			dispatch(fetchChatResponse({ conversation, messages: messageList, currentModel }));
		},
		[dispatch, currentModel],
	);

	const removeConversation = useCallback(
		chatId => {
			dispatch(deleteChatById(chatId));
		},
		[dispatch],
	);

	const renameConversationHandler = useCallback(
		(chatId, newTitle) => {
			if (newTitle.trim()) {
				dispatch(renameConversation({ chatId, newTitle }));
			}
		},
		[dispatch],
	);

	const updateMessageList = useCallback(
		newMessages => {
			dispatch(updateMessages(newMessages));
		},
		[dispatch],
	);

	const changeModel = useCallback(
		modelName => {
			dispatch(setModel(modelName));
		},
		[dispatch],
	);

	const clearConversation = useCallback(() => {
		dispatch(handleClearConversation());
	}, [dispatch]);

	return {
		conversations,
		currentConversation,
		messages,
		model: currentModel,
		isLoading,
		streaming,
		streamContent,

		sendMessageStream,
		loadConversations,
		selectChat,
		sendMessage,
		removeConversation,
		renameConversation: renameConversationHandler,
		updateMessages: updateMessageList,
		changeModel,
		clearConversation,
	};
};
