import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { ChatProvider } from './contexts/ChatContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ChatProvider>
          <AppRoutes />
        </ChatProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App