
import React, { useState } from 'react';
import { Plus, Filter, ArrowUpDown, Check, Flame, Clock } from 'lucide-react';
import { MobileOptimizedCard, MobileCardHeader, MobileCardContent } from '@/components/mobile/MobileOptimizedCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AddHabitModal } from './AddHabitModal';
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

interface MobileHabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
}

function MobileHabitCard({ habit, onToggle }: MobileHabitCardProps) {
  const { triggerHaptic } = useHapticFeedback();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleToggle = () => {
    triggerHaptic('medium');
    onToggle(habit.id);
  };

  return (
    <div className={`p-4 border-2 border-black rounded-lg transition-all duration-200 active:scale-95 ${
      habit.completed 
        ? 'bg-green-50 border-green-500' 
        : 'bg-white hover:bg-gray-50'
    }`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={handleToggle}
          className={`mt-1 rounded-full flex-shrink-0 transition-all duration-200 h-10 w-10 border-2 flex items-center justify-center touch-manipulation ${
            habit.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-500 bg-white'
          }`}
        >
          {habit.completed && <Check className="h-5 w-5" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`font-bold text-base leading-5 transition-colors duration-200 ${
              habit.completed ? 'text-green-700' : 'text-black'
            }`}>
              {habit.name}
            </h3>
            <span className={`${getDifficultyColor(habit.difficulty)} text-xs px-2 py-1 rounded border ml-2 flex-shrink-0 font-bold`}>
              {habit.difficulty}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Flame className="h-4 w-4 mr-1 text-orange-500" />
                <span className="font-bold">{habit.streak}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{habit.category}</span>
              </div>
            </div>
            <div className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded border border-green-200">
              +{habit.winsReward}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <MobileCardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-black">Today's Habits</h2>
          <AddHabitModal onAddHabit={addNewHabit} />
        </div>
        
        {/* Mobile Filters - Better spacing */}
        <div className="flex space-x-2 mb-4">
          {['all', 'pending', 'completed'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange(filterType)}
              className={`text-xs px-3 h-8 capitalize border-2 border-black font-bold transition-all ${
                filter === filterType 
                  ? 'bg-green-500 hover:bg-green-600 text-black border-green-500' 
                  : 'border-black text-black hover:bg-gray-100 bg-white'
              }`}
            >
              {filterType}
            </Button>
          ))}
        </div>
      </MobileCardHeader>
      
      <MobileCardContent className="p-4 pt-0">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredHabits.map((habit) => (
            <MobileHabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
            />
          ))}
        </div>
        
        {filteredHabits.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-sm">No habits found</div>
            <div className="text-xs mt-1">Try adjusting your filter</div>
          </div>
        )}
      </MobileCardContent>
    </MobileOptimizedCard>
  );
}
