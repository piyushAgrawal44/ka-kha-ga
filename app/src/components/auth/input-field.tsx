// components/auth/InputField.tsx - Themed input field component

import React, { useState } from 'react';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
  register?: any;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  icon: Icon,
  type = 'text',
  register,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-purple-800">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={inputType}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} ${
            type === 'password' ? 'pr-11' : 'pr-4'
          } py-3 border-2 ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-purple-300 focus:border-purple-500 focus:ring-purple-200'
          } rounded-xl focus:outline-none focus:ring-4 transition-all text-gray-800 font-medium placeholder-gray-400`}
          {...register}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 font-medium flex items-center space-x-1">
          <span className="text-base">❌</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default InputField;