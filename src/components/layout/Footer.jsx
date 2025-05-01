import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import FooterWave from '../ui/FooterWave';

import '../../assets/styles/Footer.css';

function Footer() {
    const { getCurrentTheme } = useContext(ThemeContext)
    const theme = getCurrentTheme()

    return (
        <footer className='position-relative'>
            {/* Wave animation */}
            <div className="waves">
                {[1, 2, 3, 4].map((waveId) => (
                    <div className="wave" id={`wave${waveId}`} key={waveId}>
                        <FooterWave theme={theme} />
                        <FooterWave theme={theme} />
                    </div>
                ))}
            </div>

            <div className='bg-primary-300 dark:bg-black-700 pb-12 pt-20'>
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1">
                            <h2 className="md:text-left text-center text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-800 dark:from-primary-300 dark:to-primary-500 text-transparent bg-clip-text mb-4">
                                Chat AI
                            </h2>
                            <p className="md:text-left text-center text-slate-100 dark:text-white">
                                Your intelligent companion for smarter conversations and creative solutions.
                            </p>
                        </div>
                        <div className="col-span-1">
                            <h3 className="md:text-left text-center text-primary-600 dark:text-primary-300 font-semibold mb-4">Quick Links</h3>
                            <ul className="md:text-left text-center space-y-2">
                                <li>
                                    <Link to="/" className="text-slate-100 dark:text-white hover:text-primary-500 transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="text-slate-100 dark:text-white hover:text-primary-500 transition-colors">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/chat" className="text-slate-100 dark:text-white hover:text-primary-500 transition-colors">
                                        Start Chat
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-1">
                            <h3 className="md:text-left text-center text-primary-600 dark:text-primary-300 font-semibold mb-4">Resources</h3>
                            <ul className="md:text-left text-center space-y-2">
                                <li>
                                    <Link to="#" className="text-slate-100 dark:text-white hover:text-primary-500 transition-colors">
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="text-slate-100 dark:text-white hover:text-primary-500 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="text-slate-100 dark:text-white hover:text-primary-500 transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-1">
                            <h3 className="md:text-left text-center text-primary-600 dark:text-primary-300 font-semibold mb-4">Connect With Us</h3>
                            <div className="md:justify-start justify-center flex space-x-4">
                                <a 
                                    href="https://github.com/NguyenNguyen0" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-slate-100 dark:text-white hover:text-primary-500 transition-colors"
                                >
                                    <FaGithub className="w-6 h-6" />
                                </a>
                                <a 
                                    href="#" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-slate-100 dark:text-white hover:text-primary-500 transition-colors"
                                >
                                    <FaTwitter className="w-6 h-6" />
                                </a>
                                <a 
                                    href="#" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-slate-100 dark:text-white hover:text-primary-500 transition-colors"
                                >
                                    <FaLinkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-black-700 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-slate-100 dark:text-white  text-sm mb-4 md:mb-0">
                                © 2024 Chat AI. All rights reserved.
                            </p>
                            <p className="text-slate-100 dark:text-white text-sm flex items-center">
                                Made with 
                                <span className="text-primary-600 dark:text-primary-400 mx-1">♥</span> 
                                by 
                                <a 
                                    href="https://github.com/NguyenNguyen0" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary-600 dark:text-primary-400 hover:text-primary-500 ml-1 transition-colors"
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
