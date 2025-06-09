
import React from 'react';
import { Target, Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  target: number;
  unit: string;
}

interface HabitGoalIntegrationProps {
  goals: Goal[];
  onLinkHabitToGoal: (goalId: string, habitName: string) => void;
}

export function HabitGoalIntegration({ goals, onLinkHabitToGoal }: HabitGoalIntegrationProps) {
  const fitnessGoals = goals.filter(goal => 
    goal.category === 'Fitness' || goal.category === 'Health'
  );

  return (
    <div className="neo-card-pink p-6">
      <h2 className="neo-text-big text-black mb-4">LINK HABITS TO GOALS</h2>
      <p className="neo-text-medium text-black mb-6">
        CONNECT YOUR HABITS TO SPECIFIC GOALS FOR BETTER TRACKING
      </p>
      
      {fitnessGoals.length === 0 ? (
        <div className="text-center py-8">
          <Target className="h-12 w-12 text-black mx-auto mb-4" strokeWidth={3} />
          <p className="neo-text-medium text-black mb-4">
            NO FITNESS OR HEALTH GOALS FOUND
          </p>
          <Button className="neo-button-primary">
            CREATE FITNESS GOAL
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {fitnessGoals.map((goal) => {
            const progressPercentage = (goal.progress / goal.target) * 100;
            return (
              <div key={goal.id} className="neo-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="neo-text-medium text-black">{goal.title}</h3>
                    <p className="neo-text-medium text-black opacity-70">
                      {goal.progress} / {goal.target} {goal.unit} ({Math.round(progressPercentage)}%)
                    </p>
                  </div>
                  <Button 
                    className="neo-button"
                    onClick={() => onLinkHabitToGoal(goal.id, 'workout')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    LINK HABIT
                  </Button>
                </div>
                
                <div className="w-full bg-black h-2 border-2 border-black">
                  <div 
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
