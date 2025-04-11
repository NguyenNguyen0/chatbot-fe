import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FaPlus, FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa6';
import { ChatContext } from '../../contexts/ChatContext';

function ChatSidebar({ isOpen, onToggle, onOpenDeleteDialog, className }) {
  const navigate = useNavigate();
  const { conversations, selectConversation, setCurrentConversation, setMessages } = useContext(ChatContext);

  const handleNewChat = () => {
    const newConversation = {
      chatId: null,
      model: 'llama3',
      messages: [],
      title: 'New Conversation',
      active: true,
      createdAt: new Date().toISOString(),
      isNew: true,
    };
    
    navigate('/chat');

    setMessages([]);
    setCurrentConversation(newConversation);
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
        ${isOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full'} ${className}`}>

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
            {conversations.map((conversation, index) => (
              <div
                key={conversation.chatId ?? index}
                onClick={() => selectConversation(conversation.chatId)}
                className={`flex items-center justify-between py-3 px-4 mx-2 border-secondary-400/20 border rounded-lg cursor-pointer mb-1 group
                  ${conversation.active
                    ? 'bg-primary-600 text-secondary-400'
                    : 'text-secondary-200 hover:bg-primary-500/50'}`}
              >
                <span className="truncate">{conversation.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering conversation selection
                    console.log("Deleting conversation with ID: " + conversation.chatId);
                    onOpenDeleteDialog(conversation.chatId);
                  }}
                  className={`text-secondary-400 hover:text-secondary-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer`}
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
  onOpenDeleteDialog: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ChatSidebar;