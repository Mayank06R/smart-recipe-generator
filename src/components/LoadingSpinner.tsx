import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Generating your perfect recipe..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full animate-pulse"></div>
        <Loader2 className="absolute inset-0 m-auto h-8 w-8 text-white animate-spin" />
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-gray-700">{message}</p>
        <p className="text-sm text-gray-500">Our AI chef is working its magic...</p>
      </div>

      {/* Animated cooking icons */}
      <div className="flex space-x-2 mt-6">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;