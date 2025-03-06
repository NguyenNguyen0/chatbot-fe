// import React from 'react'
import Header from "../components/Header";
import Background from "../components/Background";
import Footer from "../components/Footer";
import ChatBar from "../components/ChatBar";
import { LightBulb, MagnifyingGlassIcon, User } from "../components/icons";
import { IoMdArrowRoundForward } from "react-icons/io";

import robotImage from "../assets/img/full-cyperpunk-robot.png";
import '../assets/css/Home.css';

function Home() {
  return (
    <Background>
      <Header />

      <div className="bg-transparent flex flex-col items-center justify-center">
        <section className="hero-section my-40 flex justify-between items-center container w-full h-[550px] px-4 z-0">
          <div className="w-2/3">
            {/* <h1 className="text-7xl text-secondary-300 font-bold mb-10">Trò chuyện thông minh với AI của bạn!</h1> */}
            <h1 className="bg-gradient-to-tl from-orange-500 via-orange-400 to-yellow-200 bg-clip-text text-transparent text-7xl font-bold  mb-10 pb-2">Trò chuyện thông minh với AI của bạn!</h1>
            <h2 className="text-5xl text-secondary-300 font-bold mb-10 text-shadow-primary-100">Trợ lý AI mạnh mẽ cho công việc và cuộc sống</h2>
            <small className="text-2xl text-primary-50 text-shadow-secondary-200 mb-10">Tạo cuộc trò chuyện thông minh, hỗ trợ công việc, học tập và giải trí với AI của chúng tôi.</small>
            <button to="/chat" className="mt-12 mr-5 px-4 pt-3 pb-3.5 flex items-center text-2xl text-secondary-700 font-bold rounded-[4px] bg-gradient-to-tl from-orange-500 via-orange-400 to-yellow-200 justify-self-start cursor-pointer animate-radial-gradient outline-2 outline-secondary-700 hover:opacity-100 hover:outline-secondary-200 hover:text-secondary-50 hover:-translate-y-1.5 hover:shadow-secondary-300 hover:shadow-[0_4px_8px] transition-transform">
              <span>Bắt đầu ngay</span>
              <IoMdArrowRoundForward className="mb-[-6px] w-7 h-7 ml-1" />
            </button>
          </div>

          <div className="w-1/3">
            {/* <img className="block w-full h-full" src={robotImage} alt="SMART AI" /> */}
          </div>
        </section>

        <section className="my-40 container mx-auto px-4 md:px-0 flex flex-col justify-evenly items-center">
          <h2 className="text-5xl mb-20 text-secondary-300 font-bold">Những gì chatbot của bạn có thể làm?</h2>
          <div>
            <ul className="list-none flex justify-evenly items-center">
              <li className="card-item">
                <LightBulb className="w-[44px] h-[44px] mx-auto" />
                <h3 className="text-3xl mb-10 text-center text-secondary-300 my-8">Trả lời thông minh</h3>
                <p className="text-secondary-100 text-center">AI có thể giải đáp thắc mắc, hỗ trợ học tập và làm việc</p>
              </li>
              <li className="card-item">
                <MagnifyingGlassIcon className="w-[44px] h-[44px] mx-auto" />
                <h3 className="text-3xl mb-10 text-center text-secondary-300 my-8">Tìm kiếm thông minh</h3>
                <p className="text-secondary-100 text-center">Lấy thông tin nhanh chóng mà không cần rời khỏi trang</p>
              </li>
              <li className="card-item">
                <User className="w-[44px] h-[44px] mx-auto" />
                <h3 className="text-3xl mb-10 text-center text-secondary-300 my-8">Cá nhân hóa cuộc trò chuyện</h3>
                <p className="text-secondary-100 text-center">Học hỏi từ lịch sử chat để phản hồi tốt hơn</p>
              </li>
            </ul>
          </div>
        </section>


        <section className="my-40 container mx-auto px-4 md:px-0 flex flex-col justify-evenly items-center">
          <ChatBar placeholder={"Hỏi bất cứ điều gì"} />
        </section>
      </div>

      <Footer />
    </Background>
  );
}

export default Home
