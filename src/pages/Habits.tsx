
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, BookOpen, Target, Trophy } from 'lucide-react';
import { HabitGoalIntegration } from '@/components/habits/HabitGoalIntegration';

const Habits = () => {
  const navigate = useNavigate();
  const [showResources, setShowResources] = React.useState(false);

  // Mock goals data for integration
  const mockGoals = [
    {
      id: '1',
      title: 'Lose 10 pounds',
      category: 'Health',
      progress: 6,
      target: 10,
      unit: 'pounds'
    },
    {
      id: '2',
      title: 'Exercise 100 hours',
      category: 'Fitness',
      progress: 45,
      target: 100,
      unit: 'hours'
    }
  ];

  const handleLinkHabitToGoal = (goalId: string, habitName: string) => {
    console.log(`Linking habit ${habitName} to goal ${goalId}`);
    // Implementation for linking habits to goals
  };

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

            {/* Resources Button */}
            <Button
              onClick={() => setShowResources(!showResources)}
              className="neo-button flex items-center space-x-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>{showResources ? 'BACK TO HABITS' : 'VIEW RESOURCES'}</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="bg-white py-20 lg:py-32 no-gradients">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center space-y-12 mb-16">
            <div className="neo-card-green inline-block">
              <span className="neo-text-medium text-black">
                {showResources ? '📚 HABIT MASTERY' : '🎯 TRACK YOUR PROGRESS'}
              </span>
            </div>
            
            <h1 className="neo-text-huge text-black">
              {showResources ? (
                <>
                  RESOURCES &
                  <span className="block" style={{
                    color: 'hsl(var(--neon-green))'
                  }}>
                    FRAMEWORKS
                  </span>
                </>
              ) : (
                <>
                  HABITS
                  <span className="block" style={{
                    color: 'hsl(var(--neon-green))'
                  }}>
                    DASHBOARD
                  </span>
                </>
              )}
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <p className="neo-text-medium text-black leading-relaxed">
                {showResources 
                  ? 'LEARN PROVEN STRATEGIES FOR BUILDING BETTER HABITS AND ACHIEVING YOUR GOALS'
                  : 'BUILD AND TRACK YOUR DAILY HABITS FOR LASTING CHANGE'
                }
              </p>
            </div>
          </div>

          {showResources ? (
            /* Resources Content */
            <div className="neo-grid">
              <div className="neo-card">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                    <BookOpen className="h-8 w-8 text-white" strokeWidth={3} />
                  </div>
                  <h3 className="neo-text-big text-black mb-4">ATOMIC HABITS</h3>
                  <p className="neo-text-medium text-black leading-relaxed mb-6">
                    LEARN THE PROVEN FRAMEWORK FOR BUILDING GOOD HABITS AND BREAKING BAD ONES
                  </p>
                  <Button className="neo-button w-full">
                    READ GUIDE
                  </Button>
                </div>
              </div>

              <div className="neo-card-pink">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                    <Target className="h-8 w-8 text-white" strokeWidth={3} />
                  </div>
                  <h3 className="neo-text-big text-black mb-4">THE 1% RULE</h3>
                  <p className="neo-text-medium text-black leading-relaxed mb-6">
                    DISCOVER HOW SMALL IMPROVEMENTS COMPOUND INTO REMARKABLE RESULTS
                  </p>
                  <Button className="neo-button w-full">
                    LEARN MORE
                  </Button>
                </div>
              </div>

              <div className="neo-card-green">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                    <Calendar className="h-8 w-8 text-white" strokeWidth={3} />
                  </div>
                  <h3 className="neo-text-big text-black mb-4">HABIT STACKING</h3>
                  <p className="neo-text-medium text-black leading-relaxed mb-6">
                    MASTER THE ART OF LINKING NEW HABITS TO EXISTING ROUTINES
                  </p>
                  <Button className="neo-button w-full">
                    START STACKING
                  </Button>
                </div>
              </div>

              <div className="neo-card-charcoal">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                    <Trophy className="h-8 w-8 text-white" strokeWidth={3} />
                  </div>
                  <h3 className="neo-text-big text-white mb-4">KEYSTONE HABITS</h3>
                  <p className="neo-text-medium text-white leading-relaxed mb-6">
                    IDENTIFY THE CORE HABITS THAT TRIGGER POSITIVE CHAIN REACTIONS
                  </p>
                  <Button className="neo-button w-full">
                    FIND YOURS
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Habits Dashboard Content */
            <div className="space-y-12">
              {/* Stats Overview */}
              <div className="neo-grid">
                <div className="neo-card-green">
                  <div className="text-center">
                    <h3 className="neo-text-big text-black mb-4">TODAY'S PROGRESS</h3>
                    <p className="neo-text-huge text-black">3/5</p>
                    <p className="neo-text-medium text-black">HABITS COMPLETED</p>
                  </div>
                </div>

                <div className="neo-card-pink">
                  <div className="text-center">
                    <h3 className="neo-text-big text-black mb-4">CURRENT STREAK</h3>
                    <p className="neo-text-huge text-black">7</p>
                    <p className="neo-text-medium text-black">DAYS IN A ROW</p>
                  </div>
                </div>

                <div className="neo-card">
                  <div className="text-center">
                    <h3 className="neo-text-big text-black mb-4">THIS WEEK</h3>
                    <p className="neo-text-huge text-black">87%</p>
                    <p className="neo-text-medium text-black">COMPLETION RATE</p>
                  </div>
                </div>

                <div className="neo-card-charcoal">
                  <div className="text-center">
                    <h3 className="neo-text-big text-white mb-4">ACTIVE HABITS</h3>
                    <p className="neo-text-huge text-white">8</p>
                    <p className="neo-text-medium text-white">BEING TRACKED</p>
                  </div>
                </div>
              </div>

              {/* Goal Integration */}
              <HabitGoalIntegration 
                goals={mockGoals}
                onLinkHabitToGoal={handleLinkHabitToGoal}
              />

              {/* Today's Habits */}
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="neo-text-big text-black">TODAY'S HABITS</h2>
                  <Button 
                    onClick={() => navigate('/habits/new')}
                    className="neo-button-primary"
                  >
                    + ADD HABIT
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="neo-card-green p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">✓</span>
                        </div>
                        <div>
                          <h3 className="neo-text-medium text-black">MORNING MEDITATION</h3>
                          <p className="neo-text-medium text-black opacity-70">7 DAYS STREAK • MINDFULNESS • +10 WINS</p>
                        </div>
                      </div>
                      <span className="neo-text-medium text-black px-4 py-2 bg-black text-white rounded">EASY</span>
                    </div>
                  </div>

                  <div className="neo-card p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 border-4 border-black rounded-full"></div>
                        <div>
                          <h3 className="neo-text-medium text-black">WORKOUT SESSION</h3>
                          <p className="neo-text-medium text-black opacity-70">5 DAYS STREAK • FITNESS • +30 WINS • LINKED TO: LOSE 10 POUNDS</p>
                        </div>
                      </div>
                      <span className="neo-text-medium text-black px-4 py-2 bg-red-500 text-white rounded">HARD</span>
                    </div>
                  </div>

                  <div className="neo-card-green p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">✓</span>
                        </div>
                        <div>
                          <h3 className="neo-text-medium text-black">READ 30 MINUTES</h3>
                          <p className="neo-text-medium text-black opacity-70">12 DAYS STREAK • LEARNING • +20 WINS</p>
                        </div>
                      </div>
                      <span className="neo-text-medium text-black px-4 py-2 bg-yellow-500 text-black rounded">MEDIUM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center mt-16">
            <Button onClick={() => navigate('/goals')} className="neo-button-primary text-xl px-12 py-6">
              VIEW YOUR GOALS
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Habits;
