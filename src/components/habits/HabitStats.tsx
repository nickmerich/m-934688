
import React from 'react';
import { Calendar, Target, Flame, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HabitStats() {
  const stats = [
    {
      title: "Today's Progress",
      value: "3/5",
      description: "habits completed",
      icon: <Target className="h-5 w-5" />,
      color: "text-green-400"
    },
    {
      title: "Current Streak",
      value: "7",
      description: "days in a row",
      icon: <Flame className="h-5 w-5" />,
      color: "text-orange-400"
    },
    {
      title: "This Week",
      value: "87%",
      description: "completion rate",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-blue-400"
    },
    {
      title: "Active Habits",
      value: "8",
      description: "being tracked",
      icon: <Calendar className="h-5 w-5" />,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <span className={stat.color}>{stat.icon}</span>
              <span className="ml-2">{stat.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <p className="text-xs text-gray-500">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
