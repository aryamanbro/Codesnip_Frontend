import React from 'react';

const Select = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent appearance-none"
  >
    {children}
  </select>
);

export default Select;