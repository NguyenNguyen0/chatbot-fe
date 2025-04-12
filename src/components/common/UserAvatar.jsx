import { useState, useContext } from 'react';
import propTypes from 'prop-types';

import { User } from '../../assets/icons';
import UserModal from './UserModal';
import { AuthContext } from '../../contexts/AuthContext';

const UserAvatar = ({ className }) => {
  const context = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`outline-0 ${className}`}>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-12 h-12 rounded-full p-0.5 hover:scale-105 transition-transform duration-200 cursor-pointer"
      >
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
          {context.user.avatar ? (
            <img src={context.user.avatar} alt={context.user.name} className="w-full h-full rounded-full" />
          ) : (
            <User className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          )}
        </div>
      </button>

      {isModalOpen && <UserModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

UserAvatar.propTypes = {
  className: propTypes.string,
};

export default UserAvatar;
