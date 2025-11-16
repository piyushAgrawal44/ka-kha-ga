// pages/AuthPage.tsx - Main authentication page

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Sparkles, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useLoginMutation, useRegisterMutation } from '../../services/auth.service';
import { setCredentials } from '../../store/slices/auth.slice';
import { LoginFormData, RegisterFormData } from '../../validations/auth.validation';
import LoginForm from '../../components/auth/login-form';
import RegisterForm from '../../components/auth/register-form';
import AuthDecorations from '../../components/auth/auth-decorations';
import { useTranslation } from 'react-i18next';


type AuthMode = 'login' | 'register';

export const AuthPage: React.FC = () => {
  const { t: varnmala } = useTranslation("auth");
  const [mode, setMode] = useState<AuthMode>('login');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();

      if (response.success) {
        // Success
        toast.success('Login successful! 🎉');

        // Store credentials
        if (response.data?.token) {
          const decodeJWT = (token: string) => {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decoded = JSON.parse(atob(base64));
            return decoded;
          };

          // Usage:
          const token = response.data?.token;
          const user = decodeJWT(token);
          dispatch(
            setCredentials({
              token: response.data.token,
              user: user,
            })
          );

          // Redirect based on role
          navigate('/dashboard');
        }
      } else {
        // API returned success: false
        toast.error(response.message || 'Login failed');
      }
    } catch (error: any) {
      // Handle RTK Query errors
      console.log('Login error:', error);

      if (error.data) {
        // Server responded with error
        const message = error.data.message || 'Login failed';
        toast.error(message);

        // Handle validation errors if they exist
        if (error.data.error && typeof error.data.error === 'object') {
          Object.values(error.data.error).forEach((err: any) => {
            toast.error(err);
          });
        }
      } else {
        // Network or other error
        toast.error('Network error. Please try again.');
      }
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    try {
      const response = await register(data).unwrap();

      if (response.success) {
        // Success
        toast.success('Account created successfully! 🎉');

        // Switch to login mode
        setTimeout(() => {
          setMode('login');
          toast.info('Please login with your new account');
        }, 1500);
      } else {
        // API returned success: false
        toast.error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      // Handle RTK Query errors
      console.log('Register error:', error);

      if (error.data) {
        // Server responded with error
        const message = error.data.message || 'Registration failed';
        toast.error(message);

        // Handle validation errors
        if (error.data.error) {
          if (typeof error.data.error === 'object') {
            // Handle Zod validation errors
            try {
              const errorObj = JSON.parse(error.data.error.message || '[]');
              errorObj.forEach((err: any) => {
                const field = err.path?.join('.') || 'Field';
                toast.error(`${field}: ${err.message}`);
              });
            } catch {
              // If parsing fails, show the error as is
              if (error.data.error.message) {
                toast.error(error.data.error.message);
              }
            }
          }
        }
      } else {
        // Network or other error
        toast.error('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <AuthDecorations />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-8 border-purple-300 relative overflow-hidden">
          {/* Top Decoration Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 rounded-3xl mb-4 shadow-xl border-4 border-white animate-bounce">
              <Sparkles className="w-8 h-8 text-white" fill="white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              {mode === 'login' ? varnmala('login_welcome') : varnmala('register_welcome')}
            </h1>
            <p className="text-gray-600 font-semibold">
              {mode === 'login'
                ? varnmala('login_subheading')
                : varnmala('register_subheading')}
            </p>

            {/* Mode Indicator */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              <button type='button' onClick={()=>{setMode("login")}}>
              <div
                className={`h-2 w-2 rounded-full ${mode === 'login' ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                  />
                  </button>
              <button type='button' onClick={()=>{setMode("register")}}>
                <div
                  className={`h-2 w-2 rounded-full ${mode === 'register' ? 'bg-pink-500' : 'bg-gray-300'
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Forms */}
          <div className="relative">
            {mode === 'login' ? (
              <LoginForm
                onSubmit={handleLogin}
                onToggleMode={() => setMode('register')}
                loading={isLoginLoading}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                onToggleMode={() => setMode('login')}
                loading={isRegisterLoading}
              />
            )}
          </div>

          {/* Bottom Decoration */}
          <div className="mt-8 flex items-center justify-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            <span className="text-xs text-gray-500 font-semibold">
              Powered by {import.meta.env.VITE_APP_NAME}
            </span>
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;