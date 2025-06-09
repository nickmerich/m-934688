
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, Calendar, Flame } from 'lucide-react';
import { useUserStreaks } from '@/hooks/useUserStreaks';

export function UserStats() {
  const { highestStreak, activeStreaks, totalCompletedHabits } = useUserStreaks();

  const stats = [
    {
      title: "LONGEST STREAK",
      value: `${highestStreak} DAYS`,
      icon: <Flame className="h-6 w-6" />,
      color: "neo-card-pink"
    },
    {
      title: "ACTIVE HABITS",
      value: activeStreaks.length.toString(),
      icon: <Calendar className="h-6 w-6" />,
      color: "neo-card-green"
    },
    {
      title: "TOTAL COMPLETIONS",
      value: totalCompletedHabits.toString(),
      icon: <Trophy className="h-6 w-6" />,
      color: "neo-card"
    },
    {
      title: "GOALS ACHIEVED",
      value: "8",
      icon: <Target className="h-6 w-6" />,
      color: "neo-card-charcoal"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.color} cursor-pointer hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform`}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black">
                <span className="text-white">{stat.icon}</span>
              </div>
            </div>
            <div className="neo-text-medium text-black mb-2">{stat.title}</div>
            <div className="text-3xl font-black text-black">{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
