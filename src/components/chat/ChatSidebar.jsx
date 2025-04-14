import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useState, useEffect } from 'react';
import { FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { BsThreeDots } from "react-icons/bs";
import { ChatContext } from '../../contexts/ChatContext';
import DropdownMenu from './DropDownMenu';
import { renameChat } from '../../services';

function ChatSidebar({ isOpen, onToggle, onOpenDeleteDialog, className }) {
  const navigate = useNavigate();
  const { conversations, selectConversation, setCurrentConversation, setConversations, setMessages } = useContext(ChatContext);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [editingChatId, setEditingChatId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when editing starts
  useEffect(() => {
    if (editingChatId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingChatId]);

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

  const startRenameConversation = (chatId) => {
    const conversation = conversations.find(c => c.chatId === chatId);
    if (conversation) {
      setEditingChatId(chatId);
      setEditValue(conversation.title);
    }
    setOpenMenuId(null);
  };

  const completeRename = () => {
    if (!editingChatId || !editValue.trim()) {
      setEditingChatId(null);
      return;
    }

    renameChat(editingChatId, editValue.trim())
      .then(() => {
        setConversations((prevConversations) =>
          prevConversations.map((conversation) =>
            conversation.chatId === editingChatId
              ? { ...conversation, title: editValue.trim() }
              : conversation
          )
        );
      })
      .catch((error) => {
        console.error('Error renaming chat:', error);
      })
      .finally(() => {
        setEditingChatId(null);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      completeRename();
    } else if (e.key === 'Escape') {
      setEditingChatId(null);
    }
  };

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
                onClick={() => editingChatId !== conversation.chatId && selectConversation(conversation.chatId)}
                className={`flex items-center justify-between py-3 px-4 mx-2 border-secondary-400/20 border rounded-lg cursor-pointer mb-1 group
                  ${conversation.active
                    ? 'bg-primary-600 text-secondary-400'
                    : 'text-secondary-200 hover:bg-primary-500/50'}`}
              >
                
                {editingChatId === conversation.chatId ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={completeRename}
                    onKeyDown={handleKeyDown}
                    className="bg-primary-500 text-secondary-200 px-2 py-0.5 rounded w-full outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className="truncate pr-2">{conversation.title}</span>
                )}
                
                <div className="relative flex items-center justify-center">
                  {editingChatId !== conversation.chatId && (
                    <button
                      onClick={(e) => toggleMenu(e, conversation.chatId)}
                      className={`h-full w-full text-secondary-400 hover:text-secondary-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer`}
                    >
                      <BsThreeDots className="w-5 h-5" />
                    </button>
                  )}

                  {openMenuId === conversation.chatId && (
                    <DropdownMenu
                      position={dropdownPosition}
                      onClose={() => setOpenMenuId(null)}
                      onRename={() => startRenameConversation(conversation.chatId)}
                      onDelete={() => onOpenDeleteDialog(conversation.chatId)}
                      dropdownRef={dropdownRef}
                    />
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