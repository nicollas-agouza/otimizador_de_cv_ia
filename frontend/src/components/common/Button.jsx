import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-all duration-200 ease-in-out
    disabled:opacity-60 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  const variants = {
    primary: `
      bg-indigo-600 hover:bg-indigo-700 text-white
      focus:ring-indigo-500 shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-white hover:bg-gray-50 text-gray-700 border border-gray-300
      focus:ring-indigo-500 shadow-sm hover:shadow-md
    `,
    outline: `
      bg-transparent hover:bg-indigo-50 text-indigo-600 border border-indigo-600
      focus:ring-indigo-500 hover:border-indigo-700
    `,
    ghost: `
      bg-transparent hover:bg-gray-100 text-gray-600
      focus:ring-gray-500
    `,
    danger: `
      bg-red-600 hover:bg-red-700 text-white
      focus:ring-red-500 shadow-sm hover:shadow-md
    `,
    success: `
      bg-green-600 hover:bg-green-700 text-white
      focus:ring-green-500 shadow-sm hover:shadow-md
    `
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  const LoadingSpinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && <LoadingSpinner />}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className={`${children ? 'mr-2' : ''}`}>
          {icon}
        </span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <span className={`${children ? 'ml-2' : ''}`}>
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;