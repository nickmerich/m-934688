
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

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
            <div className="neo-card-pink inline-block">
              <span className="neo-text-medium text-black">❌ PAGE NOT FOUND</span>
            </div>
            
            <h1 className="neo-text-massive text-black">
              404
            </h1>
            
            <h2 className="neo-text-huge text-black">
              OOPS! THIS PAGE
              <span className="block" style={{
                color: 'hsl(var(--neon-green))'
              }}>
                DOESN'T EXIST
              </span>
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="neo-text-medium text-black leading-relaxed mb-12">
                THE PAGE YOU'RE LOOKING FOR HAS BEEN MOVED, DELETED, OR NEVER EXISTED. LET'S GET YOU BACK ON TRACK.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button onClick={() => navigate('/')} className="neo-button-primary text-xl px-12 py-6 flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>RETURN HOME</span>
              </Button>
              <Button onClick={() => navigate(-1)} className="neo-button text-xl px-12 py-6">
                GO BACK
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
