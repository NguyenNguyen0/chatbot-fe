import { useState } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', formData);
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
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#24292F] hover:bg-[#24292F]/90 text-white rounded-lg transition-colors"
        >
          <FaGithub className="w-5 h-5" />
          Continue with GitHub
        </button>
        <button
          onClick={() => handleSocialLogin('google')}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-800 rounded-lg transition-colors"
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
          <label htmlFor="email" className="block text-secondary-200 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 bg-primary-700 border border-secondary-400/20 rounded-lg focus:outline-none focus:border-secondary-400 text-secondary-200"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          className="w-full py-3 bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-primary-800 rounded-lg font-semibold transition-all"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
