import { useState, useEffect } from 'react';

import Nav from '../components/layout/Nav';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatMessages from '../components/chat/ChatMessages';
import ChatBar from '../components/common/ChatBar';
import UserAvatar from '../components/common/UserAvatar';
import Dialog from '../components/common/Dialog';
import ChatModelSelector from '../components/chat/ChatModelSelector';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../hooks/useAuth';
import SidebarButton from '../components/chat/SidebarButton';

import '../assets/styles/Chat.css';


function Chat() {
  const { currentConversation, messages, updateMessages, sendMessageStream, removeConversation, isLoading } = useChat();
  const { user, initializeAuth } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(localStorage.getItem('isSidebarOpen') === 'true' || false);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    conversationId: null
  });

  useEffect(() => {
    localStorage.setItem('isSidebarOpen', isSidebarOpen);
  }, [isSidebarOpen]);

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth]);

  const handleDeleteConversation = (conversationId) => {
    removeConversation(conversationId);
    setDeleteDialog({ isOpen: false, conversationId: null });
  };

  const handleOpenDeleteDialog = (conversationId) => {
    setDeleteDialog({
      isOpen: true,
      conversationId
    });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ isOpen: false, conversationId: null });
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    const newMessages = [...messages, { role: 'user', content: message }];
    updateMessages(newMessages);
    sendMessageStream(currentConversation, newMessages);
  };

  return (
    <div className="h-screen bg-slate-100 dark:bg-gradient-to-r dark:from-black-600 dark:via-black-700 dark:to-black-600">
      {/* Sidebar */}
      {user && (
        <ChatSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenDeleteDialog={handleOpenDeleteDialog}
        />
      )}

      {/* Main Chat Area */}
      <main className={`h-full pb-10 pt-8 flex flex-col transition-all relative ${user && isSidebarOpen ? 'md:ml-80' : 'ml-0'}`}>
        {/* Chat Header */}
        <header className='z-4 -mt-8 pt-2 flex items-center justify-between bg-transparent'>
          <div className={`flex items-center justify-start min-h-14 mt-2 z-10 transition-all duration-300 ease-in-out ${user && isSidebarOpen ? ' translate-x-0 ml-2' : ' -translate-x-1 ml-6'}`}>
            {/* Sidebar button */}
            {(!isSidebarOpen && user) && (
              <SidebarButton
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            )}

            {/* Model AI Selector */}
            {user && <ChatModelSelector />}
          </div>

          {/* User avatar */}
          {user && (
            <div className='mr-4 z-10'>
              <UserAvatar avatar={user.avatar} name={user.name} />
            </div>
          )}

          {/* Nav */}
          {!user && <Nav showNavigationLink={false} className='w-full' />}
        </header>

        {/* Messages */}
        <ChatMessages messages={messages} />

        {/* Chat Input */}
        <div
          className={
            "max-w-[500px] w-[100%] rounded-4xl mb-5 shadow-[2px_2px_4px_black] shadow-black-700/30  bg-transparent absolute left-[50%] -translate-x-[50%] " +
            (messages?.length !== 0 ? "bottom-0" : "bottom-[40%] -translate-y-50%")
          }
        >
          <ChatBar
            disabled={isLoading}
            onSend={handleSendMessage}
            placeholder="Send a message..."
            className="shadow-none z-10"
          />
        </div>

        {/* Delete Dialog */}
        <Dialog
          isOpen={deleteDialog.isOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={() => handleDeleteConversation(deleteDialog.conversationId)}
          title="Delete Conversation"
          message="Are you sure you want to delete this conversation?"
        />
      </main>
    </div>
  );
}

export default Chat;