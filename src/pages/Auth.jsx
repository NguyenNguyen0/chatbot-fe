import { useState } from 'react';

import Background from '../components/layout/Background';
import Footer from '../components/layout/Footer';
import AuthModal from '../components/auth/AuthModal';
import Nav from '../components/layout/Nav';
import '../assets/styles/Auth.css';
import { useEffect } from 'react';

function Auth() {
	const [isLogin, setIsLogin] = useState(true);

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const type = queryParams.get('type');

		if (type === 'register') {
			setIsLogin(false);
		} else if (type === 'login') {
			setIsLogin(true);
		}
	}, []);

	return (
		<Background>
			<header className="bg-gradient-to-r from-primary-200 to-primary-300 dark:from-black-700 dark:to-black-600 shadow-xs py-3 px-5">
				<Nav showNavigationLink={false} showLoginButton={false} />
			</header>

			<div className="min-h-screen flex items-center justify-center px-4">
				<AuthModal isLogin={isLogin} setIsLogin={setIsLogin} />
			</div>

			<Footer />
		</Background>
	);
}

export default Auth;
