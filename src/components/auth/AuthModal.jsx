import { PropTypes } from 'prop-types';
import { useRef, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthModal({ isLogin, setIsLogin }) {
	const indicatorRef = useRef(null);
	const tabsRef = useRef(null);

	// Update the indicator position when the tab changes
	useEffect(() => {
		if (indicatorRef.current && tabsRef.current) {
			const activeTab = tabsRef.current.children[isLogin ? 0 : 1];
			const tabRect = activeTab.getBoundingClientRect();
			const containerRect = tabsRef.current.getBoundingClientRect();

			indicatorRef.current.style.width = `${tabRect.width}px`;
			indicatorRef.current.style.transform = `translateX(${tabRect.left - containerRect.left}px)`;
		}
	}, [isLogin]);

	return (
		<div className="auth-modal bg-primary-100 dark:bg-black-800 rounded-2xl p-8 w-full max-w-md border border-primary-400/20">
			{/* Tab Switcher */}
			<div className="relative mb-8">
				<div ref={tabsRef} className="flex">
					<button
						className={`flex-1 py-3 text-lg font-semibold transition-colors ${
							isLogin
								? 'text-primary-500 dark:text-primary-400'
								: 'text-primary-300 hover:text-primary-400 dark:text-primary-100 dark:hover:text-primary-300'
						}`}
						onClick={() => setIsLogin(true)}
					>
						Login
					</button>
					<button
						className={`flex-1 py-3 text-lg font-semibold transition-colors ${
							!isLogin
								? 'text-primary-500 dark:text-primary-400'
								: 'text-primary-300 hover:text-primary-400 dark:text-primary-100 dark:hover:text-primary-300'
						}`}
						onClick={() => setIsLogin(false)}
					>
						Register
					</button>
				</div>

				{/* Animated indicator */}
				<div
					ref={indicatorRef}
					className="absolute bottom-0 h-0.5 bg-primary-500 transition-all duration-300 ease-in-out"
					style={{ width: '50%', transform: `translateX(${isLogin ? 0 : '100%'})` }}
				></div>
			</div>

			{/* Form Container */}
			<div className="form-container">{isLogin ? <LoginForm /> : <RegisterForm />}</div>
		</div>
	);
}

AuthModal.propTypes = {
	isLogin: PropTypes.bool.isRequired,
	setIsLogin: PropTypes.func.isRequired,
};

export default AuthModal;
