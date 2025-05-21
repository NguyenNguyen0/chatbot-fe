import { useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import { TfiReload } from 'react-icons/tfi';
import { MdModeEdit } from 'react-icons/md';

import CopyUtilButton from './CopyUtilButton';
import UtilButton from './UtilButton';
import MarkdownRenderer from '../common/MarkdownRenderer';
import ScrollDownButton from './ScrollDownButton';
import LoadingAnimation from '../common/LoadingAnimation';
import { useChat } from '../../hooks/useChat';

function ChatMessages() {
	const {
		messages,
		currentConversation,
		updateMessages,
		sendMessageStream,
		isLoading,
		streaming,
		streamContent,
	} = useChat();
	const [editingMessageIndex, setEditingMessageIndex] = useState(null);
	const [editContent, setEditContent] = useState('');
	const messagesEndRef = useRef(null);
	const textareaRef = useRef(null);
	const containerRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages.length, streamContent]);

	useEffect(() => {
		if (editingMessageIndex !== null && textareaRef.current) {
			textareaRef.current.focus();
			textareaRef.current.select();
		}
	}, [editingMessageIndex]);

	const handleEditMessage = index => {
		setEditingMessageIndex(index);
		setEditContent(messages[index].content);
	};

	const handleCancelEdit = () => {
		setEditingMessageIndex(null);
		setEditContent('');
	};

	const handleSubmitEdit = async index => {
		if (editContent.trim() === '') return;

		let updatedMessages = messages.slice(0, index);
		updatedMessages.push({ role: 'user', content: editContent });

		setEditingMessageIndex(null);
		setEditContent('');

		updateMessages(updatedMessages);
		sendMessageStream(currentConversation, updatedMessages);
	};

	const handleReloadMessage = async index => {
		let updatedMessages = messages.slice(0, index);
		updateMessages(updatedMessages);
		sendMessageStream(currentConversation, updatedMessages);
	};

	return (
		<>
			<div className="h-full overflow-y-auto p-4 custom-scrollbar" ref={containerRef}>
				{messages.length === 0 ? (
					<div className="h-full flex items-center justify-center -mt-30 text-black-500 dark:text-white">
						<h1 className="text-center text-4xl font-bold">How Can I Help You?</h1>
					</div>
				) : (
					<div className="max-w-4xl mx-auto space-y-6 mb-50">
						{messages.map((message, index) => (
							<div
								key={index}
								className={`flex items-start gap-5 group ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
							>
								{/* Message Content with utility buttons at bottom */}
								<div
									className={`flex-1 rounded-lg p-4 max-w-2xl relative ${
										message.role === 'user'
											? ' bg-slate-200 text-slate-700 dark:bg-black-600 dark:text-white'
											: 'max-w-4xl bg-transparent text-slate-700 dark:text-gray-100'
									}`}
								>
									{message.role === 'user' ? (
										editingMessageIndex === index ? (
											<div className="flex flex-col gap-3">
												<textarea
													ref={textareaRef}
													value={editContent}
													onChange={e => setEditContent(e.target.value)}
													className="w-full bg-slate-300 text-slate-700 dark:bg-black-600 dark:text-white p-2 rounded-md border border-primary-400/30 focus:outline-none focus:border-white/20 min-h-[100px]"
												/>
												<div className="flex justify-end gap-2 mt-1">
													<button
														onClick={handleCancelEdit}
														className="btn btn-sm bg-black-700 hover:bg-black-600 text-white"
													>
														Cancel
													</button>
													<button
														onClick={() => handleSubmitEdit(index)}
														className="btn btn-sm btn-primary"
													>
														Save
													</button>
												</div>
											</div>
										) : (
											<div>{message.content}</div>
										)
									) : (
										<MarkdownRenderer content={message.content} />
									)}
									{/* Utility buttons - hidden by default, shown on hover */}
									{editingMessageIndex !== index && (
										<div
											className={`absolute -bottom-7 ${message.role === 'user' ? 'right-1' : 'left-2.5'}
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      flex gap-2 mt-2 ${isLoading ? 'hidden' : ''}`}
										>
											<CopyUtilButton content={message.content} />
											{message.role === 'assistant' && (
												<UtilButton
													onClick={() => handleReloadMessage(index)}
													icon={<TfiReload className="w-4 h-4" />}
													title="Resend message"
												/>
											)}
											{message.role === 'user' && (
												<UtilButton
													onClick={() => handleEditMessage(index)}
													icon={<MdModeEdit className="w-4 h-4" />}
													title="Edit message"
												/>
											)}
										</div>
									)}
								</div>
							</div>
						))}

						{streaming && (
							<div className="flex items-start gap-5 group">
								<div className="flex-1 rounded-lg p-4 relative max-w-4xl bg-transparent text-slate-700 dark:text-gray-100">
									{streamContent ? (
										<MarkdownRenderer content={streamContent} />
									) : (
										<LoadingAnimation />
									)}
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>
				)}
			</div>
			<ScrollDownButton containerRef={containerRef} threshold={200} />
		</>
	);
}

ChatMessages.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			content: PropTypes.string.isRequired,
			role: PropTypes.oneOf(['user', 'assistant']).isRequired,
			timestamp: PropTypes.instanceOf(Date),
		}),
	),
};

export default ChatMessages;
