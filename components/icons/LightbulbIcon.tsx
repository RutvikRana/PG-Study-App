import React from 'react';

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={`h-5 w-5 ${className}`}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.002 6.002 0 00-5.032-5.912A5.99 5.99 0 006 12.75H18a5.99 5.99 0 00-1.032-3.912A6.002 6.002 0 0012 6.75zm-3 12.75h6" />
  </svg>
);
