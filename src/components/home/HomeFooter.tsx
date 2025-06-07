
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HomeFooter() {
  const navigate = useNavigate();

  return (
    <footer className="bg-black border-t-4 border-white py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo Section */}
          <div className="text-center md:text-left">
            <img 
              src="/lovable-uploads/36057026-7f82-4caf-a7df-9d724c8be803.png" 
              alt="The Gryt" 
              className="h-16 w-auto object-contain mx-auto md:mx-0 mb-4"
            />
            <p className="neo-text-medium text-white">
              BUILDING UNBREAKABLE HABITS, ONE DAY AT A TIME.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <h3 className="neo-text-big text-white mb-6">NAVIGATE</h3>
            <nav className="space-y-3">
              <div><span className="neo-text-medium text-white cursor-pointer hover:text-green-500">HOME</span></div>
              <div><span className="neo-text-medium text-white cursor-pointer hover:text-green-500">FEATURES</span></div>
              <div><span className="neo-text-medium text-white cursor-pointer hover:text-green-500">PRICING</span></div>
              <div><span className="neo-text-medium text-white cursor-pointer hover:text-green-500">CONTACT</span></div>
            </nav>
          </div>

          {/* Sign Up Form */}
          <div className="text-center md:text-right">
            <h3 className="neo-text-big text-white mb-6">GET STARTED</h3>
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/signup')}
                className="neo-button-primary w-full"
              >
                SIGN UP NOW
              </Button>
              <Button 
                onClick={() => navigate('/signin')}
                className="neo-button-accent w-full"
              >
                SIGN IN
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-4 border-white pt-8">
          <div className="text-center">
            <p className="neo-text-medium text-white">
              © 2024 THE GRYT. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
