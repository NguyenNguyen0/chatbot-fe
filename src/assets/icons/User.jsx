import propTypes from 'prop-types';


function User({ colorTop = "oklch(0.61 0.35 83)", colorBottom = "oklch(0.86 0.14 83)", ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="url(#user)"
            className="size-6"
            {...props}
        >
            <defs>
                <linearGradient id="user" x2="0.35" y2="1">
                    <stop offset="0%" stopColor={colorTop} />
                    <stop offset="30%" stopColor={colorTop} />
                    <stop offset="100%" stopColor={colorBottom} />
                </linearGradient>
            </defs>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
    )
}


User.propTypes = {
    colorTop: propTypes.string,
    colorBottom: propTypes.string,
}


export default User
