
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
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatProgress = (progress: number, target: number, category: string) => {
    if (category === 'Finance') {
      return `$${progress.toLocaleString()} / $${target.toLocaleString()}`;
    }
    return `${progress} / ${target}`;
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Target className="h-5 w-5 mr-2 text-green-500" />
          Goal Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockGoals.map((goal) => {
          const progressPercentage = (goal.progress / goal.target) * 100;
          const daysUntilDeadline = Math.ceil(
            (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );

          return (
            <div key={goal.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-white">{goal.title}</h4>
                    <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                      {goal.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{goal.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    {formatProgress(goal.progress, goal.target, goal.category)}
                  </span>
                  <span className="text-green-400 font-medium">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Overdue'}
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {goal.category}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
