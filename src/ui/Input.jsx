import React from 'react';

const Input = React.forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
  />
));

export default Input;