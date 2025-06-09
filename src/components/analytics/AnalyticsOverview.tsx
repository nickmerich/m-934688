
import React from 'react';
import { TrendingUp, TrendingDown, Calendar, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AnalyticsOverview() {
  const stats = [
    {
      title: "OVERALL PROGRESS",
      value: "87%",
      change: "+12%",
      trend: "up",
      description: "vs last month",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "neo-card-green"
    },
    {
      title: "HABIT CONSISTENCY",
      value: "73%",
      change: "+8%",
      trend: "up", 
      description: "completion rate",
      icon: <Calendar className="h-5 w-5" />,
      color: "neo-card-pink"
    },
    {
      title: "GOALS ACHIEVED",
      value: "15",
      change: "+3",
      trend: "up",
      description: "this quarter",
      icon: <Target className="h-5 w-5" />,
      color: "neo-card"
    },
    {
      title: "STREAK AVERAGE",
      value: "12 DAYS",
      change: "-2 days",
      trend: "down",
      description: "across all habits",
      icon: <TrendingDown className="h-5 w-5" />,
      color: "neo-card-charcoal"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.color} cursor-pointer hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform`}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-black border-4 border-black">
                <span className="text-white">{stat.icon}</span>
              </div>
            </div>
            <div className="neo-text-medium text-black mb-2">{stat.title}</div>
            <div className="text-3xl font-black text-black mb-2">{stat.value}</div>
            <div className="flex items-center justify-center space-x-2">
              <span className={`neo-text-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-black">{stat.description}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
