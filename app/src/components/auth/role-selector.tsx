// components/auth/RoleSelector.tsx - Fun role selection component

import React from 'react';
import { Heart, Stethoscope, Sparkles } from 'lucide-react';
import { UserRole } from '../../types/user.type';

interface RoleSelectorProps {
  value: UserRole | '';
  onChange: (role: UserRole) => void;
  error?: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  const roles = [
    {
      value: 'PARTNER' as UserRole,
      label: 'Therapist/Doctor',
      description: 'I provide therapy services',
      icon: Stethoscope,
      gradient: 'from-purple-400 to-pink-400',
      bgGradient: 'from-purple-50 to-pink-50',
    },
    {
      value: 'PARENT' as UserRole,
      label: 'Parent',
      description: "I'm a parent/guardian",
      icon: Heart,
      gradient: 'from-pink-400 to-rose-400',
      bgGradient: 'from-pink-50 to-rose-50',
    },
  ];

  return (
    <div className="space-y-3">
      <label className=" text-sm font-bold text-purple-800 flex items-center space-x-2">
        <Sparkles className="w-4 h-4 text-yellow-500" />
        <span>I am a...</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = value === role.value;
          
          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onChange(role.value)}
              className={`relative p-4 rounded-2xl border-3 transition-all transform hover:scale-105 ${
                isSelected
                  ? `border-purple-500 bg-gradient-to-br ${role.bgGradient} shadow-lg`
                  : 'border-purple-200 bg-white hover:border-purple-300 shadow-sm'
              }`}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1">
                    <Sparkles className="w-4 h-4 text-white" fill="white" />
                  </div>
                </div>
              )}
              
              <div className="flex flex-col items-center text-center space-y-2">
                <div
                  className={`p-3 rounded-2xl bg-gradient-to-br ${role.gradient} ${
                    isSelected ? 'shadow-lg scale-110' : ''
                  } transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{role.label}</p>
                  <p className="text-xs text-gray-600">{role.description}</p>
                </div>
              </div>
            </button>
          );
        })}
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

export default RoleSelector;