import React from 'react';

export const MoleculeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={`h-5 w-5 ${className}`}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0115 18.257V17.25m6-12V7.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 7.5v1.5M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v4.5m0-4.5l-2.25-2.25M12 12.75l2.25-2.25M12 12.75L9.75 15M12 12.75l2.25 2.25" />
  </svg>
);
