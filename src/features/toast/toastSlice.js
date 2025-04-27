import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: []
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action) => {
      const { id, type, message, options } = action.payload;
      state.list.push({
        id,
        type,
        message,
        options
      });
    },
    removeToast: (state, action) => {
      state.list = state.list.filter(toast => toast.id !== action.payload);
    }
  }
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;