
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HomeCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
          Your Transformation Starts <span className="text-green-500">Today</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
          Be among the first to experience a revolutionary approach to building unbreakable habits and achieving your most ambitious goals.
        </p>
        <Button 
          size="lg"
          onClick={() => navigate('/signup')}
          className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-glow hover:shadow-glow-intense transition-all duration-300"
        >
          Begin Your Journey
          <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </section>
  );
}
