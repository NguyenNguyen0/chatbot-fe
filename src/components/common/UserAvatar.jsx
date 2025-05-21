import { useState } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';

import { User } from '../../assets/icons';
import UserModal from './UserModal';

const UserAvatar = ({ avatar, name = '', className }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<div className={`outline-0 ${className}`}>
				<button
					onClick={() => setIsModalOpen(true)}
					className="w-12 h-12 rounded-full p-0.5 hover:scale-105 transition-transform duration-200 cursor-pointer"
				>
					<div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
						{avatar ? (
							<img src={avatar} alt={name} className="w-full h-full rounded-full" />
						) : (
							<User className="w-6 h-6 text-gray-700 dark:text-gray-200" />
						)}
					</div>
				</button>
			</div>
			{isModalOpen &&
				createPortal(<UserModal onClose={() => setIsModalOpen(false)} />, document.body)}
		</>
	);
};

UserAvatar.propTypes = {
	avatar: propTypes.string,
	name: propTypes.string,
	className: propTypes.string,
};

export default UserAvatar;
