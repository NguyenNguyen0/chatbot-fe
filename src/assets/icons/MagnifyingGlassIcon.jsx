import propTypes from 'prop-types';


function MagnifyingGlassIcon({ colorTop = "oklch(0.78 0.21 290)", colorBottom ="oklch(0.50 0.41 290)", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="url(#gradient)"
      className="size-6"
      {...props}
    >
      <defs>
        <linearGradient id="gradient" x2="0.35" y2="1">
          <stop offset="0%" stopColor={colorTop} />
          <stop offset="30%" stopColor={colorTop} />
          <stop offset="100%" stopColor={colorBottom} />
        </linearGradient>
      </defs>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}

MagnifyingGlassIcon.propTypes = {
  colorTop: propTypes.string,
  colorBottom: propTypes.string,
};


export default MagnifyingGlassIcon
