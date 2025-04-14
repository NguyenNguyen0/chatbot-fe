import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { register } from '../../services';
import { AuthContext } from '../../contexts/AuthContext';

function RegisterForm() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      if (data) {
        const accessToken = data.accessToken;
        context.setTokenAndUser(accessToken);
        navigate('/chat', {
          state: {
            isNewUser: true,
            username: formData.username,
            message: `Welcome ${formData.username} to AI Chat App!`
          }
        });
      }
    } catch (err) {
      console.error(err.response);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-secondary-200 mb-2">
          User Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-3 bg-primary-700 border border-secondary-400/20 rounded-lg focus:outline-none focus:border-secondary-400 text-secondary-200"
          placeholder="Enter your full name"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
      </div>

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
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-secondary-200 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full px-4 py-3 bg-primary-700 border border-secondary-400/20 rounded-lg focus:outline-none focus:border-secondary-400 text-secondary-200"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 bg-primary-700 border-secondary-400/20 rounded focus:ring-secondary-400"
          required
        />
        <label htmlFor="terms" className="ml-2 text-sm text-secondary-200">
          I agree to the{' '}
          <a href="#" className="text-secondary-400 hover:text-secondary-300">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-secondary-400 hover:text-secondary-300">
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-primary-800 rounded-lg font-semibold transition-all cursor-pointer"
      >
        Create Account
      </button>
    </form>
  );
}

export default RegisterForm;
