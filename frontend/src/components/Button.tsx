import React from 'react';

type ButtonVariant = 'solid' | 'default' | 'plain' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
type ButtonShape = 'rounded' | 'pill' | 'square';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'solid',
  size = 'md',
  shape = 'rounded',
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles =
    'font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-60 transition-all duration-150 ease-in-out inline-flex items-center justify-center';

  let variantStyles = '';
  switch (variant) {
    case 'default':
      variantStyles =
        'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600';
      break;
    case 'plain':
      variantStyles =
        'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/50';
      break;
    case 'danger':
      variantStyles =
        'bg-red-600 text-white border border-red-600 hover:bg-red-700 focus:ring-red-400';
      break;
    case 'solid':
    default:
      variantStyles =
        'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 focus:ring-blue-400';
      break;
  }

  let sizeStyles = '';
  switch (size) {
    case 'xs':
      sizeStyles = 'px-2.5 py-1.5 text-xs';
      break;
    case 'sm':
      sizeStyles = 'px-3 py-2 text-sm leading-4';
      break;
    case 'lg':
      sizeStyles = 'px-6 py-3 text-base';
      break;
    case 'md':
    default:
      sizeStyles = 'px-4 py-2 text-sm';
      break;
  }

  let shapeStyles = '';
  switch (shape) {
    case 'pill':
      shapeStyles = 'rounded-full';
      break;
    case 'square':
      shapeStyles = 'rounded-none';
      break;
    case 'rounded':
    default:
      shapeStyles = 'rounded-md';
      break;
  }

  const loadingStyles = isLoading ? 'opacity-75 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${shapeStyles} ${loadingStyles} ${className || ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
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
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button; 