/* eslint-disable react/prop-types */

function Button({ className, children, icon, ...props }) {
    const classes = `btn ${className} bg-gradient-primary-500`;
  
    return (
      <button className={classes} {...props}>
        <span className="bg-gradient-to-tl from-orange-500 via-orange-400 to-yellow-200 bg-clip-text text-transparent">
          {icon}
          {children}
        </span>
      </button>
    );
}

export default Button
