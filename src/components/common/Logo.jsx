import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Logo({ className='' }) {
    return (
        <Link to="/" className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary-300 to-secondary-500 text-transparent bg-clip-text ${className}`}>
            Chat AI
        </Link>
    )
}

Logo.propTypes = {
    className: PropTypes.string
}

export default Logo
