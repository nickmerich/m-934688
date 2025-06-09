
import React, { useState } from 'react';
import { Plus, Filter, ArrowUpDown } from 'lucide-react';
import { MobileOptimizedCard, MobileCardHeader, MobileCardContent } from '@/components/mobile/MobileOptimizedCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AddHabitModal } from './AddHabitModal';
import { MobileHabitCard } from './MobileHabitCard';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';

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
  const { triggerHaptic } = useHapticFeedback();

  const toggleHabit = (habitId: string) => {
    triggerHaptic('medium');
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
    triggerHaptic('light');
  };

  const handleFilterChange = (newFilter: string) => {
    triggerHaptic('selection');
    setFilter(newFilter);
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  const filteredHabits = filter === 'all' 
    ? habits 
    : filter === 'completed'
    ? habits.filter(h => h.completed)
    : habits.filter(h => !h.completed);

  return (
    <MobileOptimizedCard className={`mobile-card-comfortable ${className}`} animated={false}>
      <MobileCardHeader>
        <div className="mobile-flex-between mb-3">
          <h2 className="mobile-text-lg font-semibold text-white">Today's Habits</h2>
          <AddHabitModal onAddHabit={addNewHabit} />
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="mobile-flex-between mobile-text-sm">
            <span className="text-gray-400">Progress: {completedToday}/{totalHabits}</span>
            <span className="text-green-400 font-medium">{Math.round(completionRate)}%</span>
          </div>
          <Progress value={completionRate} className="h-2 bg-gray-800" />
        </div>

        {/* Mobile Filters */}
        <div className="flex space-x-2 mt-3">
          {['all', 'pending', 'completed'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange(filterType)}
              className={`mobile-button mobile-text-xs px-3 h-8 capitalize ${
                filter === filterType 
                  ? 'bg-green-500 hover:bg-green-600 text-white border-green-500' 
                  : 'border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent'
              }`}
            >
              {filterType}
            </Button>
          ))}
        </div>
      </MobileCardHeader>
      
      <MobileCardContent className="space-y-3">
        <div className="mobile-scroll max-h-96 space-y-3">
          {filteredHabits.map((habit) => (
            <MobileHabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
            />
          ))}
        </div>
        
        {filteredHabits.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <div className="mobile-text-sm">No habits found</div>
            <div className="mobile-text-xs mt-1">Try adjusting your filter</div>
          </div>
        )}
      </MobileCardContent>
    </MobileOptimizedCard>
  );
}
