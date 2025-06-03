
import React from 'react';

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <img 
            src="/lovable-uploads/62433d31-9986-454a-9285-9bda4b300e80.png" 
            alt="The Gryt" 
            className="h-20 w-20 object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to <span className="text-green-500">Gryt</span></h1>
        <p className="text-gray-400">Your journey to transformation starts here</p>
      </div>
    </div>
  );
};

export default Onboarding;
