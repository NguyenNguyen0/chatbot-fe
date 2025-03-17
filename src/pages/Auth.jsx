import { useSearchParams } from "react-router-dom"
import { useState } from "react"

import Background from "../components/layout/Background"
import Footer from "../components/layout/Footer"
import AuthModal from "../components/auth/AuthModal"
import '../assets/styles/Auth.css'


function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Background>
      <div className="min-h-screen flex items-center justify-center px-4">
        <AuthModal isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
        <Footer />
    </Background>
  )
}

export default Auth
