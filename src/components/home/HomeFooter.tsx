
import React from 'react';

export function HomeFooter() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/62433d31-9986-454a-9285-9bda4b300e80.png" 
              alt="The Gryt" 
              className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
            />
            <span className="text-lg sm:text-xl font-bold text-white">The <span className="text-green-500">Gryt</span></span>
          </div>
          <div className="text-gray-400 text-xs sm:text-sm text-center">
            © 2024 The Gryt. Building unbreakable habits, one day at a time.
          </div>
        </div>
      </div>
    </footer>
  );
}
