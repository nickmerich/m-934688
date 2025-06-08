
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, TrendingUp, Calendar, Target } from 'lucide-react';

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white no-gradients">
      {/* Navigation */}
      <nav className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Back Button */}
            <Button
              onClick={() => navigate('/dashboard')}
              className="neo-button flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>BACK TO DASHBOARD</span>
            </Button>

            {/* Logo */}
            <div className="flex items-center">
              <img 
                alt="The Gryt" 
                src="/lovable-uploads/c3193544-bf00-4f06-a79a-b09dee14a047.png" 
                className="h-12 w-auto object-cover" 
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="bg-white py-20 lg:py-32 no-gradients">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center space-y-12 mb-16">
            <div className="neo-card-green inline-block">
              <span className="neo-text-medium text-black">📊 TRACK YOUR PROGRESS</span>
            </div>
            
            <h1 className="neo-text-huge text-black">
              ANALYTICS &
              <span className="block" style={{
                color: 'hsl(var(--neon-green))'
              }}>
                INSIGHTS
              </span>
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <p className="neo-text-medium text-black leading-relaxed">
                GET DETAILED INSIGHTS INTO YOUR HABITS, GOALS, AND OVERALL PROGRESS WITH POWERFUL ANALYTICS.
              </p>
            </div>
          </div>

          {/* Analytics Grid */}
          <div className="neo-grid">
            <div className="neo-card">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <BarChart3 className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">HABIT ANALYTICS</h3>
                <p className="neo-text-medium text-black leading-relaxed mb-6">
                  TRACK COMPLETION RATES, STREAKS, AND PATTERNS
                </p>
                <div className="space-y-2">
                  <div className="neo-text-medium text-black">COMPLETION RATE: 89%</div>
                  <div className="neo-text-medium text-black">LONGEST STREAK: 47 DAYS</div>
                </div>
              </div>
            </div>

            <div className="neo-card-pink">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <TrendingUp className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">PROGRESS TRENDS</h3>
                <p className="neo-text-medium text-black leading-relaxed mb-6">
                  VISUALIZE YOUR IMPROVEMENT OVER TIME
                </p>
                <div className="space-y-2">
                  <div className="neo-text-medium text-black">WEEKLY GROWTH: +12%</div>
                  <div className="neo-text-medium text-black">MONTHLY TREND: RISING</div>
                </div>
              </div>
            </div>

            <div className="neo-card-green">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Calendar className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">TIME ANALYSIS</h3>
                <p className="neo-text-medium text-black leading-relaxed mb-6">
                  UNDERSTAND WHEN YOU'RE MOST PRODUCTIVE
                </p>
                <div className="space-y-2">
                  <div className="neo-text-medium text-black">BEST DAY: MONDAY</div>
                  <div className="neo-text-medium text-black">PEAK TIME: 7-9 AM</div>
                </div>
              </div>
            </div>

            <div className="neo-card-charcoal">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Target className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-white mb-4">GOAL PROGRESS</h3>
                <p className="neo-text-medium text-white leading-relaxed mb-6">
                  TRACK YOUR JOURNEY TOWARDS MAJOR GOALS
                </p>
                <div className="space-y-2">
                  <div className="neo-text-medium text-white">GOALS ACHIEVED: 5/8</div>
                  <div className="neo-text-medium text-white">ON TRACK: 3 GOALS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center mt-16">
            <Button onClick={() => navigate('/habits')} className="neo-button-primary text-xl px-12 py-6">
              VIEW DETAILED REPORTS
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
