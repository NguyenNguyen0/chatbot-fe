import { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { FaRobot } from 'react-icons/fa6';
import { User } from '../../assets/icons';

function ChatMessages({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              {/* {message.sender === 'bot' ? (
                <FaRobot className="w-8 h-8 text-secondary-400 mt-1" />
              ) : (
                <User className="w-8 h-8 mt-1" />
              )} */}

              {/* Message Content */}
              <div
                className={`flex-1 rounded-lg p-4 max-w-2xl ${
                  message.sender === 'user'
                    ? 'bg-secondary-500/20 text-secondary-200'
                    : 'bg-primary-700 text-secondary-200'
                }`}
              >
                {message.content}
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
      sender: PropTypes.oneOf(['user', 'bot']).isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
};

export default ChatMessages;
