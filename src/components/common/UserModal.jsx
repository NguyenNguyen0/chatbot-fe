import propTypes from 'prop-types';
import { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

import { User } from '../../assets/icons';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

const UserModal = ({ onClose }) => {
	const navigate = useNavigate();
	const { theme, setTheme } = useContext(ThemeContext);
	const { user, logout } = useAuth();
	const modalRef = useRef();
	const [activeSection, setActiveSection] = useState('profile');

	const handleUserLogout = () => {
		logout(sessionStorage.getItem('accessToken'), sessionStorage.getItem('refreshToken'));
		onClose();
		navigate('/auth');
	};

	useEffect(() => {
		const handleClickOutside = event => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [onClose]);

	const renderContent = () => {
		switch (activeSection) {
			case 'profile':
				return (
					<div className="p-6">
						<h2 className="text-xl font-semibold mb-4 dark:text-white">
							Profile Settings
						</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Username
								</label>
								<input
									type="text"
									className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
									value={user.username}
									readOnly
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Email
								</label>
								<input
									type="email"
									className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
									value={user.email}
									readOnly
								/>
							</div>
						</div>
					</div>
				);
			case 'appearance':
				return (
					<div className="p-6">
						<h2 className="text-xl font-semibold mb-4 dark:text-white">Appearance</h2>
						<div className="space-y-4">
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Choose your preferred theme
							</p>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										id="theme-light"
										name="theme"
										checked={theme === 'light'}
										onChange={() => setTheme('light')}
										className="text-primary-600 focus:ring-primary-500"
									/>
									<label
										htmlFor="theme-light"
										className="text-gray-700 dark:text-gray-300"
									>
										Light
									</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										id="theme-dark"
										name="theme"
										checked={theme === 'dark'}
										onChange={() => setTheme('dark')}
										className="text-primary-600 focus:ring-primary-500"
									/>
									<label
										htmlFor="theme-dark"
										className="text-gray-700 dark:text-gray-300"
									>
										Dark
									</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										id="theme-system"
										name="theme"
										checked={theme === 'system'}
										onChange={() => setTheme('system')}
										className="text-primary-600 focus:ring-primary-500"
									/>
									<label
										htmlFor="theme-system"
										className="text-gray-700 dark:text-gray-300"
									>
										System
									</label>
								</div>
							</div>
						</div>
					</div>
				);
			case 'notifications':
				return (
					<div className="p-6">
						<h2 className="text-xl font-semibold mb-4 dark:text-white">
							Notifications
						</h2>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-gray-700 dark:text-gray-300">
									Email notifications
								</span>
								<label className="relative inline-flex items-center cursor-pointer">
									<input type="checkbox" className="sr-only peer" />
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
								</label>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-700 dark:text-gray-300">
									Push notifications
								</span>
								<label className="relative inline-flex items-center cursor-pointer">
									<input type="checkbox" className="sr-only peer" />
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
								</label>
							</div>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="fixed inset-0 bg-black/30 dark:bg-black/50 z-[100] flex items-center justify-center">
			<div
				ref={modalRef}
				className="relative bg-white dark:bg-black-700 rounded-lg shadow-xl w-full max-w-4xl h-[600px] flex animate-scaleIn"
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
					aria-label="Close modal"
				>
					<IoClose className="h-5 w-5 text-gray-700 dark:text-gray-200" />
				</button>

				{/* Sidebar */}
				<div className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col">
					{/* User Info Section */}
					<div className="p-4 border-b border-gray-200 dark:border-gray-700">
						<div className="flex flex-col items-center space-y-3">
							<div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-primary-300 p-0.5">
								<div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
									{!user.avatar ? (
										<User className="w-10 h-10 text-gray-700 dark:text-gray-200" />
									) : (
										<img
											src={user.avatar}
											alt={user.name}
											className="w-full h-full rounded-full"
										/>
									)}
								</div>
							</div>
							<div className="text-center">
								<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									{user.username}
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{user.email}
								</p>
							</div>
						</div>
					</div>

					{/* Navigation Menu */}
					<nav className="flex-1 p-4">
						<h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
							Settings
						</h4>
						<ul className="space-y-1">
							<li>
								<button
									className={`w-full text-left px-4 py-2 rounded-lg ${
										activeSection === 'profile'
											? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
											: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
									}`}
									onClick={() => setActiveSection('profile')}
								>
									Profile Settings
								</button>
							</li>
							<li>
								<button
									className={`w-full text-left px-4 py-2 rounded-lg ${
										activeSection === 'appearance'
											? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
											: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
									}`}
									onClick={() => setActiveSection('appearance')}
								>
									Appearance
								</button>
							</li>
							<li>
								<button
									className={`w-full text-left px-4 py-2 rounded-lg ${
										activeSection === 'notifications'
											? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
											: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
									}`}
									onClick={() => setActiveSection('notifications')}
								>
									Notifications
								</button>
							</li>
						</ul>
					</nav>

					{/* Sign Out Button */}
					<div className="p-4 border-t border-gray-200 dark:border-gray-700">
						<button
							className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
							onClick={handleUserLogout}
						>
							Sign Out
						</button>
					</div>
				</div>

				{/* Content Area */}
				<div className="flex-1">{renderContent()}</div>
			</div>
		</div>
	);
};

UserModal.propTypes = {
	onClose: propTypes.func.isRequired,
};

export default UserModal;
