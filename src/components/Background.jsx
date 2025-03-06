import { PropTypes } from 'prop-types'


function Background({children}) {
  return (
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 min-h-screen">
      {children}
    </div>
  )
}

Background.propTypes = {
  children: PropTypes.node,
}

export default Background
