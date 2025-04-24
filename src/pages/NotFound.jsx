import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import Background from '../components/layout/Background';
import Nav from '../components/layout/Nav';

function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <Background>
      <header className="bg-gradient-to-r from-primary-200 to-primary-300 dark:from-black-700 dark:to-black-600 shadow-xs py-3 px-5">
        <Nav />
      </header>

      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
        <div className="relative z-10 w-[50%] h-[600px] flex flex-col items-center justify-between bg-white dark:bg-black-700 rounded-lg shadow-lg p-8 border border-primary-400/20">
          <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-black-600 dark:text-white mb-2">
              Page Not Found
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Nội dung <span className="text-primary-500 font-medium">{currentPath}</span> không tồn tại hoặc đã bị xoá.
            </p>
          </div>

          <div className="w-32 h-32 mx-auto mb-6 opacity-80">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-400">
              <path d="M13 14H11V16H13V14Z" fill="currentColor" />
              <path d="M13 8H11V12H13V8Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5Z" fill="currentColor" />
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all"
            >
              <FaArrowLeft className="w-5 h-5" />
              Về trang trước
            </button>

            <button
              onClick={() => navigate('/')}
              className="btn btn-primary w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all"
            >
              <FaHome className="w-5 h-5" />
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default NotFound;
