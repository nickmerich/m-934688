
import React, { useState } from 'react';
import { Plus, Filter, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AddHabitModal } from './AddHabitModal';
import { MobileHabitCard } from './MobileHabitCard';

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  winsReward: number;
  description?: string;
}

const mockHabits: Habit[] = [
  { id: '1', name: 'Morning Meditation', streak: 7, completed: true, category: 'Mindfulness', difficulty: 'Easy', winsReward: 10 },
  { id: '2', name: 'Workout Session', streak: 5, completed: false, category: 'Fitness', difficulty: 'Hard', winsReward: 30 },
  { id: '3', name: 'Read 30 Minutes', streak: 12, completed: true, category: 'Learning', difficulty: 'Medium', winsReward: 20 },
  { id: '4', name: 'Drink 8 Glasses of Water', streak: 3, completed: false, category: 'Health', difficulty: 'Easy', winsReward: 15 },
  { id: '5', name: 'Journal Writing', streak: 9, completed: true, category: 'Reflection', difficulty: 'Medium', winsReward: 25 },
];

interface MobileHabitTrackerProps {
  className?: string;
}

export function MobileHabitTracker({ className }: MobileHabitTrackerProps) {
  const [habits, setHabits] = useState(mockHabits);
  const [filter, setFilter] = useState<string>('all');

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: !habit.completed }
        : habit
    ));
  };

  const addNewHabit = (newHabitData: {
    name: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description?: string;
  }) => {
    const winsReward = newHabitData.difficulty === 'Easy' ? 10 : 
                      newHabitData.difficulty === 'Medium' ? 20 : 30;

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitData.name,
      streak: 0,
      completed: false,
      category: newHabitData.category,
      difficulty: newHabitData.difficulty,
      winsReward,
      description: newHabitData.description
    };

    setHabits([...habits, newHabit]);
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = (completedToday / totalHabits) * 100;

  const filteredHabits = filter === 'all' 
    ? habits 
    : filter === 'completed'
    ? habits.filter(h => h.completed)
    : habits.filter(h => !h.completed);

  return (
    <Card className={`bg-gray-900 border-gray-800 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <CardTitle className="text-lg text-white">Today's Habits</CardTitle>
          <AddHabitModal onAddHabit={addNewHabit} />
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Progress: {completedToday}/{totalHabits}</span>
            <span className="text-green-400 font-medium">{Math.round(completionRate)}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        {/* Mobile Filters */}
        <div className="flex space-x-2 mt-3">
          {['all', 'pending', 'completed'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType)}
              className={`text-xs px-3 h-8 capitalize ${
                filter === filterType 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'border-gray-600 text-gray-300 hover:bg-gray-800'
              }`}
            >
              {filterType}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 px-4">
        {filteredHabits.map((habit) => (
          <MobileHabitCard
            key={habit.id}
            habit={habit}
            onToggle={toggleHabit}
          />
        ))}
        {filteredHabits.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <div className="text-sm">No habits found</div>
            <div className="text-xs mt-1">Try adjusting your filter</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
