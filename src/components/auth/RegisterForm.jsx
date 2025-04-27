import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useAuth } from '../../hooks/useAuth';
import { toastSuccess } from '../../utils/toastUtils';

function RegisterForm() {
  const navigate = useNavigate();
  const { dispatch } = useDispatch();
  const { register } = useAuth();
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
        dispatch(toastSuccess(`Welcome ${formData.username} to AI Chat App!`));
        navigate('/chat');
      }
    } catch (err) {
      console.error(err.response);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-black-600 dark:text-white mb-2">
          User Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-3 bg-white text-black-500 dark:bg-black-700 border-primary-400/20 rounded-lg focus:outline-none focus:border-primary-400 dark:text-white"
          placeholder="Enter your full name"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-black-600 dark:text-white mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-3 bg-white text-black-500 dark:bg-black-700 border-primary-400/20 rounded-lg focus:outline-none focus:border-primary-400 dark:text-white"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-black-600 dark:text-white mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-3 bg-white text-black-500 dark:bg-black-700 border-primary-400/20 rounded-lg focus:outline-none focus:border-primary-400 dark:text-white"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-black-600 dark:text-white mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full px-4 py-3 bg-white text-black-500 dark:bg-black-700 border-primary-400/20 rounded-lg focus:outline-none focus:border-primary-400 dark:text-white"
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
          className="w-4 h-4 bg-black-700 border-primary-400/20 rounded focus:ring-primary-400"
          required
        />
        <label htmlFor="terms" className="ml-2 text-sm text-black-600 dark:text-white">
          I agree to the{' '}
          <a href="#" className="text-primary-400 hover:text-primary-300">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary-400 hover:text-primary-300">
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        Create Account
      </button>
    </form>
  );
}

export default RegisterForm;
