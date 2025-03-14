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
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-6 z-30 bg-primary-800 p-2 rounded-lg border border-secondary-400/20 hover:bg-primary-700 transition-all cursor-pointer
      ${isOpen ? 'left-[0.8%]' : 'left-[0.8%]'}`}
      >
        {isOpen ? (
          <FaChevronLeft className="w-4 h-4 text-secondary-400" />
        ) : (
          <FaChevronRight className="w-4 h-4 text-secondary-400" />
        )}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-primary-700 transition-all duration-300 z-20
        ${isOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full'}`}>

        <div className="flex flex-col h-full">
          <div className='min-h-14 flex items-center justify-between border-b border-primary-700'>
            {/* TODO: add some feature here */}
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 m-4 px-4 py-3 rounded-lg border border-secondary-500/50 hover:bg-primary-600 transition-colors cursor-pointer"
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
                className={`flex items-center justify-between py-3 px-4 mx-2 border-secondary-400/20 border rounded-lg cursor-pointer mb-1 group
                  ${conversation.active
                    ? 'bg-primary-600 text-secondary-300'
                    : 'text-secondary-200 hover:bg-primary-500/50'}`}
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
