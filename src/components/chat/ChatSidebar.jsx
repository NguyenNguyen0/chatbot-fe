import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { BsThreeDots } from "react-icons/bs";
import DropdownMenu from './DropDownMenu';
import { renameChat } from '../../services';

import { useChat } from '../../hooks/useChat';

function ChatSidebar({ isOpen, onToggle, onOpenDeleteDialog, className }) {
  const navigate = useNavigate();
  const { conversations, selectChat, loadConversations, renameConversation, clearConversation } = useChat();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [editingChatId, setEditingChatId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    loadConversations();
  }, [loadConversations])

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
    navigate('/chat');
    clearConversation();
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
        renameConversation(editingChatId, editValue.trim());
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

      const rect = e.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX + 5,
      });
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-6 z-30 p-2 rounded-lg border bg-slate-100 border-slate-400/30 hover:bg-black-200 dark:bg-black-700 dark:border-slate-400/30 dark:hover:bg-black-600 transition-all cursor-pointer ${isOpen ? 'left-[0.8%]' : 'left-[0.8%]'}`}
      >
        {isOpen ? (
          <FaChevronLeft className="w-4 h-4 text-black-600 dark:text-white" />
        ) : (
          <FaChevronRight className="w-4 h-4 text-black-600 dark:text-white" />
        )}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-slate-100 dark:bg-black-700 transition-all duration-300 z-20
        ${isOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full'} ${className}`}>

        <div className="flex flex-col h-full">
          <div className='min-h-14 flex items-center justify-between'>
            {/* TODO: add some feature here */}
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 m-4 px-4 py-3 rounded-lg border hover:bg-black-200 border-primary-500/50 dark:hover:bg-black-600 transition-colors cursor-pointer"
          >
            <FaPlus className="text-primary-200" />
            <span className="text-black-600 dark:text-white">New Chat</span>
          </button>

          {/* Conversations List */}
          <div className="flex-1 px-2 custom-scrollbar overflow-y-auto">
            {conversations.map((conversation, index) => (
              <div
                key={conversation.chatId ?? index}
                onClick={() => editingChatId !== conversation.chatId && selectChat(conversation.chatId)}
                className={`flex items-center justify-between py-3 px-4 mx-2 border-slate-400/30 border rounded-lg cursor-pointer mb-1 group
                  ${conversation.active
                  ? 'text-black-600 bg-slate-300 dark:bg-black-600 dark:text-white border-primary-400'
                  : 'text-black-600 dark:text-slate-200 hover:bg-black-500/50'}`}
              >
                
                {editingChatId === conversation.chatId ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={completeRename}
                    onKeyDown={handleKeyDown}
                    className="bg-black-500 text-white pl-1 pr-2 py-0.5 rounded w-full outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className="truncate pr-2">{conversation.title}</span>
                )}
                
                <div className="relative flex items-center justify-center">
                  {editingChatId !== conversation.chatId && (
                    <button
                      onClick={(e) => toggleMenu(e, conversation.chatId)}
                      className={`h-full w-full text-slate-500 dark:text-slate-400 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer`}
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