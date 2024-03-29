/* eslint-disable react/prop-types */
export const NotificationIcon = ({ size, height, width, ...props }) => {
  return (
    <svg
      height={size || height || 18}
      width={size || width || 18}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={props}
      {...props}
    >
      <g data-name="26. Notification" id="_26._Notification">
        <path d="M22.086,14.672A3.685,3.685,0,0,1,21,12.05V9A9,9,0,0,0,3,9v3.05a3.685,3.685,0,0,1-1.086,2.622A3.121,3.121,0,0,0,4.121,20H7.1a5,5,0,0,0,9.8,0h2.98a3.121,3.121,0,0,0,2.207-5.328ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm7.879-4H4.121a1.121,1.121,0,0,1-.793-1.914A5.672,5.672,0,0,0,5,12.05V9A7,7,0,0,1,19,9v3.05a5.672,5.672,0,0,0,1.672,4.036A1.121,1.121,0,0,1,19.879,18Z" />
      </g>
    </svg>
  );
};
