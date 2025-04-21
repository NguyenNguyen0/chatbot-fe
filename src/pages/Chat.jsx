import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Slide } from "react-toastify";

import ChatSidebar from '../components/chat/ChatSidebar';
import ChatMessages from '../components/chat/ChatMessages';
import ChatBar from '../components/common/ChatBar';
import Logo from '../components/common/Logo';
import UserAvatar from '../components/common/UserAvatar';
import Dialog from '../components/common/Dialog';
import ChatModelSelector from '../components/chat/ChatModelSelector';
import { AuthContext } from '../contexts/AuthContext';
import { useChat } from '../hooks/useChat';

import '../assets/styles/Chat.css';


function Chat() {
  const { currentConversation, messages, updateMessages, sendMessage, removeConversation } = useChat();
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Add delete dialog state to Chat component
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    conversationId: null
  });

  useEffect(() => {
    if (state?.isNewUser) {
      state.isNewUser = false;
    } else if (state?.isLogin) {
      state.isLogin = false;
    }

    if (state?.message) {
      toast.success(state.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  }, [state])

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
    sendMessage(currentConversation, newMessages);
  };

  return (
    <div className="flex h-screen relative bg-slate-100 dark:bg-gradient-to-r dark:from-black-600 dark:via-black-700 dark:to-black-600">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
      />

      {/* Sidebar */}
      {user && (
        <ChatSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenDeleteDialog={handleOpenDeleteDialog}
          className="shadow-black-700/30 shadow"
        />
      )}

      {/* Main Chat Area */}
      <main className={`pb-10 pt-8 flex-1 flex flex-col transition-all relative ${user && isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Chat Header */}
        <header className='-mt-8 pt-2 flex items-center justify-between bg-transparent'>
          {/* Model AI Selector */}
          <div className={`min-h-14 mt-2 z-10 ${user && isSidebarOpen ? 'ml-2' : 'ml-15'}`}>
            {user && <ChatModelSelector />}
          </div>

          <div className='mr-4 z-10'>
            {user
              ? <UserAvatar />
              : <Logo />
            }
          </div>
        </header>

        {/* Messages */}
        <ChatMessages messages={messages} />

        {/* Chat Input */}
        <div
          className={
            "rounded-4xl mb-5 shadow-[2px_2px_4px_black] shadow-black-700/30  bg-transparent absolute left-[50%] -translate-x-[50%] " + 
            (messages?.length !== 0  ? "bottom-0" : "bottom-[40%] -translate-y-50%")
        }
        >
          <ChatBar
            onSend={handleSendMessage}
            placeholder="Send a message..."
            className="w-full min-w-[800px] max-w-4xl shadow-none"
          />
        </div>
      </main>

      {/* Dialog moved to main component */}
      <Dialog
        isOpen={deleteDialog.isOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={() => handleDeleteConversation(deleteDialog.conversationId)}
        title="Delete Conversation"
        message="Are you sure you want to delete this conversation?"
      />
    </div>
  );
}

export default Chat;