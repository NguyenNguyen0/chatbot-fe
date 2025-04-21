import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
              <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App