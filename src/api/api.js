import axios from 'axios';
import configs from '../config/config';
import applyCaseMiddleware from 'axios-case-converter';

// Add this to track if refresh is in progress
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

const api = applyCaseMiddleware(
	axios.create({
		baseURL: configs.API_BASE_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	}),
	{ ignoreHeaders: true },
);

api.interceptors.request.use(
	config => {
		const token = sessionStorage.getItem('accessToken');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	error => Promise.reject(error),
);

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;

		// Handle both 401 Unauthorized and 403 Forbidden for token issues
		if (
			(error.response?.status === 401 || error.response?.status === 403) &&
			!originalRequest._retry
		) {
			if (isRefreshing) {
				// If refresh is already in progress, queue this request
				try {
					const token = await new Promise((resolve, reject) => {
						failedQueue.push({ resolve, reject });
					});
					originalRequest.headers['Authorization'] = `Bearer ${token}`;
					return api(originalRequest);
				} catch (err) {
					return Promise.reject(err);
				}
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const refreshToken = sessionStorage.getItem('refreshToken');

				if (!refreshToken) {
					throw new Error('No refresh token');
				}

				const response = await applyCaseMiddleware(axios, { ignoreHeaders: true }).post(
					`${configs.API_BASE_URL}auth/refresh`,
					refreshToken,
					{
						headers: { 'Content-Type': 'text/plain' },
					},
				);

				if (response.status === 200) {
					const newAccessToken = response.data.accessToken;
					sessionStorage.setItem('accessToken', newAccessToken);

					// Update headers
					api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
					originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

					// Process queued requests
					processQueue(null, newAccessToken);
					isRefreshing = false;

					return api(originalRequest);
				}
			} catch (refreshError) {
				processQueue(refreshError, null);
				isRefreshing = false;

				// Clear tokens only if the refresh attempt actually failed
				sessionStorage.removeItem('accessToken');
				sessionStorage.removeItem('refreshToken');

				// Redirect to login page - but only if it's truly an auth error
				if (
					refreshError?.response?.status === 401 ||
					refreshError?.response?.status === 403 ||
					refreshError?.message === 'No refresh token'
				) {
					window.location.href = '/auth?type=login';
				}
			}
		}

		return Promise.reject(error);
	},
);

export default api;
