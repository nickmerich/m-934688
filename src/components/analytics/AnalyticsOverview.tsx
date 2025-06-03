
import React from 'react';
import { TrendingUp, TrendingDown, Calendar, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AnalyticsOverview() {
  const stats = [
    {
      title: "Overall Progress",
      value: "87%",
      change: "+12%",
      trend: "up",
      description: "vs last month",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-green-400"
    },
    {
      title: "Habit Consistency",
      value: "73%",
      change: "+8%",
      trend: "up", 
      description: "completion rate",
      icon: <Calendar className="h-5 w-5" />,
      color: "text-blue-400"
    },
    {
      title: "Goals Achieved",
      value: "15",
      change: "+3",
      trend: "up",
      description: "this quarter",
      icon: <Target className="h-5 w-5" />,
      color: "text-purple-400"
    },
    {
      title: "Streak Average",
      value: "12 days",
      change: "-2 days",
      trend: "down",
      description: "across all habits",
      icon: <TrendingDown className="h-5 w-5" />,
      color: "text-orange-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center justify-between">
              <div className="flex items-center">
                <span className={stat.color}>{stat.icon}</span>
                <span className="ml-2">{stat.title}</span>
              </div>
              <span className={`text-xs ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
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
