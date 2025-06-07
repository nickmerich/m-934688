
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HomeHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 lg:py-32 no-gradients">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center space-y-12">
          <div className="neo-card-green inline-block">
            <span className="neo-text-medium text-black">🚀 LAUNCH YOUR TRANSFORMATION</span>
          </div>
          
          <h1 className="neo-text-massive text-black max-w-5xl mx-auto">
            REACH YOUR POTENTIAL
            <span className="block" style={{ color: 'hsl(var(--neon-green))' }}>
              ONE DAY AT A TIME
            </span>
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p className="neo-text-medium text-black leading-relaxed">
              THE GRYT ISN'T JUST ANOTHER HABIT TRACKER. IT'S A COMPLETE TRANSFORMATION SYSTEM THAT BUILDS UNSHAKEABLE DISCIPLINE AND TURNS DREAMS INTO SYSTEMATIC PROGRESS.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => navigate('/signup')}
              className="neo-button-primary text-xl px-12 py-6"
            >
              START TRANSFORMATION
            </Button>
            <Button 
              onClick={() => navigate('/signin')}
              className="neo-button text-xl px-12 py-6"
            >
              SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
