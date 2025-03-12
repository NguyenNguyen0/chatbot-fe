import { PropTypes } from 'prop-types'

function Background({ children }) {
  return (
    <div className="relative bg-gradient-to-b from-primary-600 via-primary-500 to-primary-600 min-h-screen">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/50 via-transparent to-secondary-700/30" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

Background.propTypes = {
  children: PropTypes.node,
}

export default Background
