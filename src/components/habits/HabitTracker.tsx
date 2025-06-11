
import React, { useState } from 'react';
import { Check, Clock, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AddHabitModal } from './AddHabitModal';
import { MobileHabitCard } from './MobileHabitCard';
import { useIsMobile } from '@/hooks/use-mobile';

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

export function HabitTracker() {
  const [habits, setHabits] = useState(mockHabits);
  const isMobile = useIsMobile();

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'neo-card-green';
      case 'Medium': return 'neo-card-grey';
      case 'Hard': return 'neo-card-charcoal';
      default: return 'neo-card';
    }
  };

  return (
    <div className="neo-card">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="neo-text-big text-black">TODAY'S HABITS</h2>
          <AddHabitModal onAddHabit={addNewHabit} />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="neo-text-medium text-black">PROGRESS: {completedToday}/{totalHabits}</span>
            <span className="neo-text-medium" style={{ color: 'hsl(var(--neon-green))' }}>{Math.round(completionRate)}%</span>
          </div>
          <div className="w-full bg-black h-4 border-4 border-black">
            <div 
              className="h-full transition-all duration-300 border-r-4 border-black" 
              style={{ 
                width: `${completionRate}%`,
                background: 'hsl(var(--neon-green))'
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {isMobile ? (
          // Mobile layout - simplified cards
          habits.map((habit) => (
            <MobileHabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
            />
          ))
        ) : (
          // Desktop layout - neo-brutalist design
          habits.map((habit) => (
            <div
              key={habit.id}
              className={`flex items-center p-4 transition-all ${
                habit.completed 
                  ? 'neo-card-green' 
                  : 'neo-card hover:transform hover:translate-x-1 hover:translate-y-1'
              }`}
            >
              <Button
                onClick={() => toggleHabit(habit.id)}
                className={`mr-4 w-12 h-12 rounded-full border-4 border-black ${
                  habit.completed 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {habit.completed && <Check className="h-6 w-6" />}
              </Button>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`neo-text-medium ${habit.completed ? 'text-black' : 'text-black'}`}>
                    {habit.name}
                  </span>
                  <div className={`inline-block px-2 py-1 border-2 border-black ${getDifficultyColor(habit.difficulty)}`}>
                    <span className="text-xs font-bold text-black">{habit.difficulty}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-black">
                  <div className="flex items-center">
                    <Flame className="h-4 w-4 mr-1" style={{ color: '#FF6B35' }} />
                    <span className="font-bold">{habit.streak} DAYS</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="font-bold">{habit.category}</span>
                  </div>
                  <div className="font-bold" style={{ color: 'hsl(var(--neon-green))' }}>
                    +{habit.winsReward} WINS
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
