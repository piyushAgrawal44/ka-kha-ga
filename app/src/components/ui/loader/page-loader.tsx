// components/common/PageLoader.tsx - Animated page loader with Hindi letters

import React from 'react';
import { Sparkles } from 'lucide-react';

interface PageLoaderProps {
  loading?: boolean;
  children: React.ReactNode;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  loading = false, 
  children 
}) => {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
        {/* Loader Container */}
        <div className="relative">
          {/* Main Letter Container */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            {/* क (Ka) */}
            <div className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '0.6s' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <span className="text-4xl sm:text-5xl font-black text-white">क</span>
              </div>
            </div>

            {/* ख (Kha) */}
            <div className="animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '0.6s' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <span className="text-4xl sm:text-5xl font-black text-white">ख</span>
              </div>
            </div>

            {/* ग (Ga) */}
            <div className="animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '0.6s' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-500 to-yellow-400 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <span className="text-4xl sm:text-5xl font-black text-white">ग</span>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-center mt-8">
            <p className="text-xl sm:text-2xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 bg-clip-text animate-pulse">
              Loading...
            </p>
            <p className="text-sm sm:text-base text-gray-600 font-semibold mt-2">
              Please wait while we prepare everything
            </p>
          </div>

          {/* Decorative Sparkles */}
          <div className="absolute -top-4 -left-4 animate-spin" style={{ animationDuration: '3s' }}>
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div className="absolute -top-4 -right-4 animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }}>
            <Sparkles className="w-6 h-6 text-pink-400" />
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 animate-spin" style={{ animationDuration: '3s', animationDelay: '2s' }}>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Actual Page Content (Hidden when loading) */}
      <div className={loading ? 'pointer-events-none' : ''}>
        {children}
      </div>
    </div>
  );
};

export default PageLoader;