import { Link } from 'react-router-dom';
import { User } from '../../assets/icons';
import PropTypes from 'prop-types';
import Logo from '../common/Logo';

function Nav({ showNavigationLink=true, className }) {
  return (
      <nav className={`flex items-center justify-between ${className}`}>
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          {showNavigationLink && (
              <div className="hidden md:flex items-center gap-8 text-secondary-200">
                  <Link to="/" className="hover:text-secondary-400 transition-colors">
                      Home
                  </Link>
                  <Link to="/features" className="hover:text-secondary-400 transition-colors">
                      Features
                  </Link>
                  <Link to="/about" className="hover:text-secondary-400 transition-colors">
                      About
                  </Link>
              </div>
          )}

          {/* Auth Button */}
          <Link
              to="/auth?type=login"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-secondary-400 hover:bg-secondary-400/10 transition-all"
          >
              <User className="w-5 h-5" />
              <span className="text-secondary-300">Sign In</span>
          </Link>
      </nav>
  )
}

Nav.propTypes = {
  showNavigationLink: PropTypes.bool,
  className: PropTypes.string
}

export default Nav
