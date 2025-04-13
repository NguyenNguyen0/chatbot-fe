import { useEffect, useRef, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { TfiReload } from "react-icons/tfi";
import { ChatContext } from '../../contexts/ChatContext';
import { MdModeEdit } from "react-icons/md";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import CopyUtilButton from './CopyUtilButton';
import UtilButton from './UtilButton';

function ChatMessages() {
  const { messages } = useContext(ChatContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEditMessage = () => {
    // Implement edit logic here
    console.log('Edit message');
    // This would typically call a function passed from the parent component
  }

  const handleReloadMessage = (messageId) => {
    // Implement regeneration logic here
    console.log('Reload message:', messageId);
    // This would typically call a function passed from the parent component
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center -mt-30 text-secondary-400">
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
                    ? 'bg-primary-500/20 text-white'
                    : 'max-w-3xl bg-transparent text-gray-100'
                  }`}
              >
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

                {/* Utility buttons - hidden by default, shown on hover */}
                <div
                  className={`absolute -bottom-7 ${message.role === 'user' ? 'right-1' : 'left-2.5'} 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                  flex gap-2 mt-2`}
                >
                  <CopyUtilButton content={message.content} />

                  {message.role !== 'user' && (
                    <UtilButton onClick={() => handleReloadMessage(message.chatId)} icon={<TfiReload className='w-4 h-4' />} title="Resend message" />
                  )}

                  {message.role === 'user' && (
                    <UtilButton onClick={() => handleEditMessage()} icon={<MdModeEdit className='w-4 h-4' />} title="Edit message" />
                  )}
                </div>
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
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.oneOf(['user', 'assistant']).isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
};

export default ChatMessages;