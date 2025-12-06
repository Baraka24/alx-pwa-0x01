import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
}

/**
 * Layout Button Component
 * A reusable button component for layout-specific actions
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  variant = 'primary',
}) => {
  const baseStyles = 'px-6 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out';
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:bg-gray-200',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export default Button;
