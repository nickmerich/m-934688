
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export function HomeHero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative">
        <div className="text-center space-y-6 sm:space-y-8">
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">
            🚀 Launch your transformation journey
          </Badge>
          
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight px-4 sm:px-0">
            <span className="text-green-500 glow-text">Reach Your Potential</span>
            <span className="block text-white">One Day At A Time</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            The Gryt isn't just another habit tracker. It's a complete transformation system that builds 
            unshakeable discipline, turns dreams into systematic progress, and forges the mental toughness 
            needed to achieve extraordinary results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-glow hover:shadow-glow-intense transition-all duration-300"
            >
              Start Your Transformation
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/signin')}
              className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
