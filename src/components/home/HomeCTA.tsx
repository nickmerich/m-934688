
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HomeCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
        <h2 className="neo-text-huge text-black mb-8">
          YOUR TRANSFORMATION STARTS
          <span className="block" style={{ color: 'hsl(var(--neon-green))' }}>
            TODAY
          </span>
        </h2>
        <p className="neo-text-medium text-black mb-12 leading-relaxed">
          BE AMONG THE FIRST TO EXPERIENCE A REVOLUTIONARY APPROACH TO BUILDING UNBREAKABLE HABITS AND ACHIEVING YOUR MOST AMBITIOUS GOALS.
        </p>
        <Button 
          onClick={() => navigate('/signup')}
          className="neo-button-primary text-xl px-12 py-6"
        >
          BEGIN YOUR JOURNEY
        </Button>
      </div>
    </section>
  );
}
