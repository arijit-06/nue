import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled = false, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;