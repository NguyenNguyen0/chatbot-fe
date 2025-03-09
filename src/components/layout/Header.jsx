import { Link } from 'react-router-dom';
import Nav from './Nav';
import '../../assets/styles/Header.css';

function Header() {
  return (
    <header className="app-header relative px-6 py-8 md:px-12 bg-gradient-to-r from-primary-700 to-primary-600 shadow-2xl">
      <Nav />

      {/* Hero Section */}
      <div className="mt-20 md:mt-32 mb-32 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-secondary-300 to-secondary-500 text-transparent bg-clip-text">
            Your AI Assistant for
          </span>
          <br />
          <span className="bg-gradient-to-r from-secondary-400 to-secondary-600 text-transparent bg-clip-text">
            Smarter Conversations
          </span>
        </h1>
        
        <p className="text-secondary-200 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Experience the power of AI-driven conversations. Get instant answers, creative ideas, and helpful solutions.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to="/chat" 
            className="btn bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-primary-800 px-8 py-3"
          >
            Start Chatting
          </Link>
          <Link 
            to="/features" 
            className="btn border-secondary-400 text-secondary-300 hover:bg-secondary-400/10 px-8 py-3"
          >
            Learn More
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
