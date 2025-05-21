import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import nLogo from '../../assets/svg/N.ai.svg';

function Logo({ className = '' }) {
	return (
		<Link
			to="/"
			className={`font-['Koh_Santepheap'] text-5xl font-extrabold bg-gradient-to-r from-primary-300 to-primary-500 text-transparent bg-clip-text outline-0 ${className}`}
		>
			<span className="text-5xl font-extrabold">N</span>
			<span className="text-3xl">.ai</span>
		</Link>
	);
}

Logo.propTypes = {
	className: PropTypes.string,
};

export default Logo;
