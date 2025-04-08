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
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';

import '../assets/styles/Chat.css';


function Chat() {
  const { setConversations, messages, getChatResponse, currentConversation } = useContext(ChatContext);
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
    setConversations(prevConversations =>
      prevConversations.filter(conv => conv.id !== conversationId)
    );

    // Close the dialog after deleting
    setDeleteDialog({ isOpen: false, conversationId: null });
  };

  // Handle opening the delete dialog
  const handleOpenDeleteDialog = (conversationId) => {
    setDeleteDialog({
      isOpen: true,
      conversationId
    });
  };

  // Handle closing the delete dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ isOpen: false, conversationId: null });
  };

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    getChatResponse(currentConversation, { role: 'user', content: message });

  };

  return (
    <div className="flex h-screen relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600">
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

      {user
        ? <UserAvatar className={"absolute top-4 right-4 z-10"} />
        : <Logo className="absolute right-6 top-4 z-10" />
      }

      {/* Sidebar */}
      <ChatSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenDeleteDialog={handleOpenDeleteDialog}
        className="shadow-primary-700/30 shadow"
      />

      {/* Main Chat Area */}
      <main className={`pb-10 pt-8 flex-1 flex flex-col transition-all relative ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Messages */}
        <ChatMessages messages={messages} />

        {/* Chat Input */}
        <div className="rounded-4xl mb-5 shadow-[2px_2px_4px_black] shadow-primary-700/30  bg-transparent absolute bottom-0 left-[50%] -translate-x-[50%] ">
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