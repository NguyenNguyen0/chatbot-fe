import PropTypes from 'prop-types';

function UtilButton({ onClick, icon: Icon, title, ...props }) {
    return (
        <button
            onClick={() => onClick()}
            className="text-secondary-200/90 hover:text-secondary-300 p-1 rounded-md hover:bg-secondary-500/10 cursor-pointer"
            title={title}
            {...props}
        >
            {Icon}
        </button>
    )
}

UtilButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

export default UtilButton