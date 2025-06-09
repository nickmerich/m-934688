
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HomeNavigation() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              alt="The Gryt" 
              src="/lovable-uploads/f846faf6-830e-4f67-828a-5af1b2a8eb01.png" 
              className="h-12 w-auto object-contain" 
            />
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            <Button onClick={() => navigate('/signin')} className="neo-button">
              Sign In
            </Button>
            <Button onClick={() => navigate('/signup')} className="neo-button-primary">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
