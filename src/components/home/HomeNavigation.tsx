
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HomeNavigation() {
  const navigate = useNavigate();

  return (
    <nav className="border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/lovable-uploads/62433d31-9986-454a-9285-9bda4b300e80.png" 
                alt="The Gryt" 
                className="h-10 w-10 object-contain"
              />
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-sm animate-pulse-gentle"></div>
            </div>
            <div className="text-xl sm:text-2xl font-bold">
              <span className="text-white">The </span>
              <span className="text-green-500 glow-text">Gryt</span>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/signin')}
              className="text-gray-300 hover:text-white text-sm sm:text-base px-2 sm:px-4"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-glow text-sm sm:text-base px-3 sm:px-4"
            >
              Get Started
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
