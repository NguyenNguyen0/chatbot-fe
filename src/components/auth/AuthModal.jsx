import { PropTypes } from 'prop-types';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthModal({ isLogin, setIsLogin }) {
  return (
    <div className="auth-modal bg-black-800 rounded-2xl p-8 w-full max-w-md border border-primary-400/20">
      {/* Tab Switcher */}
      <div className="flex mb-8">
        <button
          className={`flex-1 py-3 text-lg font-semibold transition-colors ${
            isLogin
              ? 'text-primary-400 border-b-2 border-primary-500'
              : 'text-primary-100 hover:text-primary-300'
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`flex-1 py-3 text-lg font-semibold transition-colors ${
            !isLogin
              ? 'text-primary-400 border-b-2 border-primary-500'
              : 'text-primary-100 hover:text-primary-300'
          }`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      {/* Form Container */}
      <div className="form-container">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

AuthModal.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  setIsLogin: PropTypes.func.isRequired,
};

export default AuthModal;
