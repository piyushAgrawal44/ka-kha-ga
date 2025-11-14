// components/auth/LoginForm.tsx - Login form component

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { loginSchema, LoginFormData } from '../../validations/auth.validation';
import InputField from './input-field';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  onToggleMode: () => void;
  loading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onToggleMode,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <InputField
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        icon={Mail}
        register={register('email')}
        error={errors.email?.message}
      />

      <InputField
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={Lock}
        register={register('password')}
        error={errors.password?.message}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white py-4 rounded-xl font-black text-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 border-4 border-white"
      >
        {loading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Logging in...</span>
          </>
        ) : (
          <>
            <LogIn className="w-6 h-6" />
            <span>Login</span>
          </>
        )}
      </button>

      <div className="text-center pt-4">
        <p className="text-gray-600 text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-purple-600 font-bold hover:text-purple-800 transition-colors"
          >
            Register here! ✨
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;