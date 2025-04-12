import { useEffect, useRef, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { FaRobot } from 'react-icons/fa6';
import { GoCopy } from "react-icons/go";
import { TfiReload } from "react-icons/tfi";
import { ChatContext } from '../../contexts/ChatContext';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


function ChatMessages() {
  const { messages } = useContext(ChatContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        // Optional: add some feedback that copying worked
        console.log('Message copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy message: ', err);
      });
  };

  const handleReloadMessage = (messageId) => {
    // Implement regeneration logic here
    console.log('Reload message:', messageId);
    // This would typically call a function passed from the parent component
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-secondary-200">
          <div className="text-center">
            <FaRobot className="w-12 h-12 mx-auto mb-4 text-secondary-400" />
            <p className="text-xl">Start a conversation!</p>
            <p className="text-secondary-400 mt-2">Ask me anything...</p>
          </div>
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
                  <button
                    onClick={() => handleCopyMessage(message.content)}
                    className="text-secondary-200/90 hover:text-secondary-300 p-1 rounded-md hover:bg-secondary-500/10 cursor-pointer"
                    title="Copy message"
                  >
                    <GoCopy className="w-4 h-4" />
                  </button>

                  {message.role !== 'user' && (
                    <button
                      onClick={() => handleReloadMessage(message.chatId)}
                      className="text-secondary-200/90 hover:text-secondary-300 p-1 rounded-md hover:bg-secondary-500/10 cursor-pointer"
                      title="Regenerate response"
                    >
                      <TfiReload className="w-4 h-4" />
                    </button>
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