
import React from 'react';
import { Target, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/ui/StatsCard';

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Active Habits"
        value="8"
        description="habits tracked"
        icon={<Calendar />}
        trend={12.5}
        className="bg-gray-900 border-gray-800"
      />
      <StatsCard
        title="Goals in Progress"
        value="3"
        description="active goals"
        icon={<Target />}
        trend={25.0}
        className="bg-gray-900 border-gray-800"
      />
      <StatsCard
        title="Completion Rate"
        value="87%"
        description="this week"
        icon={<TrendingUp />}
        trend={5.2}
        className="bg-gray-900 border-gray-800"
      />
      <StatsCard
        title="Total XP"
        value="2,450"
        description="lifetime points"
        icon={<Trophy />}
        trend={15.8}
        className="bg-gray-900 border-gray-800"
      />
    </div>
  );
}
