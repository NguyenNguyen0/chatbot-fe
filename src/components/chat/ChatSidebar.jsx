import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useState, useEffect } from 'react';
import { FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { MdEdit, MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { ChatContext } from '../../contexts/ChatContext';

function ChatSidebar({ isOpen, onToggle, onOpenDeleteDialog, className }) {
  const navigate = useNavigate();
  const { conversations, selectConversation, setCurrentConversation, setMessages } = useContext(ChatContext);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const onRenameConversation = (chatId) => {
    console.log('Rename conversation:', chatId);
    // TODO: Implement rename functionality

  }

  const toggleMenu = (e, chatId) => {
    e.stopPropagation();

    if (openMenuId === chatId) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(chatId);

      // Calculate position relative to the clicked button
      const rect = e.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX + 5, // Add a small gap
      });
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-6 z-30 bg-primary-800 p-2 rounded-lg border border-secondary-400/20 hover:bg-primary-700 transition-all cursor-pointer ${isOpen ? 'left-[0.8%]' : 'left-[0.8%]'}`}
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
          <div className="flex-1 px-2 custom-scrollbar overflow-y-auto">
            {conversations.map((conversation, index) => (
              <div
                key={conversation.chatId ?? index}
                onClick={() => selectConversation(conversation.chatId)}
                className={`flex items-center justify-between py-3 px-4 mx-2 border-secondary-400/20 border rounded-lg cursor-pointer mb-1 group
                  ${conversation.active
                    ? 'bg-primary-600 text-secondary-400'
                    : 'text-secondary-200 hover:bg-primary-500/50'}`}
              >
                <span className="truncate pr-2">{conversation.title}</span>
                <div className="relative flex items-center justify-center">
                  <button
                    onClick={(e) => toggleMenu(e, conversation.chatId)}
                    className={`h-full w-full text-secondary-400 hover:text-secondary-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer`}
                  >
                    <BsThreeDots className="w-5 h-5" />
                  </button>

                  {openMenuId === conversation.chatId && (
                    <div
                      ref={dropdownRef}
                      style={{
                        width: '12rem', // equivalent to w-48
                        left: `${dropdownPosition.left}px`,
                        top: `${dropdownPosition.top}px`,
                      }}
                      className="fixed z-[100] bg-primary-700 rounded-md shadow-lg py-1 border border-secondary-500/20"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRenameConversation(conversation.chatId);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center w-full px-4 py-2 text-left text-secondary-200 hover:bg-primary-600"
                      >
                        <MdEdit className="w-4 h-4 mr-2" />
                        Rename
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDeleteDialog(conversation.chatId);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center w-full px-4 py-2 text-left text-secondary-200 hover:bg-primary-600"
                      >
                        <MdDelete className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
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