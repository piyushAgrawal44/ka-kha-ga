import React from "react";
import { AlertTriangle, Sparkles } from "lucide-react";
import { APP_ENV } from "../../config/app.config";

interface ErrorState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-6">
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-md w-full border-4 border-purple-300 relative">

            {/* Top Bar Accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 rounded-t-3xl" />

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center 
                bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 
                rounded-2xl shadow-xl border-4 border-white animate-pulse">
                <AlertTriangle className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Text */}
            <h1 className="text-3xl font-black text-center text-gray-800 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-center text-gray-600 font-semibold mb-6">
              Don't worry — our system is on it.  
              Please refresh or try again later.
            </p>

            {/* Button */}
            <div className="flex justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r 
                  from-purple-500 via-pink-500 to-yellow-400 
                  text-white font-semibold rounded-xl shadow-lg 
                  hover:opacity-90 transition-all duration-300"
              >
                Refresh Page
              </button>
            </div>

            {/* Bottom Decoration */}
            <div className="mt-8 flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-500 font-semibold">{APP_ENV.appName}</span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
