import '../../assets/styles/Footer.css';
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='position-relative'>
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>

            <div className='bg-black-700 pb-12 pt-20'>
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-300 to-primary-500 text-transparent bg-clip-text mb-4">
                                Chat AI
                            </h2>
                            <p className="text-white">
                                Your intelligent companion for smarter conversations and creative solutions.
                            </p>
                        </div>
                        <div className="col-span-1">
                            <h3 className="text-primary-300 font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="text-white hover:text-primary-400 transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="text-white hover:text-primary-400 transition-colors">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/chat" className="text-white hover:text-primary-400 transition-colors">
                                        Start Chat
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-1">
                            <h3 className="text-primary-300 font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="#" className="text-white hover:text-primary-400 transition-colors">
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="text-white hover:text-primary-400 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="text-white hover:text-primary-400 transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-1">
                            <h3 className="text-primary-300 font-semibold mb-4">Connect With Us</h3>
                            <div className="flex space-x-4">
                                <a 
                                    href="https://github.com/NguyenNguyen0" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-primary-400 transition-colors"
                                >
                                    <FaGithub className="w-6 h-6" />
                                </a>
                                <a 
                                    href="#" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-primary-400 transition-colors"
                                >
                                    <FaTwitter className="w-6 h-6" />
                                </a>
                                <a 
                                    href="#" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-primary-400 transition-colors"
                                >
                                    <FaLinkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-black-700 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-white text-sm mb-4 md:mb-0">
                                © 2024 Chat AI. All rights reserved.
                            </p>
                            <p className="text-white text-sm flex items-center">
                                Made with 
                                <span className="text-primary-400 mx-1">♥</span> 
                                by 
                                <a 
                                    href="https://github.com/NguyenNguyen0" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary-400 hover:text-primary-300 ml-1 transition-colors"
                                >
                                    NguyenNguyen0
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
