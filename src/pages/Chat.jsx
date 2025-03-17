import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Slide } from "react-toastify";

import ChatSidebar from '../components/chat/ChatSidebar';
import ChatMessages from '../components/chat/ChatMessages';
import ChatBar from '../components/common/ChatBar';
import Logo from '../components/common/Logo';
import UserAvatar from '../components/common/UserAvatar';
import { AuthContext } from '../contexts/AuthContext';

import '../assets/styles/Chat.css';

function Chat() {
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Getting Started with AI', active: true },
    { id: 2, title: 'Web Development Help', active: false },
    { id: 3, title: 'Python Programming', active: false },
  ]);

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

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newUserMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        content: `This is a simulated response to: "${message}"`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);


  };

  return (
    <div className="flex h-screen bg-primary-900">
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
        conversations={conversations}
        setConversations={setConversations}
      />

      {/* Main Chat Area */}
      <main className={`pb-10 flex-1 flex flex-col transition-all relative ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Messages */}
        <ChatMessages messages={messages} />

        {/* Chat Input */}
        <div className="border-t mb-4 border-primary-700 bg-primary-800 absolute bottom-0 left-[50%] -translate-x-[50%] ">
          <ChatBar
            onSend={handleSendMessage}
            placeholder="Send a message..."
            className="w-full min-w-[800px] max-w-4xl"
          />
        </div>
      </main>
    </div>
  );
}

export default Chat;
