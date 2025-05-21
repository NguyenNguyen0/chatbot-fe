import PropTypes from 'prop-types';

function UtilButton({ onClick, icon: Icon, title, ...props }) {
	return (
		<button
			onClick={() => onClick()}
			className="text-slate-600 dark:text-slate-200 dark:hover:text-white p-1 rounded-md hover:bg-black-300/30 cursor-pointer"
			title={title}
			{...props}
		>
			{Icon}
		</button>
	);
}

UtilButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	icon: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
};

export default UtilButton;
