
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white no-gradients">
      {/* Navigation */}
      <nav className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Back Button */}
            <Button
              onClick={() => navigate('/')}
              className="neo-button flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>BACK TO HOME</span>
            </Button>

            {/* Logo */}
            <div className="flex items-center">
              <img 
                alt="The Gryt" 
                src="/lovable-uploads/f846faf6-830e-4f67-828a-5af1b2a8eb01.png" 
                className="h-12 w-auto object-contain" 
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="bg-white py-20 lg:py-32 no-gradients">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <div className="text-center space-y-12">
            <div className="neo-card-green inline-block">
              <span className="neo-text-medium text-black">🎉 WELCOME TO THE GRYT</span>
            </div>
            
            <h1 className="neo-text-huge text-black">
              YOUR JOURNEY TO
              <span className="block" style={{
                color: 'hsl(var(--neon-green))'
              }}>
                TRANSFORMATION
              </span>
              STARTS HERE
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <p className="neo-text-medium text-black leading-relaxed mb-12">
                GET READY TO BUILD UNBREAKABLE HABITS, ACHIEVE YOUR MOST AMBITIOUS GOALS, AND JOIN A COMMUNITY OF CHAMPIONS COMMITTED TO EXCELLENCE.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button onClick={() => navigate('/dashboard')} className="neo-button-primary text-xl px-12 py-6">
                START YOUR JOURNEY
              </Button>
              <Button onClick={() => navigate('/onboarding')} className="neo-button text-xl px-12 py-6">
                LEARN MORE
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Onboarding;
