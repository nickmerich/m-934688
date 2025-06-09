import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Brain, Dumbbell, Heart, Puzzle } from 'lucide-react';

const Integrations = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'apps' | 'calendar'>('apps');

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

            {/* Empty middle section */}
            <div></div>

            {/* Tab Navigation */}
            <div className="flex space-x-2">
              <Button
                onClick={() => setActiveTab('apps')}
                className={activeTab === 'apps' ? 'neo-button-primary' : 'neo-button'}
              >
                <Brain className="h-4 w-4 mr-2" />
                APPS
              </Button>
              <Button
                onClick={() => setActiveTab('calendar')}
                className={activeTab === 'calendar' ? 'neo-button-primary' : 'neo-button'}
              >
                <Calendar className="h-4 w-4 mr-2" />
                CALENDAR
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
              <span className="neo-text-medium text-black">
                {activeTab === 'apps' ? '🔗 CONNECT YOUR APPS' : '📅 SYNC YOUR SCHEDULE'}
              </span>
            </div>
            
            <h1 className="neo-text-huge text-black">
              {activeTab === 'apps' ? (
                <>
                  APP
                  <span className="block" style={{
                    color: 'hsl(var(--neon-green))'
                  }}>
                    INTEGRATIONS
                  </span>
                </>
              ) : (
                <>
                  CALENDAR &
                  <span className="block" style={{
                    color: 'hsl(var(--neon-green))'
                  }}>
                    REMINDERS
                  </span>
                </>
              )}
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <p className="neo-text-medium text-black leading-relaxed">
                {activeTab === 'apps' 
                  ? 'CONNECT YOUR FAVORITE PRODUCTIVITY APPS TO ENHANCE YOUR JOURNEY'
                  : 'SYNC YOUR CALENDAR AND SET UP DAILY REMINDERS TO STAY ON TRACK'
                }
              </p>
            </div>
          </div>

          {activeTab === 'apps' ? (
            /* App Integrations Content */
            <div className="space-y-12">
              {/* Mind Category */}
              <div>
                <h2 className="neo-text-big text-black mb-8 text-center">MIND - PRODUCTIVITY & LEARNING</h2>
                <div className="neo-grid">
                  <div className="neo-card">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                        <Brain className="h-8 w-8 text-white" strokeWidth={3} />
                      </div>
                      <h3 className="neo-text-big text-black mb-4">NOTION</h3>
                      <p className="neo-text-medium text-black leading-relaxed mb-6">
                        SYNC YOUR HABITS WITH YOUR NOTION WORKSPACE
                      </p>
                      <Button className="neo-button w-full">
                        CONNECT
                      </Button>
                    </div>
                  </div>

                  <div className="neo-card-green">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                        <Brain className="h-8 w-8 text-white" strokeWidth={3} />
                      </div>
                      <h3 className="neo-text-big text-black mb-4">TODOIST</h3>
                      <p className="neo-text-medium text-black leading-relaxed mb-6">
                        INTEGRATE WITH YOUR TASK MANAGEMENT SYSTEM
                      </p>
                      <Button className="neo-button w-full">
                        CONNECT
                      </Button>
                    </div>
                  </div>

                  <div className="neo-card-pink">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                        <Brain className="h-8 w-8 text-white" strokeWidth={3} />
                      </div>
                      <h3 className="neo-text-big text-black mb-4">OBSIDIAN</h3>
                      <p className="neo-text-medium text-black leading-relaxed mb-6">
                        LINK YOUR NOTES TO YOUR HABIT JOURNEY
                      </p>
                      <Button className="neo-button w-full">
                        CONNECT
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Category */}
              <div>
                <h2 className="neo-text-big text-black mb-8 text-center">BODY - FITNESS & WELLNESS</h2>
                <div className="neo-grid">
                  <div className="neo-card-green">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                        <Dumbbell className="h-8 w-8 text-white" strokeWidth={3} />
                      </div>
                      <h3 className="neo-text-big text-black mb-4">APPLE HEALTH</h3>
                      <p className="neo-text-medium text-black leading-relaxed mb-6">
                        SYNC YOUR FITNESS DATA AND HEALTH METRICS
                      </p>
                      <Button className="neo-button w-full">
                        CONNECT
                      </Button>
                    </div>
                  </div>

                  <div className="neo-card">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                        <Dumbbell className="h-8 w-8 text-white" strokeWidth={3} />
                      </div>
                      <h3 className="neo-text-big text-black mb-4">MYFITNESSPAL</h3>
                      <p className="neo-text-medium text-black leading-relaxed mb-6">
                        TRACK NUTRITION AND CALORIE GOALS
                      </p>
                      <Button className="neo-button w-full">
                        CONNECT
                      </Button>
                    </div>
                  </div>

                  <div className="neo-card-pink">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                        <Dumbbell className="h-8 w-8 text-white" strokeWidth={3} />
                      </div>
                      <h3 className="neo-text-big text-black mb-4">STRAVA</h3>
                      <p className="neo-text-medium text-black leading-relaxed mb-6">
                        CONNECT YOUR RUNNING AND CYCLING ACTIVITIES
                      </p>
                      <Button className="neo-button w-full">
                        CONNECT
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spirit Category */}
              <div>
                <h2 className="neo-text-big text-black mb-8 text-center">SPIRIT - MINDFULNESS & GROWTH</h2>
                <div className="neo-grid">
                  <div className="neo-card-pink">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                        <Heart className="h-8 w-8 text-white" strokeWidth={3} />
                      </div>
                      <h3 className="neo-text-big text-black mb-4">HEADSPACE</h3>
                      <p className="neo-text-medium text-black leading-relaxed mb-6">
                        SYNC YOUR MEDITATION AND MINDFULNESS PRACTICE
                      </p>
                      <Button className="neo-button w-full">
                        CONNECT
                      </Button>
                    </div>
                  </div>

                  <div className="neo-card-green">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                        <Heart className="h-8 w-8 text-white" strokeWidth={3} />
                      </div>
                      <h3 className="neo-text-big text-black mb-4">CALM</h3>
                      <p className="neo-text-medium text-black leading-relaxed mb-6">
                        INTEGRATE YOUR SLEEP AND RELAXATION SESSIONS
                      </p>
                      <Button className="neo-button w-full">
                        CONNECT
                      </Button>
                    </div>
                  </div>

                  <div className="neo-card-charcoal">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                        <Heart className="h-8 w-8 text-white" strokeWidth={3} />
                      </div>
                      <h3 className="neo-text-big text-white mb-4">INSIGHT TIMER</h3>
                      <p className="neo-text-medium text-white leading-relaxed mb-6">
                        TRACK YOUR MEDITATION STREAKS AND SESSIONS
                      </p>
                      <Button className="neo-button w-full">
                        CONNECT
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Calendar Content */
            <div className="neo-grid">
              <div className="neo-card">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                    <Calendar className="h-8 w-8 text-white" strokeWidth={3} />
                  </div>
                  <h3 className="neo-text-big text-black mb-4">GOOGLE CALENDAR</h3>
                  <p className="neo-text-medium text-black leading-relaxed mb-6">
                    SYNC YOUR HABITS WITH YOUR GOOGLE CALENDAR
                  </p>
                  <Button className="neo-button w-full">
                    CONNECT
                  </Button>
                </div>
              </div>

              <div className="neo-card-pink">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                    <Calendar className="h-8 w-8 text-white" strokeWidth={3} />
                  </div>
                  <h3 className="neo-text-big text-black mb-4">OUTLOOK CALENDAR</h3>
                  <p className="neo-text-medium text-black leading-relaxed mb-6">
                    INTEGRATE WITH MICROSOFT OUTLOOK CALENDAR
                  </p>
                  <Button className="neo-button w-full">
                    CONNECT
                  </Button>
                </div>
              </div>

              <div className="neo-card-green">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                    <Calendar className="h-8 w-8 text-white" strokeWidth={3} />
                  </div>
                  <h3 className="neo-text-big text-black mb-4">APPLE CALENDAR</h3>
                  <p className="neo-text-medium text-black leading-relaxed mb-6">
                    SYNC WITH YOUR IPHONE AND MAC CALENDAR
                  </p>
                  <Button className="neo-button w-full">
                    CONNECT
                  </Button>
                </div>
              </div>

              <div className="neo-card-charcoal">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                    <Puzzle className="h-8 w-8 text-white" strokeWidth={3} />
                  </div>
                  <h3 className="neo-text-big text-white mb-4">CUSTOM REMINDERS</h3>
                  <p className="neo-text-medium text-white leading-relaxed mb-6">
                    SET UP PERSONALIZED HABIT REMINDERS
                  </p>
                  <Button className="neo-button w-full">
                    SETUP
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center mt-16">
            <Button onClick={() => navigate('/dashboard')} className="neo-button-primary text-xl px-12 py-6">
              BACK TO DASHBOARD
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Integrations;
