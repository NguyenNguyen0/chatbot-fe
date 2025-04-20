import propTypes from 'prop-types'

function FooterWave({ theme }) {
    const gradientId = theme === 'dark' ? 'gradient-dark' : 'gradient-light'

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1600 198"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="gradient-dark" x1="50%" x2="50%" y1="-10.959%" y2="100%">
                    <stop stopColor="var(--color-black-700, #1c1618)" stopOpacity=".80" offset="0%" />
                    <stop stopColor="var(--color-black-700, #1c1618)" offset="100%" />
                </linearGradient>
                <linearGradient id="gradient-light" x1="50%" x2="50%" y1="-10.959%" y2="100%">
                    <stop stopColor="var(--color-primary-300, #6366f1)" stopOpacity=".80" offset="0%" />
                    <stop stopColor="var(--color-primary-300, #6366f1)" offset="100%" />
                </linearGradient>
            </defs>
            <path fill={`url(#${gradientId})`} fillRule="evenodd" d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z" />
        </svg>
    )
}

FooterWave.propTypes = {
    theme: propTypes.string.isRequired,
}

export default FooterWave
