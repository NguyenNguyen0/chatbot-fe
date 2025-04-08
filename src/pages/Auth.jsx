import { useState } from "react"

import Background from "../components/layout/Background"
import Footer from "../components/layout/Footer"
import AuthModal from "../components/auth/AuthModal"
import Nav from "../components/layout/Nav"
import '../assets/styles/Auth.css'


function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Background>
      <header className="bg-gradient-to-r from-primary-700 to-primary-600 shadow-xs py-3 px-5">
        <Nav showNavigationLink={false} showLoginButton={false} />
      </header>
      <div className="min-h-screen flex items-center justify-center px-4">
        <AuthModal isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
        <Footer />
    </Background>
  )
}

export default Auth
