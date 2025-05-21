import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from './contexts/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import ToastManager from './components/ui/ToastManager';

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<BrowserRouter>
					<ToastManager />
					<AppRoutes />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
