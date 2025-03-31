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
      <header className="bg-primary-800 py-3 px-5">
        <Nav />
      </header>
      <div className="min-h-screen flex items-center justify-center px-4">
        <AuthModal isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
        <Footer />
    </Background>
  )
}

export default Auth
