/* eslint-disable react/prop-types */
export const LocationIcon = ({ size, height, width, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width || 24}
      height={size || height || 24}
    viewBox="0 0 24 24"
    fill="none"
    className="mdl-js"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 21.5C12 21.5 4 16 4 10C4 5 7.5 2 12 2C16.5 2 20 5 20 10C20 16 12 21.5 12 21.5Z"
      stroke={props}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z"
      stroke={props}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
