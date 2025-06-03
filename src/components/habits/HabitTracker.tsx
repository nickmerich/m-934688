
import React, { useState } from 'react';
import { Check, Plus, Clock, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
}

const mockHabits: Habit[] = [
  { id: '1', name: 'Morning Meditation', streak: 7, completed: true, category: 'Mindfulness', difficulty: 'Easy', xpReward: 10 },
  { id: '2', name: 'Workout Session', streak: 5, completed: false, category: 'Fitness', difficulty: 'Hard', xpReward: 30 },
  { id: '3', name: 'Read 30 Minutes', streak: 12, completed: true, category: 'Learning', difficulty: 'Medium', xpReward: 20 },
  { id: '4', name: 'Drink 8 Glasses of Water', streak: 3, completed: false, category: 'Health', difficulty: 'Easy', xpReward: 15 },
  { id: '5', name: 'Journal Writing', streak: 9, completed: true, category: 'Reflection', difficulty: 'Medium', xpReward: 25 },
];

export function HabitTracker() {
  const [habits, setHabits] = useState(mockHabits);

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: !habit.completed }
        : habit
    ));
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = (completedToday / totalHabits) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Today's Habits</CardTitle>
          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Habit
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Progress: {completedToday}/{totalHabits}</span>
            <span className="text-green-400 font-medium">{Math.round(completionRate)}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={`flex items-center p-4 rounded-lg border transition-all ${
              habit.completed 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-gray-800 border-gray-700 hover:border-gray-600'
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleHabit(habit.id)}
              className={`mr-3 rounded-full ${
                habit.completed 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'border-2 border-gray-600 hover:border-green-500'
              }`}
            >
              {habit.completed && <Check className="h-4 w-4" />}
            </Button>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`font-medium ${habit.completed ? 'text-green-400' : 'text-white'}`}>
                  {habit.name}
                </span>
                <Badge variant="outline" className={getDifficultyColor(habit.difficulty)}>
                  {habit.difficulty}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Flame className="h-3 w-3 mr-1 text-orange-500" />
                  {habit.streak} days
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {habit.category}
                </div>
                <div className="text-green-400 font-medium">
                  +{habit.xpReward} XP
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
