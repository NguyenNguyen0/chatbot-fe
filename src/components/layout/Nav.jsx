import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../common/Logo';

function Nav({ showNavigationLink = true, showLoginButton = true, className }) {
    return (
        <nav className={`flex items-center justify-between ${className}`}>
            {/* Logo */}
            <Logo />

            {/* Navigation Links */}
            {showNavigationLink && (
                <div className="hidden md:flex items-center gap-8 text-white">
                    <Link to="/" className="hover:text-primary-400 transition-colors">
                        Home
                    </Link>
                    <Link to="/features" className="hover:text-primary-400 transition-colors">
                        Features
                    </Link>
                    <Link to="/about" className="hover:text-primary-400 transition-colors">
                        About
                    </Link>
                </div>
            )}

            {/* Auth Button */}
            {showLoginButton && (<Link
                to="/auth?type=login"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary-400 hover:bg-primary-400/10 transition-all"
            >
                <span className="text-primary-300 font-bold">Sign In</span>
            </Link>)}
        </nav>
    )
}

Nav.propTypes = {
    showNavigationLink: PropTypes.bool,
    showLoginButton: PropTypes.bool,
    className: PropTypes.string
}

export default Nav
