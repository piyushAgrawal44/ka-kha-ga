// Button.tsx - Reusable Button Component with Multiple Variants

import React from 'react';
import { Loader2, LucideIcon } from 'lucide-react';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'danger' 
  | 'success' 
  | 'warning'
  | 'info'
  | 'gradient'
  | 'fun';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      icon: Icon,
      iconPosition = 'left',
      loading = false,
      fullWidth = false,
      rounded = 'lg',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant styles
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 shadow-sm hover:shadow-md',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm hover:shadow-md',
      outline: 'bg-white border-2 border-purple-300 text-purple-600 hover:bg-purple-50 focus:ring-purple-500',
      ghost: 'bg-transparent text-purple-600 hover:bg-purple-50 focus:ring-purple-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm hover:shadow-md',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 shadow-sm hover:shadow-md',
      info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:ring-purple-500 shadow-md hover:shadow-lg',
      fun: 'bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-white hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500 focus:ring-pink-500 shadow-lg hover:shadow-xl transform hover:scale-105',
    };

    // Size styles
    const sizes: Record<ButtonSize, string> = {
      xs: 'px-2.5 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };

    // Rounded styles
    const roundedStyles: Record<typeof rounded, string> = {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    // Icon sizes based on button size
    const iconSizes: Record<ButtonSize, string> = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
    };

    const combinedClassName = `
      ${baseStyles}
      ${variants[variant]}
      ${sizes[size]}
      ${roundedStyles[rounded]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Loader2 className={`${iconSizes[size]} animate-spin ${iconPosition === 'left' ? 'mr-2' : 'ml-2'} ${iconPosition === 'right' ? 'order-2' : ''}`} />
        )}
        
        {!loading && Icon && iconPosition === 'left' && (
          <Icon className={`${iconSizes[size]} mr-2`} />
        )}
        
        <span>{children}</span>
        
        {!loading && Icon && iconPosition === 'right' && (
          <Icon className={`${iconSizes[size]} ml-2`} />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;