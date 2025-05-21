import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { removeToast } from '../../features/toast/toastSlice';
import { ThemeContext } from '../../contexts/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';

function ToastManager() {
	const dispatch = useDispatch();
	const { list } = useSelector(state => state.toast);
	let { systemTheme } = useContext(ThemeContext);

	useEffect(() => {
		list.forEach(item => {
			const { id, type, message, options } = item;

			// Display the toast based on type
			toast[type](message, {
				...options,
				onClose: () => dispatch(removeToast(id)),
			});
		});
	}, [list, dispatch]);

	return (
		<ToastContainer
			position="top-center"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={false}
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover={false}
			theme={systemTheme}
			transition={Slide}
		/>
	);
}

export default ToastManager;
