import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../common/Logo';
import ThemeSwitcher from '../common/ThemeSwitcher';

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

			{/* Button Group */}
			<span className="flex items-center gap-2">
				<ThemeSwitcher />

				{showLoginButton && (
					<>
						<Link to="/auth?type=login" className="btn btn-outline">
							<span>Login</span>
						</Link>
						<Link to="/auth?type=register" className="btn btn-primary">
							<span className="text-white">Register</span>
						</Link>
					</>
				)}
			</span>
		</nav>
	);
}

Nav.propTypes = {
	showNavigationLink: PropTypes.bool,
	showLoginButton: PropTypes.bool,
	className: PropTypes.string,
};

export default Nav;
