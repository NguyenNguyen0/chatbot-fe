import { LiaUser } from "react-icons/lia";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoBulbOutline } from "react-icons/io5";
import Background from '../components/layout/Background';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import '../assets/styles/Feature.css';

const Feature = () => {
  const features = [
    {
      icon: <IoBulbOutline className="w-12 h-12" />,
      title: "AI-Powered Conversations",
      description: "Experience natural conversations with our advanced AI that understands context and provides intelligent responses."
    },
    {
      icon: <HiMagnifyingGlass className="w-12 h-12" />,
      title: "Smart Search & History",
      description: "Easily search through your chat history and find previous conversations with our powerful search functionality."
    },
    {
      icon: <LiaUser className="w-12 h-12" />,
      title: "Personalized Experience",
      description: "Get tailored responses based on your preferences and conversation history."
    }
  ];

  return (
    <Background>
      <header className="bg-gradient-to-r from-black-700 to-black-600 shadow-xs py-3 px-5">
        <Nav />
      </header>
      <div className="min-h-screen bg-transparent my-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
              Powerful Features
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the advanced capabilities of our AI chatbot designed to enhance your conversation experience
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card p-6 rounded-xl bg-white dark:bg-black-800/60 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="feature-icon mb-4 text-primary-600 dark:text-primary-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Detailed Features Section */}
          <div className="space-y-20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">
                  Natural Language Processing
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our advanced NLP algorithms understand context and nuance, making conversations feel natural and intuitive.
                </p>
                <ul className="space-y-2">
                  {[
                    "Context-aware responses",
                    "Multiple language support",
                    "Sentiment analysis",
                    "Entity recognition"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 feature-image-container">
                <div className="bg-gradient-to-r from-primary-300 to-primary-600 rounded-lg p-1">
                  <div className="bg-white dark:bg-black-800/60 rounded-lg p-4">
                    <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">
                      {/* image here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">
                  Smart Learning & Adaptation
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our AI continuously learns from interactions to provide better and more personalized responses over time.
                </p>
                <ul className="space-y-2">
                  {[
                    "Personalized responses",
                    "Learning from feedback",
                    "Adaptive conversation flow",
                    "Continuous improvement"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 feature-image-container">
                <div className="bg-gradient-to-r from-primary-600 to-primary-300 rounded-lg p-1">
                  <div className="bg-white dark:bg-black-800/60 rounded-lg p-4">
                    <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">
                      {/* image here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Background>
  );
};
export default Feature;
