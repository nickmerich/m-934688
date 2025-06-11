
import React from 'react';
import { Target, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  deadline: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Lose 10 pounds',
    description: 'Achieve target weight through consistent exercise and nutrition',
    progress: 6,
    target: 10,
    deadline: '2024-03-15',
    category: 'Health',
    priority: 'High'
  },
  {
    id: '2',
    title: 'Read 12 books',
    description: 'Expand knowledge through consistent reading habit',
    progress: 4,
    target: 12,
    deadline: '2024-06-30',
    category: 'Learning',
    priority: 'Medium'
  },
  {
    id: '3',
    title: 'Save $5,000',
    description: 'Build emergency fund for financial security',
    progress: 2800,
    target: 5000,
    deadline: '2024-12-31',
    category: 'Finance',
    priority: 'High'
  }
];

export function GoalProgress() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500 text-white border-2 border-black';
      case 'Medium': return 'bg-yellow-500 text-black border-2 border-black';
      case 'Low': return 'bg-green-500 text-black border-2 border-black';
      default: return 'bg-white text-black border-2 border-black';
    }
  };

  const formatProgress = (progress: number, target: number, category: string) => {
    if (category === 'Finance') {
      return `$${progress.toLocaleString()} / $${target.toLocaleString()}`;
    }
    return `${progress} / ${target}`;
  };

  return (
    <div className="neo-card">
      <CardHeader>
        <CardTitle className="neo-text-big text-black flex items-center">
          <Target className="h-6 w-6 mr-2" style={{ color: 'hsl(var(--neon-green))' }} strokeWidth={3} />
          GOAL PROGRESS
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockGoals.map((goal) => {
          const progressPercentage = (goal.progress / goal.target) * 100;
          const daysUntilDeadline = Math.ceil(
            (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );

          return (
            <div key={goal.id} className="neo-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="neo-text-medium text-black">{goal.title}</h4>
                    <div className={`px-3 py-1 text-xs font-bold uppercase ${getPriorityColor(goal.priority)}`}>
                      {goal.priority}
                    </div>
                  </div>
                  <p className="neo-text-small text-black opacity-70 mb-4">{goal.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="neo-text-medium text-black">
                    {formatProgress(goal.progress, goal.target, goal.category)}
                  </span>
                  <span className="neo-text-medium text-black font-bold" style={{ color: 'hsl(var(--neon-green))' }}>
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                
                <div className="w-full bg-black h-4 border-2 border-black">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(progressPercentage, 100)}%`,
                      background: 'hsl(var(--neon-green))'
                    }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-black" strokeWidth={3} />
                    <span className="neo-text-small text-black">
                      {daysUntilDeadline > 0 ? `${daysUntilDeadline} DAYS LEFT` : 'OVERDUE'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-black" strokeWidth={3} />
                    <span className="neo-text-small text-black">{goal.category.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </div>
  );
}
