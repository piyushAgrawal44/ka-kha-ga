import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User, Mail, Lock, UserPlus, Loader2 } from 'lucide-react';
import { registerSchema, RegisterFormData } from '../../validations/auth.validation';
import InputField from './input-field';
import RoleSelector from './role-selector';
import { UserRole } from '../../types/user.type';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  onToggleMode: () => void;
  loading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onToggleMode,
  loading = false,
}) => {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      role: 'PARTNER',
    },
  });

  const selectedRole = watch("role");

  const goNext = () => {
    if (!selectedRole) return;
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* -------------------- STEP 1 -------------------- */}
      {step === 1 && (
        <>
          <h2 className="text-xl font-bold text-center">Choose Your Identity</h2>

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <RoleSelector
                value={field.value as UserRole}
                onChange={field.onChange}
                error={errors.role?.message}
              />
            )}
          />

          <button
            type="button"
            onClick={goNext}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all"
          >
            Continue →
          </button>
        </>
      )}

      {/* -------------------- STEP 2 -------------------- */}
      {step === 2 && (
        <>
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            icon={User}
            register={register('name')}
            error={errors.name?.message}
          />

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
            placeholder="Create a strong password"
            icon={Lock}
            register={register('password')}
            error={errors.password?.message}
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 text-gray-700 font-semibold hover:underline"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white py-3 px-6 rounded-xl font-black shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </div>
        </>
      )}

      {/* Toggle Login */}
      <div className="text-center pt-4">
        <p className="text-gray-600 text-sm">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-purple-600 font-bold hover:text-purple-800 transition-colors"
          >
            Login here! 🎯
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
