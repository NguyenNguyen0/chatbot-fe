import { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

import { User } from '../../assets/icons';
import { AuthContext } from '../../contexts/AuthContext';
import { logout } from '../../services';

const UserModal = ({ onClose }) => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const user = context.user;
  const modalRef = useRef();

  const handleUserLogout = ()  => {
    logout(sessionStorage.getItem('jwt'));
    context.setUser(null);
    onClose();
    navigate('/auth');
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end pt-16 px-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm mr-2 mt-2 animate-slideIn"
      >
        {/* User Info Section */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary-500 to-secondary-300 p-0.5">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                {!user.avatar 
                  ? (<User className="w-8 h-8 text-gray-700 dark:text-gray-200" />)
                  : (<img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />)
                }
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{user.username}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Settings</h4>
          <ul className="space-y-2">
            <li>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                Profile Settings
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                Appearance
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                Notifications
              </button>
            </li>
          </ul>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg cursor-pointer"
            onClick={handleUserLogout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

UserModal.propTypes = {
  onClose: propTypes.func.isRequired,
};

export default UserModal;
