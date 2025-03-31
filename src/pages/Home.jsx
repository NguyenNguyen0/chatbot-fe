import { useState } from "react";
import Header from "../components/layout/Header";
import Background from "../components/layout/Background";
import Footer from "../components/layout/Footer";
import { LightBulb, MagnifyingGlassIcon, User } from "../assets/icons";
import { FaMicrophone, FaRobot, FaBrain, FaRegComments } from "react-icons/fa6";
import ChatBar from "../components/common/ChatBar";
import '../assets/styles/Home.css';

function Home() {
  const [demoMessage, setDemoMessage] = useState("");

  return (
    <Background>
      <Header />

      {/* Hero Section - Enhanced */}
      <section className="px-6 md:px-12 pt-20 pb-32 text-center relative z-10">
        <div className="animate-float inline-block mb-6">
          <FaRobot className="w-16 h-16 text-secondary-400" />
            </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <div className="bg-gradient-to-r from-secondary-300 to-secondary-500 text-transparent bg-clip-text mb-4">
            Smart Chat with Your AI!
          </div>
          <div className="bg-gradient-to-r from-secondary-400 to-secondary-600 text-transparent bg-clip-text">
            Powerful AI Assistant for Work and Life
          </div>
        </h1>
        <p className="text-secondary-200 text-xl md:text-2xl max-w-3xl mx-auto mb-8">
          Create Smart Chats, Support Work, Study and Entertainment with Our AI.
            </p>
        <a href="/auth" className="inline-block btn bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-primary-800 px-12 py-4 text-lg">
          Try It Now
        </a>
      </section>

      {/* Features Section - Enhanced */}
      <section className="px-6 py-20 md:px-12 bg-primary-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="min-h-12 text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-secondary-300 to-secondary-500 text-transparent bg-clip-text">
            What Can Your Chatbot Do?
          </h2>
          <p className="text-secondary-200 text-center mb-16 text-lg">
            Discover the power of AI-driven conversations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-item">
              <div className="flex items-center justify-center mb-6">
                <LightBulb className="w-12 h-12" colorTop="oklch(0.78 0.21 83)" colorBottom="oklch(0.61 0.35 83)" />
              </div>
              <h3 className="text-xl font-bold text-secondary-300 mb-4 text-center">
                Smart Reply
              </h3>
              <p className="text-secondary-200 text-center">
                AI can answer questions, support learning and working with intelligent responses.
              </p>
            </div>

            <div className="card-item">
              <div className="flex items-center justify-center mb-6">
                <FaMicrophone className="w-12 h-12 text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold text-secondary-300 mb-4 text-center">
                Voice Recognition
              </h3>
              <p className="text-secondary-200 text-center">
                Type or talk to AI easily with advanced voice recognition technology.
              </p>
            </div>

            <div className="card-item">
              <div className="flex items-center justify-center mb-6">
                <MagnifyingGlassIcon className="w-12 h-12" colorTop="oklch(0.78 0.21 83)" colorBottom="oklch(0.61 0.35 83)" />
              </div>
              <h3 className="text-xl font-bold text-secondary-300 mb-4 text-center">
                Smart Search
              </h3>
              <p className="text-secondary-200 text-center">
                Get information quickly without leaving the page using our powerful search.
              </p>
            </div>

            <div className="card-item">
              <div className="flex items-center justify-center mb-6">
                <FaBrain className="w-12 h-12 text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold text-secondary-300 mb-4 text-center">
                Personalized Chat
              </h3>
              <p className="text-secondary-200 text-center">
                Learn from chat history to provide better, more personalized responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="px-6 py-20 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="min-h-12 text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-secondary-300 to-secondary-500 text-transparent bg-clip-text">
            Try It Out
          </h2>
          
          <div className="bg-primary-800/50 rounded-2xl p-6 mb-8">
            <div className="chat-demo-messages mb-4 h-64 overflow-y-auto custom-scrollbar">
              <div className="flex items-start mb-4">
                <FaRobot className="w-8 h-8 text-secondary-400 mr-3 mt-1" />
                <div className="bg-primary-700 rounded-lg p-4 text-secondary-200">
                  Hello! How can I assist you today?
                </div>
              </div>
              {demoMessage && (
                <>
                  <div className="flex items-start mb-4 justify-end">
                    <div className="bg-secondary-500/20 rounded-lg p-4 text-secondary-200">
                      {demoMessage}
                    </div>
                    <User className="w-8 h-8 ml-3 mt-1" />
                  </div>
                  <div className="flex items-start mb-4">
                    <FaRobot className="w-8 h-8 text-secondary-400 mr-3 mt-1" />
                    <div className="bg-primary-700 rounded-lg p-4 text-secondary-200">
                      This is a demo. Try the full version to experience real AI conversations!
                    </div>
                  </div>
                </>
              )}
            </div>
            <ChatBar 
              placeholder="Type a message to try..."
              value={demoMessage}
              onChange={(e) => setDemoMessage(e.target.value)}
              className="bg-primary-700"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 md:px-12 bg-primary-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="min-h-12 text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-secondary-300 to-secondary-500 text-transparent bg-clip-text">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary-700/50 rounded-xl p-8 border border-secondary-400/20">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Nguyen Van A" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-secondary-400/30"
                />
                <div className="ml-4">
                  <p className="text-secondary-400 font-semibold">Anand Viswanathan</p>
                  <p className="text-secondary-200/70 text-sm">Marketing Manager</p>
                </div>
              </div>
              <FaRegComments className="w-8 h-8 text-secondary-400 mb-4" />
              <p className="text-secondary-200 mb-6 text-lg">
                &quot;This chatbot helps me get my work done 50% faster! I can&apos;t live without it!&quot;
              </p>
            </div>

            <div className="bg-primary-700/50 rounded-xl p-8 border border-secondary-400/20">
              <div className="flex items-center mb-6">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1664203067979-47448934fd97?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Tran Thi B" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-secondary-400/30"
                />
                <div className="ml-4">
                  <p className="text-secondary-400 font-semibold">Emma Blue</p>
                  <p className="text-secondary-200/70 text-sm">English Student</p>
                </div>
              </div>
              <FaRegComments className="w-8 h-8 text-secondary-400 mb-4" />
              <p className="text-secondary-200 mb-6 text-lg">
                &quot;I use the chatbot every day to learn English. It&apos;s amazing!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="my-20 px-6 py-20 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="min-h-12 text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-secondary-300 to-secondary-500 text-transparent bg-clip-text">
            Ready to experience smart AI?
          </h2>
          <p className="text-secondary-200 text-xl mb-8">
            Join thousands of users who are already benefiting from AI-powered conversations.
          </p>
          <a href="/auth" className="inline-block btn bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-primary-800 px-12 py-4 text-lg">
            Get Started Now
          </a>
        </div>
      </section>
      <Footer />
    </Background>
  );
}

export default Home;
