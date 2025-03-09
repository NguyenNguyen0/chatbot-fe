import { PropTypes } from 'prop-types';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthModal({ isLogin, setIsLogin }) {
  return (
    <div className="auth-modal bg-primary-800 rounded-2xl p-8 w-full max-w-md border border-secondary-400/20">
      {/* Tab Switcher */}
      <div className="flex mb-8">
        <button
          className={`flex-1 py-3 text-lg font-semibold transition-colors ${
            isLogin
              ? 'text-secondary-300 border-b-2 border-secondary-400'
              : 'text-secondary-200 hover:text-secondary-300'
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`flex-1 py-3 text-lg font-semibold transition-colors ${
            !isLogin
              ? 'text-secondary-300 border-b-2 border-secondary-400'
              : 'text-secondary-200 hover:text-secondary-300'
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
