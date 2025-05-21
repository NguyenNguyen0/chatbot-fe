import { v4 as uuidv4 } from 'uuid';
import { addToast, removeToast } from '../features/toast/toastSlice';

export const showToast = (type, message, options = {}) => {
	return addToast({
		id: uuidv4(),
		type,
		message,
		options,
	});
};

export const hideToast = id => {
	return removeToast(id);
};

export const toastSuccess = (message, options = {}) => {
	return showToast('success', message, options);
};

export const toastError = (message, options = {}) => {
	return showToast('error', message, options);
};

export const toastInfo = (message, options = {}) => {
	return showToast('info', message, options);
};

export const toastWarning = (message, options = {}) => {
	return showToast('warning', message, options);
};
