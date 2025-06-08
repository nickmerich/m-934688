
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
export function HomeHero() {
  const navigate = useNavigate();
  return <section className="bg-white py-20 lg:py-32 no-gradients">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center space-y-12">
          <div className="neo-card-green inline-block">
            <span className="neo-text-medium text-black">🚀 LAUNCH YOUR TRANSFORMATION</span>
          </div>
          
          <h1 className="neo-text-massive text-black max-w-5xl mx-auto">
            BUILD HABITS THAT
            <span className="block" style={{
            color: 'hsl(var(--neon-green))'
          }}>
              CHANGE EVERYTHING
            </span>
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p className="neo-text-medium text-black leading-relaxed">🚀 Centralize habit tracking from all your apps
📊 Leverage AI-driven insights
💪 Achieve tangible results within 90 days
✨ Transform into the person you aspire to be in just one year

          </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button onClick={() => navigate('/signup')} className="neo-button-primary text-xl px-12 py-6">
              START TRANSFORMATION
            </Button>
            <Button onClick={() => navigate('/signin')} className="bg-white text-black border-4 border-black px-12 py-6 font-black uppercase text-xl hover:bg-gray-100 transition-all duration-100" style={{
            boxShadow: '4px 4px 0px #000000'
          }} onMouseEnter={e => {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
          }} onMouseLeave={e => {
            e.currentTarget.style.transform = 'translate(0px, 0px)';
            e.currentTarget.style.boxShadow = '4px 4px 0px #000000';
          }}>
              SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </section>;
}
