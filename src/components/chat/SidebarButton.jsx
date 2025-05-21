import propTypes from 'prop-types';
import { GoSidebarCollapse } from 'react-icons/go';
import { GoSidebarExpand } from 'react-icons/go';

function SidebarButton({ isOpen, onToggle, className }) {
	return (
		<button
			onClick={onToggle}
			className={`p-2 rounded-lg hover:bg-black-200 dark:border-slate-400/30 dark:hover:bg-black-400/40 cursor-pointer transition-transform duration-300 transform ${className}`}
		>
			{isOpen ? (
				<GoSidebarExpand className="w-6 h-6 text-black-600 dark:text-white" />
			) : (
				<GoSidebarCollapse className="w-6 h-6 text-black-600 dark:text-white" />
			)}
		</button>
	);
}

SidebarButton.propTypes = {
	isOpen: propTypes.bool.isRequired,
	onToggle: propTypes.func.isRequired,
	className: propTypes.string,
};

export default SidebarButton;
