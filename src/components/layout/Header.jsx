import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import '../../assets/styles/Header.css';

function Header({ className }) {
  return (
    <header className={`"app-header relative px-6 py-8 md:px-12 bg-gradient-to-r from-primary-200 to-primary-300  dark:from-black-700 dark:to-black-600 shadow-2xl" ${className}`}>
      <Nav />

      {/* Hero Section */}
      <div className="mt-20 md:mt-32 mb-32 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-primary-400 to-primary-500 text-transparent bg-clip-text">
            Your AI Assistant for
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
            Smarter Conversations
          </span>
        </h1>
        
        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Experience the power of AI-driven conversations. Get instant answers, creative ideas, and helpful solutions.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/chat"
            className="btn btn-primary btn-lg"
          >
            Start Chatting
          </Link>
          <Link
            to="/features"
            className="btn btn-outline btn-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  className: propTypes.string,
}

export default Header;
