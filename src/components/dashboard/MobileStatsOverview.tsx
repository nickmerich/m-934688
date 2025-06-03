
import React from 'react';
import { Target, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatItemProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: number;
}

function MobileStatCard({ title, value, description, icon, trend }: StatItemProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
              {icon}
            </div>
            <div>
              <div className="text-lg font-bold text-white">{value}</div>
              <div className="text-xs text-gray-400">{title}</div>
            </div>
          </div>
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${
            trend > 0 
              ? 'text-green-400 bg-green-500/10' 
              : 'text-red-400 bg-red-500/10'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MobileStatsOverview() {
  const stats = [
    {
      title: "Active Habits",
      value: "8",
      description: "habits tracked",
      icon: <Calendar className="h-4 w-4" />,
      trend: 12.5
    },
    {
      title: "Goals in Progress",
      value: "3",
      description: "active goals",
      icon: <Target className="h-4 w-4" />,
      trend: 25.0
    },
    {
      title: "Completion Rate",
      value: "87%",
      description: "this week",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: 5.2
    },
    {
      title: "Total Wins",
      value: "2,450",
      description: "lifetime points",
      icon: <Trophy className="h-4 w-4" />,
      trend: 15.8
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <MobileStatCard key={index} {...stat} />
      ))}
    </div>
  );
}
