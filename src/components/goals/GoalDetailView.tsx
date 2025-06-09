
import React, { useState } from 'react';
import { ArrowLeft, Target, Calendar, TrendingUp, Edit3, Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  deadline: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  unit: string;
}

interface Milestone {
  id: string;
  title: string;
  target: number;
  completed: boolean;
  dueDate: string;
}

interface GoalDetailViewProps {
  goal: Goal;
  onBack: () => void;
  onUpdateProgress: (goalId: string, newProgress: number) => void;
}

export function GoalDetailView({ goal, onBack, onUpdateProgress }: GoalDetailViewProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: `Reach ${Math.round(goal.target * 0.25)} ${goal.unit}`,
      target: Math.round(goal.target * 0.25),
      completed: goal.progress >= Math.round(goal.target * 0.25),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    {
      id: '2',
      title: `Reach ${Math.round(goal.target * 0.5)} ${goal.unit}`,
      target: Math.round(goal.target * 0.5),
      completed: goal.progress >= Math.round(goal.target * 0.5),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    {
      id: '3',
      title: `Reach ${Math.round(goal.target * 0.75)} ${goal.unit}`,
      target: Math.round(goal.target * 0.75),
      completed: goal.progress >= Math.round(goal.target * 0.75),
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  ]);

  const [newProgressValue, setNewProgressValue] = useState('');
  const [goalNotes, setGoalNotes] = useState(goal.description || '');
  const { toast } = useToast();

  const progressPercentage = (goal.progress / goal.target) * 100;
  const daysUntilDeadline = Math.ceil(
    (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleProgressUpdate = () => {
    const newProgress = parseFloat(newProgressValue);
    if (isNaN(newProgress) || newProgress < 0) {
      toast({
        title: "Invalid progress value",
        description: "Please enter a valid number.",
        variant: "destructive"
      });
      return;
    }

    onUpdateProgress(goal.id, newProgress);
    setNewProgressValue('');
    toast({
      title: "Progress updated!",
      description: `Goal progress updated to ${newProgress} ${goal.unit}.`,
    });
  };

  const getRecommendedHabits = (category: string) => {
    const habitRecommendations: Record<string, string[]> = {
      Health: ['Daily water intake tracking', 'Meal prep sessions', 'Sleep schedule maintenance'],
      Fitness: ['Morning workout routine', 'Daily step counting', 'Workout planning'],
      Learning: ['Daily reading time', 'Practice sessions', 'Note-taking routine'],
      Finance: ['Daily expense tracking', 'Weekly budget review', 'Investment research'],
      Career: ['Skill practice sessions', 'Networking activities', 'Portfolio updates'],
    };
    return habitRecommendations[category] || ['Daily progress review', 'Planning sessions', 'Reflection time'];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button onClick={onBack} className="neo-button flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO GOALS</span>
        </Button>
        <Button className="neo-button-accent">
          <Edit3 className="h-4 w-4 mr-2" />
          EDIT GOAL
        </Button>
      </div>

      {/* Goal Overview */}
      <div className="neo-card-green p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="neo-text-huge text-black mb-2">{goal.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="neo-text-medium text-black">{goal.category.toUpperCase()}</span>
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${getPriorityColor(goal.priority)}`}></span>
                <span className="neo-text-medium text-black">{goal.priority.toUpperCase()} PRIORITY</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="neo-text-big text-black">{Math.round(progressPercentage)}%</p>
            <p className="neo-text-medium text-black">COMPLETE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="neo-card p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-black" strokeWidth={3} />
              <span className="neo-text-medium text-black">PROGRESS</span>
            </div>
            <p className="neo-text-big text-black">{goal.progress} / {goal.target} {goal.unit}</p>
          </div>

          <div className="neo-card p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-black" strokeWidth={3} />
              <span className="neo-text-medium text-black">DEADLINE</span>
            </div>
            <p className="neo-text-big text-black">{goal.deadline}</p>
            <p className="neo-text-medium text-black">{daysUntilDeadline} DAYS LEFT</p>
          </div>

          <div className="neo-card p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-black" strokeWidth={3} />
              <span className="neo-text-medium text-black">RATE</span>
            </div>
            <p className="neo-text-big text-black">{(goal.progress / Math.max(1, 30 - daysUntilDeadline)).toFixed(1)}</p>
            <p className="neo-text-medium text-black">{goal.unit.toUpperCase()}/DAY</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black h-6 border-4 border-black mb-4">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Progress Update */}
      <div className="neo-card p-6">
        <h2 className="neo-text-big text-black mb-4">UPDATE PROGRESS</h2>
        <div className="flex space-x-4">
          <Input
            type="number"
            placeholder={`Current: ${goal.progress} ${goal.unit}`}
            value={newProgressValue}
            onChange={(e) => setNewProgressValue(e.target.value)}
            className="neo-border bg-white text-black placeholder:text-black/60"
          />
          <Button onClick={handleProgressUpdate} className="neo-button-primary">
            UPDATE
          </Button>
        </div>
      </div>

      {/* Milestones */}
      <div className="neo-card p-6">
        <h2 className="neo-text-big text-black mb-6">MILESTONES</h2>
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className={milestone.completed ? 'neo-card-green p-4' : 'neo-card p-4'}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 border-4 border-black rounded-full flex items-center justify-center ${
                    milestone.completed ? 'bg-black' : 'bg-white'
                  }`}>
                    {milestone.completed && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </div>
                  <div>
                    <h3 className="neo-text-medium text-black">{milestone.title}</h3>
                    <p className="neo-text-medium text-black opacity-70">DUE: {milestone.dueDate}</p>
                  </div>
                </div>
                <span className={`neo-text-medium px-4 py-2 border-4 border-black ${
                  milestone.completed ? 'bg-black text-white' : 'bg-white text-black'
                }`}>
                  {milestone.completed ? 'COMPLETED' : 'PENDING'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goal Notes */}
      <div className="neo-card p-6">
        <h2 className="neo-text-big text-black mb-4">GOAL CONTEXT & NOTES</h2>
        <Textarea
          value={goalNotes}
          onChange={(e) => setGoalNotes(e.target.value)}
          placeholder="Add notes about your goal, motivation, strategies, or any additional context..."
          className="neo-border bg-white text-black placeholder:text-black/60 min-h-[120px] mb-4"
        />
        <Button className="neo-button">
          SAVE NOTES
        </Button>
      </div>

      {/* Recommended Habits */}
      <div className="neo-card-pink p-6">
        <h2 className="neo-text-big text-black mb-4">RECOMMENDED HABITS FOR THIS GOAL</h2>
        <p className="neo-text-medium text-black mb-6">
          BUILD THESE HABITS TO SUPPORT YOUR GOAL ACHIEVEMENT
        </p>
        <div className="space-y-3">
          {getRecommendedHabits(goal.category).map((habit, index) => (
            <div key={index} className="neo-card p-4 flex items-center justify-between">
              <span className="neo-text-medium text-black">{habit.toUpperCase()}</span>
              <Button className="neo-button-primary">
                <Plus className="h-4 w-4 mr-2" />
                ADD HABIT
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
