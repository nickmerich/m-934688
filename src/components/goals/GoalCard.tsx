
import React from 'react';
import { Target, Calendar, TrendingUp, Edit3, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

interface GoalCardProps {
  goal: Goal;
  onEdit?: (goal: Goal) => void;
  onDelete?: (goalId: string) => void;
  onUpdateProgress?: (goalId: string, newProgress: number) => void;
}

export function GoalCard({ goal, onEdit, onDelete, onUpdateProgress }: GoalCardProps) {
  const progressPercentage = (goal.progress / goal.target) * 100;
  const daysUntilDeadline = Math.ceil(
    (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatProgress = (progress: number, target: number, unit: string) => {
    if (unit === 'dollars') {
      return `$${progress.toLocaleString()} / $${target.toLocaleString()}`;
    }
    return `${progress} / ${target} ${unit}`;
  };

  const getDeadlineColor = () => {
    if (daysUntilDeadline < 0) return 'text-red-400';
    if (daysUntilDeadline <= 7) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getProgressColor = () => {
    if (progressPercentage >= 100) return 'bg-green-500';
    if (progressPercentage >= 75) return 'bg-blue-500';
    if (progressPercentage >= 50) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-white text-lg">{goal.title}</h3>
              <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                {goal.priority}
              </Badge>
            </div>
            {goal.description && (
              <p className="text-sm text-gray-400 mb-3">{goal.description}</p>
            )}
          </div>
          <div className="flex space-x-1 ml-4">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(goal)}
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(goal.id)}
                className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-gray-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              {formatProgress(goal.progress, goal.target, goal.unit)}
            </span>
            <span className="text-green-400 font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span className={getDeadlineColor()}>
                {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Overdue'}
              </span>
            </div>
            <div className="flex items-center text-gray-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              {goal.category}
            </div>
          </div>
        </div>

        {onUpdateProgress && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Quick update:</span>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateProgress(goal.id, Math.max(0, goal.progress - 1))}
                  className="h-7 px-2 text-xs border-gray-600 hover:bg-gray-700"
                >
                  -1
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateProgress(goal.id, goal.progress + 1)}
                  className="h-7 px-2 text-xs border-gray-600 hover:bg-gray-700"
                >
                  +1
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateProgress(goal.id, goal.progress + 5)}
                  className="h-7 px-2 text-xs border-gray-600 hover:bg-gray-700"
                >
                  +5
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
