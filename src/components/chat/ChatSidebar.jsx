import { PropTypes } from 'prop-types';
import { FaPlus, FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa6';

function ChatSidebar({ isOpen, onToggle, conversations, setConversations }) {
  const handleNewChat = () => {
    const newConversation = {
      id: Date.now(),
      title: 'New Conversation',
      active: true,
    };
    setConversations(prev => 
      prev.map(conv => ({ ...conv, active: false }))
        .concat(newConversation)
    );
  };

  const handleSelectConversation = (id) => {
    setConversations(prev =>
      prev.map(conv => ({
        ...conv,
        active: conv.id === id,
      }))
    );
  };

  const handleDeleteConversation = (id, e) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(conv => conv.id !== id));
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-primary-800 transition-all duration-300 z-20
        ${isOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 m-4 px-4 py-3 rounded-lg border border-secondary-400/20 hover:bg-primary-700 transition-colors"
          >
            <FaPlus className="text-secondary-400" />
            <span className="text-secondary-200">New Chat</span>
          </button>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer mb-1 group
                  ${conversation.active 
                    ? 'bg-primary-700 text-secondary-300' 
                    : 'text-secondary-200 hover:bg-primary-700/50'}`}
              >
                <span className="truncate">{conversation.title}</span>
                <button
                  onClick={(e) => handleDeleteConversation(conversation.id, e)}
                  className={`text-secondary-400 hover:text-secondary-300 opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-6 z-30 bg-primary-800 p-2 rounded-lg border border-secondary-400/20 hover:bg-primary-700 transition-all
          ${isOpen ? 'left-80' : 'left-4'}`}
      >
        {isOpen ? (
          <FaChevronLeft className="w-4 h-4 text-secondary-400" />
        ) : (
          <FaChevronRight className="w-4 h-4 text-secondary-400" />
        )}
      </button>
    </>
  );
}

ChatSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setConversations: PropTypes.func.isRequired,
};

export default ChatSidebar;
