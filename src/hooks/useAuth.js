import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser, registerUser, fetchUser, logoutUser } from '../features/auth/authSlice';

import { clearConversation } from '../features/chat/chatSlice';

export const useAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, token, status, error } = useSelector(state => state.auth);

	const login = useCallback(
		async credentials => {
			try {
				const resultAction = await dispatch(loginUser(credentials));

				if (loginUser.fulfilled.match(resultAction)) {
					dispatch(clearConversation());
					return resultAction.payload;
				}
				return null;
			} catch (error) {
				console.error('Login error:', error);
				return null;
			}
		},
		[dispatch],
	);

	const register = useCallback(
		async userData => {
			try {
				const resultAction = await dispatch(registerUser(userData));

				if (registerUser.fulfilled.match(resultAction)) {
					dispatch(clearConversation());
					return resultAction.payload;
				}
				return null;
			} catch (error) {
				console.error('Registration error:', error);
				return null;
			}
		},
		[dispatch],
	);

	const logout = useCallback(async () => {
		try {
			await dispatch(logoutUser());
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			dispatch(clearConversation());
			navigate('/auth', { type: 'login' });
		}
	}, [dispatch, navigate]);

	const initializeAuth = useCallback(() => {
		const storedToken = sessionStorage.getItem('accessToken');

		if (storedToken && !user && status !== 'loading') {
			try {
				const resultAction = dispatch(fetchUser(storedToken));

				if (!fetchUser.fulfilled.match(resultAction)) {
					sessionStorage.removeItem('accessToken');
				}
			} catch (error) {
				console.error('Auth initialization error:', error);
				sessionStorage.removeItem('accessToken');
			}
		}
	}, [dispatch, user, status]);

	const isAuthenticated = !!user;
	const isLoading = status === 'loading';

	return {
		user,
		token,
		isAuthenticated,
		isLoading,
		error,
		status,

		login,
		register,
		logout,
		initializeAuth,
	};
};
