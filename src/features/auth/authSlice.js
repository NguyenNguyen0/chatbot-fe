import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, login, register, logout as logoutService } from '../../services';

export const fetchUser = createAsyncThunk('auth/fetchUser', async (token, { rejectWithValue }) => {
	try {
		return await getUser(token);
	} catch (error) {
		return rejectWithValue(error.response?.data);
	}
});

export const loginUser = createAsyncThunk(
	'auth/login',
	async (credentials, { dispatch, rejectWithValue }) => {
		try {
			const data = await login(credentials);

			if (data.accessToken || data.refreshToken) {
				dispatch(fetchUser(data.accessToken));
				return data;
			}
		} catch (error) {
			return rejectWithValue(error.response?.data);
		}
	},
);

export const registerUser = createAsyncThunk(
	'auth/register',
	async (userData, { dispatch, rejectWithValue }) => {
		try {
			const data = await register(userData);

			if (data.accessToken || data.refreshToken) {
				dispatch(fetchUser(data.accessToken));
				return data;
			}
		} catch (error) {
			return rejectWithValue(error.response?.data);
		}
	},
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
	try {
		const accessToken = sessionStorage.getItem('accessToken');
		const refreshToken = sessionStorage.getItem('refreshToken');
		await logoutService(accessToken, refreshToken);
		return null;
	} catch (error) {
		return rejectWithValue(error.response?.data);
	} finally {
		sessionStorage.removeItem('accessToken');
		sessionStorage.removeItem('refreshToken');
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		token: sessionStorage.getItem('accessToken') || null,
		status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
				state.user = null;
				state.token = null;
				sessionStorage.removeItem('accessToken');
			})
			.addCase(loginUser.pending, state => {
				state.status = 'loading';
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				if (action.payload) {
					sessionStorage.setItem('refreshToken', action.payload.refreshToken);
					sessionStorage.setItem('accessToken', action.payload.accessToken);
					state.token = action.payload.accessToken;
				}
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(registerUser.pending, state => {
				state.status = 'loading';
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				if (action.payload) {
					sessionStorage.setItem('refreshToken', action.payload.refreshToken);
					sessionStorage.setItem('accessToken', action.payload.accessToken);
					state.token = action.payload.accessToken;
				}
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(logoutUser.pending, state => {
				state.status = 'loading';
			})
			.addCase(logoutUser.fulfilled, state => {
				state.status = 'idle';
				state.user = null;
				state.token = null;
				state.error = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.status = 'idle';
				state.user = null;
				state.token = null;
				state.error = action.payload;
			});
	},
});

export default authSlice.reducer;
