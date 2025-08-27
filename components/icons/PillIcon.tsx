import React from 'react';

export const PillIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={`h-5 w-5 ${className}`}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.215 11.23c.33-.25.68-.46 1.05-.62.37-.16.76-.28 1.16-.36.4-.08.81-.12 1.23-.12h.01c.42 0 .83.04 1.23.12.4.08.79.2 1.16.36.37.16.72.37 1.05.62m-6.86 0c.33.25.68.46 1.05.62.37.16.76.28 1.16.36.4.08.81.12 1.23.12h.01c.42 0 .83-.04 1.23.12.4.08.79.2 1.16.36.37.16.72.37 1.05.62m-6.86 0C6.54 9.1 4 7.63 4 5.5A4.5 4.5 0 018.5 1h7A4.5 4.5 0 0120 5.5c0 2.13-2.54 3.6-5.355 5.73" />
  </svg>
);
