// Input.tsx - Reusable Input Component with Multiple Variants

import React from 'react';
import { Loader2, LucideIcon } from 'lucide-react';

export type InputVariant =
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

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'outline',
      inputSize = 'md',
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
    const baseStyles =
      'flex items-center transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant styles
    const variants: Record<InputVariant, string> = {
      primary:
        'bg-purple-50 border border-purple-300 focus-within:ring-purple-500 text-gray-900',
      secondary:
        'bg-gray-100 border border-gray-400 focus-within:ring-gray-500 text-gray-900',
      outline:
        'bg-white border border-gray-300 focus-within:border-purple-400 focus-within:ring-purple-400 text-gray-900',
      ghost:
        'bg-transparent border border-transparent focus-within:border-purple-300 text-gray-900',
      danger:
        'bg-red-50 border border-red-300 focus-within:ring-red-500 text-red-700',
      success:
        'bg-green-50 border border-green-300 focus-within:ring-green-500 text-green-700',
      warning:
        'bg-yellow-50 border border-yellow-300 focus-within:ring-yellow-500 text-yellow-700',
      info:
        'bg-blue-50 border border-blue-300 focus-within:ring-blue-500 text-blue-700',
      gradient:
        'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-300 focus-within:ring-purple-400 text-gray-900',
      fun: 'bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 border border-pink-300 focus-within:ring-pink-400 text-gray-900',
    };

    // Size styles
    const sizes: Record<InputSize, string> = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg',
      xl: 'px-6 py-3 text-xl',
    };

    // Rounded styles
    const roundedStyles: Record<NonNullable<InputProps['rounded']>, string> = {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    // Icon sizes
    const iconSizes: Record<InputSize, string> = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
    };

    const combinedClassName = `
      ${baseStyles}
      ${variants[variant]}
      ${sizes[inputSize]}
      ${roundedStyles[rounded]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <div className={combinedClassName}>
        {loading && (
          <Loader2
            className={`${iconSizes[inputSize]} animate-spin text-gray-400 ${
              iconPosition === 'left' ? 'mr-2' : 'ml-2 order-2'
            }`}
          />
        )}

        {!loading && Icon && iconPosition === 'left' && (
          <Icon className={`${iconSizes[inputSize]} text-gray-400 mr-2`} />
        )}

        <input
          ref={ref}
          disabled={disabled || loading}
          className={`flex-1 bg-transparent outline-none placeholder-gray-400`}
          {...props}
        />

        {!loading && Icon && iconPosition === 'right' && (
          <Icon className={`${iconSizes[inputSize]} text-gray-400 ml-2`} />
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
