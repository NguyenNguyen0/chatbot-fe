import { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

import { login } from '../../services/authService.js';
import { AuthContext } from '../../contexts/AuthContext.jsx';

function LoginForm() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);

      if (data) {
        context.setTokenAndUser(data['access_token']);
        navigate('/chat', {
          state: {
            isLogin: true,
            username: formData.username,
            message: `Welcome back ${formData.username}!`
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSocialLogin = (provider) => {
    // Handle social login logic here
    console.log('Social login with:', provider);
  };

  return (
    <div className="space-y-6">
      {/* Social Login Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => handleSocialLogin('github')}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#24292F] hover:bg-[#24292F]/90 text-white rounded-lg transition-colors cursor-pointer"
        >
          <FaGithub className="w-5 h-5" />
          Continue with GitHub
        </button>
        <button
          onClick={() => handleSocialLogin('google')}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-800 rounded-lg transition-colors cursor-pointer"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-secondary-400/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-primary-800 text-secondary-200">Or continue with</span>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-secondary-200 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-3 bg-primary-700 border border-secondary-400/20 rounded-lg focus:outline-none focus:border-secondary-400 text-secondary-200"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-secondary-200 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 bg-primary-700 border border-secondary-400/20 rounded-lg focus:outline-none focus:border-secondary-400 text-secondary-200"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 bg-primary-700 border-secondary-400/20 rounded focus:ring-secondary-400"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-secondary-200">
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-secondary-400 hover:text-secondary-300">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-primary-800 rounded-lg font-semibold transition-all cursor-pointer"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
