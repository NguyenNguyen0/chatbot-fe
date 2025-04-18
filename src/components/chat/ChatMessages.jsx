import { useEffect, useRef, useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import { TfiReload } from "react-icons/tfi";
import { ChatContext } from '../../contexts/ChatContext';
import { MdModeEdit } from "react-icons/md";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import CopyUtilButton from './CopyUtilButton';
import UtilButton from './UtilButton';

function ChatMessages() {
  const { messages, updateMessages, currentConversation, getChatResponse } = useContext(ChatContext);
  const messagesEndRef = useRef(null);
  const [editingMessageIndex, setEditingMessageIndex] = useState(null);
  const [editContent, setEditContent] = useState('');
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (editingMessageIndex !== null && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [editingMessageIndex]);

  const handleEditMessage = (index) => {
    setEditingMessageIndex(index);
    setEditContent(messages[index].content);
  };

  const handleCancelEdit = () => {
    setEditingMessageIndex(null);
    setEditContent('');
  };

  const handleSubmitEdit = async (index) => {
    if (editContent.trim() === '') return;

    let updatedMessages = messages.slice(0, index);
    updatedMessages.push({ role: 'user', content: editContent });
    updatedMessages = await updateMessages(updatedMessages);

    setEditingMessageIndex(null);
    setEditContent('');

    getChatResponse(currentConversation, updatedMessages);
  };

  const handleReloadMessage = async (index) => {
    let updatedMessages = messages.slice(0, index);
    updatedMessages = await updateMessages(updatedMessages);
    getChatResponse(currentConversation, updatedMessages);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center -mt-30 text-primary-400">
          <h1 className="text-center text-4xl font-bold">How Can I Help You?</h1>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6 mb-30">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-5 group ${message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
            >
              {/* Message Content with utility buttons at bottom */}
              <div
                className={`flex-1 rounded-lg p-4 max-w-2xl relative ${message.role === 'user'
                  ? 'bg-black-500/20 text-white'
                  : 'max-w-3xl bg-transparent text-gray-100'
                  }`}
              >

                {message.role === 'user' ? (
                  editingMessageIndex === index ? (
                    <div className="flex flex-col gap-3">
                      <textarea
                        ref={textareaRef}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full bg-black-600 text-white p-2 rounded-md border border-primary-400/30 focus:outline-none focus:border-white/20 min-h-[100px]"
                      />
                      <div className="flex justify-end gap-2 mt-1">
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 rounded-md bg-black-700 hover:bg-black-600 text-white transition-colors text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSubmitEdit(index)}
                          className="px-3 py-1 rounded-md bg-primary-600 hover:bg-primary-500 text-white transition-colors text-sm"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {message.content}
                    </div>
                  )
                ) : (
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ ...props }) => <p className="whitespace-pre-wrap break-words" {...props} />,
                      code: ({ ...props }) => <code className="whitespace-pre-wrap break-all" {...props} />,
                      pre: ({ ...props }) => <pre className="whitespace-pre-wrap overflow-auto" {...props} />
                    }}
                  >
                    {message.content}
                  </Markdown>
                )}

                {/* Utility buttons - hidden by default, shown on hover */}
                {editingMessageIndex !== index && (
                  <div
                    className={`absolute -bottom-7 ${message.role === 'user' ? 'right-1' : 'left-2.5'} 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                    flex gap-2 mt-2`}
                  >
                    <CopyUtilButton content={message.content} />

                    {message.role === 'assistant' && (
                      <UtilButton onClick={() => handleReloadMessage(index)} icon={<TfiReload className='w-4 h-4' />} title="Resend message" />
                    )}

                    {message.role === 'user' && (
                      <UtilButton onClick={() => handleEditMessage(index)} icon={<MdModeEdit className='w-4 h-4' />} title="Edit message" />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

ChatMessages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      content: PropTypes.string.isRequired,
      role: PropTypes.oneOf(['user', 'assistant']).isRequired,
      timestamp: PropTypes.instanceOf(Date),
    })
  ),
};

export default ChatMessages;