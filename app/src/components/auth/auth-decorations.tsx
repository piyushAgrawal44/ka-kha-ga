// components/auth/AuthDecorations.tsx - Fun background decorations

import React from 'react';
import { Star, Heart, Sparkles, Smile } from 'lucide-react';

export const AuthDecorations: React.FC = () => {
  const floatingElements = [
    { Icon: Star, className: 'top-10 left-10', delay: '0s', color: 'text-yellow-400', size: 'w-8 h-8' },
    { Icon: Heart, className: 'top-20 right-20', delay: '0.5s', color: 'text-pink-400', size: 'w-10 h-10' },
    { Icon: Sparkles, className: 'bottom-20 left-20', delay: '1s', color: 'text-purple-400', size: 'w-12 h-12' },
    { Icon: Smile, className: 'bottom-10 right-10', delay: '1.5s', color: 'text-blue-400', size: 'w-9 h-9' },
    { Icon: Star, className: 'top-1/2 left-5', delay: '2s', color: 'text-green-400', size: 'w-6 h-6' },
    { Icon: Heart, className: 'top-1/3 right-10', delay: '2.5s', color: 'text-rose-400', size: 'w-7 h-7' },
  ];

  return (
    <>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100" />
      
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Elements */}
      {floatingElements.map((item, idx) => {
        const { Icon, className, delay, color, size } = item;
        return (
          <Icon
            key={idx}
            className={`absolute ${className} ${color} ${size} animate-bounce opacity-40 pointer-events-none`}
            style={{ animationDelay: delay, animationDuration: '3s' }}
          />
        );
      })}
    </>
  );
};

export default AuthDecorations;