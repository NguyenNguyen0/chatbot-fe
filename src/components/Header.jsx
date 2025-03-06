// import React from 'react'
import Button from "./Button";
import { Link } from "react-router-dom";
import MagnifyingGlassIcon from "./icons/MagnifyingGlassIcon.jsx"


function Header() {
  return (
    <header className="bg-gradient-primary w-full h-16 flex items-center px-3 shadow-md shadow-primary-600">
      <Link
        className="bg-gradient-to-tl from-orange-500 via-orange-400 to-yellow-200 bg-clip-text text-transparent text-2xl font-extrabold hover-animate-gradient"
        to="/"
      >
        CHATBOT
      </Link>

      <Button className="flex-shrink-0 ml-auto hover-animate-gradient" >
        <MagnifyingGlassIcon />
      </Button>

      <Button className="ml-2 hover-animate-gradient">Sign In</Button>
    </header>
  );
}

export default Header;
