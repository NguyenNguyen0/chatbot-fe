import { Route, BrowserRouter, Routes } from 'react-router'
import './App.css'
import { About, Auth, Home, Landing, NotFound } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/landing" element={ <Landing /> } />
        <Route path="/auth" element={ <Auth /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
