
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Zap, BarChart3, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white no-gradients">
      {/* Navigation */}
      <nav className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <img 
                alt="The Gryt" 
                src="/lovable-uploads/f846faf6-830e-4f67-828a-5af1b2a8eb01.png" 
                className="h-12 w-auto object-contain" 
              />
            </div>
            <Link to="/signin" className="neo-button">
              GET STARTED
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-20 lg:py-32 no-gradients">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center space-y-12 mb-16">
            {/* Green badge with updated text */}
            <div className="inline-block bg-green-500 border-4 border-black px-3 py-1" style={{
              background: 'hsl(var(--neon-green))',
              boxShadow: '4px 4px 0px #000000'
            }}>
              <span className="text-sm font-bold text-black">🌱 PERSONAL GROWTH ACCELERATOR</span>
            </div>
            
            <h1 className="neo-text-massive text-black">
              BUILD YOURSELF.
              <span className="block" style={{
                color: 'hsl(var(--neon-green))'
              }}>
                DO THE THING.
              </span>
            </h1>
            
            <p className="neo-text-big text-black max-w-3xl mx-auto leading-relaxed">
              THE ULTIMATE HABIT TRACKER THAT COMBINES POWERFUL ANALYTICS, 
              AI COACHING, AND SOCIAL ACCOUNTABILITY TO HELP YOU BUILD 
              LASTING POSITIVE CHANGES
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/signin" className="neo-button-primary">
                START YOUR JOURNEY
              </Link>
              <Link to="/signin" className="neo-button">
                SIGN IN
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="neo-grid">
            <div className="neo-card">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Zap className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">SMART TRACKING</h3>
                <p className="neo-text-medium text-black leading-relaxed">
                  TRACK YOUR HABITS WITH INTELLIGENT REMINDERS AND 
                  CUSTOMIZABLE GOALS THAT ADAPT TO YOUR LIFESTYLE
                </p>
              </div>
            </div>

            <div className="neo-card-grey">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <BarChart3 className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-white mb-4">POWERFUL ANALYTICS</h3>
                <p className="neo-text-medium text-white leading-relaxed">
                  VISUALIZE YOUR PROGRESS WITH DETAILED CHARTS AND 
                  INSIGHTS THAT HELP YOU UNDERSTAND YOUR PATTERNS
                </p>
              </div>
            </div>

            <div className="neo-card-green">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Target className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">GOAL ACHIEVEMENT</h3>
                <p className="neo-text-medium text-black leading-relaxed">
                  SET MEANINGFUL GOALS AND BREAK THEM DOWN INTO 
                  MANAGEABLE HABITS THAT LEAD TO SUCCESS
                </p>
              </div>
            </div>

            <div className="neo-card-charcoal">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Users className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-white mb-4">AI COACHING</h3>
                <p className="neo-text-medium text-white leading-relaxed">
                  GET PERSONALIZED GUIDANCE FROM OUR AI HABIT PARTNER 
                  THAT LEARNS YOUR PATTERNS AND MOTIVATES YOU
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <div className="neo-card-green inline-block p-8">
              <h2 className="neo-text-big text-black mb-4">READY TO TRANSFORM YOUR LIFE?</h2>
              <p className="neo-text-medium text-black mb-6">
                JOIN THOUSANDS OF USERS WHO HAVE ALREADY BUILT LASTING HABITS
              </p>
              <Link to="/signin" className="neo-button-primary">
                GET STARTED FOR FREE
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
