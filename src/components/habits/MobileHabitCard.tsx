
import React from 'react';
import { Check, Flame, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  winsReward: number;
}

interface MobileHabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
}

export function MobileHabitCard({ habit, onToggle }: MobileHabitCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className={`transition-all duration-300 animate-slide-up-fade ${
      habit.completed 
        ? 'bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/30 shadow-glow' 
        : 'glass-card hover:border-gray-600/50'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(habit.id)}
            className={`mt-1 rounded-full flex-shrink-0 transition-all duration-300 ${
              habit.completed 
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-glow animate-scale-in' 
                : 'border-2 border-gray-600 hover:border-green-500 hover:bg-green-500/10'
            }`}
          >
            {habit.completed && <Check className="h-4 w-4" />}
          </Button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className={`font-medium text-sm leading-5 transition-colors duration-300 ${
                habit.completed ? 'text-green-400 animate-glow' : 'text-white'
              }`}>
                {habit.name}
              </h3>
              <Badge 
                variant="outline" 
                className={`${getDifficultyColor(habit.difficulty)} text-xs ml-2 flex-shrink-0 backdrop-blur-sm`}
              >
                {habit.difficulty}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center space-x-3">
                <div className="flex items-center group">
                  <Flame className="h-3 w-3 mr-1 text-orange-500 group-hover:animate-glow transition-all duration-300" />
                  <span className="streak-glow">{habit.streak}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {habit.category}
                </div>
              </div>
              <div className="text-green-400 font-medium bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                +{habit.winsReward}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
