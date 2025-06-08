
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Trophy, Calendar, Users } from 'lucide-react';

const Dashboard = () => {
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
                src="/lovable-uploads/c3193544-bf00-4f06-a79a-b09dee14a047.png" 
                className="h-12 w-auto object-cover" 
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Button onClick={() => navigate('/habits')} className="neo-button">
                HABITS
              </Button>
              <Button onClick={() => navigate('/goals')} className="neo-button">
                GOALS
              </Button>
              <Button onClick={() => navigate('/analytics')} className="neo-button">
                ANALYTICS
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="bg-white py-20 lg:py-32 no-gradients">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center space-y-12 mb-16">
            <div className="neo-card-green inline-block">
              <span className="neo-text-medium text-black">🚀 YOUR COMMAND CENTER</span>
            </div>
            
            <h1 className="neo-text-huge text-black">
              DASHBOARD
              <span className="block" style={{
                color: 'hsl(var(--neon-green))'
              }}>
                OVERVIEW
              </span>
            </h1>
          </div>

          {/* Stats Grid */}
          <div className="neo-grid mb-16">
            <div className="neo-card-green">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Target className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">ACTIVE HABITS</h3>
                <p className="neo-text-huge text-black">12</p>
              </div>
            </div>

            <div className="neo-card-pink">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Trophy className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">GOALS ACHIEVED</h3>
                <p className="neo-text-huge text-black">5</p>
              </div>
            </div>

            <div className="neo-card">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Calendar className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">STREAK DAYS</h3>
                <p className="neo-text-huge text-black">47</p>
              </div>
            </div>

            <div className="neo-card-charcoal">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Users className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-white mb-4">COMMUNITY RANK</h3>
                <p className="neo-text-huge text-white">#42</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="text-center space-y-8">
            <h2 className="neo-text-big text-black">QUICK ACTIONS</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button onClick={() => navigate('/habits')} className="neo-button-primary text-xl px-12 py-6">
                TRACK HABITS
              </Button>
              <Button onClick={() => navigate('/goals')} className="neo-button-accent text-xl px-12 py-6">
                SET GOALS
              </Button>
              <Button onClick={() => navigate('/analytics')} className="neo-button text-xl px-12 py-6">
                VIEW ANALYTICS
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
