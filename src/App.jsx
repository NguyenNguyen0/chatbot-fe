import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { ChatProvider } from './contexts/ChatContext'

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  )
}

export default App