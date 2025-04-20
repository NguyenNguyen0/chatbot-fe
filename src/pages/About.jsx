import { Link } from 'react-router-dom';
import { LiaUser } from "react-icons/lia";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoBulbOutline } from "react-icons/io5";
import Background from '../components/layout/Background';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';

const About = () => {
    const benefits = [
        {
            icon: <IoBulbOutline className="w-8 h-8" />,
            title: "Intelligent Conversations",
            description: "Our AI is trained to understand context and provide meaningful responses that feel natural and helpful."
        },
        {
            icon: <HiMagnifyingGlass className="w-8 h-8" />,
            title: "24/7 Availability",
            description: "Get instant responses any time of day, ensuring continuous support for your queries."
        },
        {
            icon: <LiaUser className="w-8 h-8" />,
            title: "Personalized Experience",
            description: "The more you interact, the better our AI understands your preferences and needs."
        }
    ];

    const stats = [
        { number: "99%", label: "User Satisfaction" },
        { number: "24/7", label: "Availability" },
        { number: "100+", label: "Topics Covered" },
        { number: "<1s", label: "Response Time" }
    ];
    return (
        <Background>
            <header className="bg-gradient-to-r from-primary-200 to-primary-300 dark:from-black-700 dark:to-black-600 shadow-xs py-3 px-5">
                <Nav />
            </header>
            <div className="min-h-screen bg-transparent my-20">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.4] font-bold mb-6 bg-gradient-to-r from-primary-300 to-primary-600 bg-clip-text text-transparent">
                            Revolutionizing Conversations with AI
                        </h1>
                        <p className="text-xl text-gray-800 dark:text-gray-300 mb-8">
                            We&apos;re on a mission to make AI-powered conversations more natural, helpful, and accessible to everyone.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link
                                to="/chat"
                                className="btn btn-primary btn-lg"
                            >
                                Start Chatting
                            </Link>
                            <Link
                                to="/features"
                                className="btn btn-outline btn-lg text-primary-500 dark:text-primary-400"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>
                {/* Stats Section */}
                <section className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-4xl font-bold text-primary-500 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-2xl text-gray-800 dark:text-gray-300">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Benefits Section */}
                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
                        Why Choose Our AI Chatbot?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="p-6 backdrop-blur-3xl bg-white/40 dark:bg-black-600/40 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="text-primary-500 mb-4">{benefit.icon}</div>
                                <h3 className="text-2xl font-semibold mb-3 dark:text-white">
                                    {benefit.title}
                                </h3>
                                <p className="text-xl text-gray-600 dark:text-gray-300">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
                {/* How It Works Section */}
                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Ask a Question",
                                description: "Type your question or request in natural language"
                            },
                            {
                                step: "02",
                                title: "AI Processing",
                                description: "Our AI analyzes your input and context to understand your needs"
                            },
                            {
                                step: "03",
                                title: "Get Response",
                                description: "Receive accurate and helpful responses in real-time"
                            }
                        ].map((item, index) => (
                            <div key={index} className="relative">
                                <div className="text-8xl font-bold text-gray-100 dark:text-gray-700">
                                    {item.step}
                                </div>
                                <div className="mt-[-20px] ml-4">
                                    <h3 className="text-2xl font-semibold mb-2 dark:text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-xl text-gray-600 dark:text-gray-300">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Contact Section */}
                <section className="container mx-auto px-4 py-16">
                    <div className="bg-gradient-to-r from-primary-500/70 to-primary-300/70 rounded-2xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="mb-8 text-lg opacity-90">
                            Experience the future of AI-powered conversations today.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link
                                to="/chat"
                                className="px-8 py-3 bg-white text-primary-500 rounded-lg hover:bg-transparent hover:text-white hover:border-white border-2 transition-colors"
                            >
                                Start Chatting
                            </Link>
                            <Link
                                to="/features"
                                className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-500 transition-colors"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>
                {/* Support Section */}
                <section className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4 dark:text-white">
                            Need Help?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            Our support team is here to assist you with any questions or concerns.
                        </p>
                        <a
                            href="mailto:support@example.com"
                            className="text-primary-500 hover:text-primary-600 font-semibold"
                        >
                            support@example.com
                        </a>
                    </div>
                </section>
            </div>

            <Footer />
        </Background>
    );
};
export default About;
