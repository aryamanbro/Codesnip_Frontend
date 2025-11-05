import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => {
  const variants = {
    primary: 'bg-brand-blue text-white hover:bg-brand-blue-light/90 shadow-lg shadow-brand-blue/30',
    secondary: 'bg-brand-gray-200/50 text-gray-200 hover:bg-brand-gray-200/80 border border-white/10',
    danger: 'bg-red-600/50 text-red-100 hover:bg-red-600/80 border border-red-500/50',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;