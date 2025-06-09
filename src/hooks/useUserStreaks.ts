
import { useMemo } from 'react';

export interface HabitStreak {
  name: string;
  currentStreak: number;
  isActive: boolean;
}

// Mock data - in a real app this would come from your database
const mockHabits: HabitStreak[] = [
  { name: 'Morning Meditation', currentStreak: 21, isActive: true },
  { name: 'Workout Session', currentStreak: 14, isActive: true },
  { name: 'Read 30 Minutes', currentStreak: 12, isActive: true },
  { name: 'Journal Writing', currentStreak: 9, isActive: true },
  { name: 'Drink Water', currentStreak: 7, isActive: true }
];

export const useUserStreaks = () => {
  const habits = useMemo(() => mockHabits, []);
  
  const highestStreak = useMemo(() => {
    return Math.max(...habits.map(habit => habit.currentStreak), 0);
  }, [habits]);
  
  const activeStreaks = useMemo(() => {
    return habits.filter(habit => habit.isActive && habit.currentStreak >= 3);
  }, [habits]);
  
  const canShare = highestStreak >= 3;
  
  const totalCompletedHabits = useMemo(() => {
    return habits.reduce((total, habit) => total + habit.currentStreak, 0);
  }, [habits]);
  
  return {
    habits,
    highestStreak,
    activeStreaks,
    canShare,
    totalCompletedHabits
  };
};
