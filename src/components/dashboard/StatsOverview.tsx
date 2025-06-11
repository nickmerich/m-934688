
import React from 'react';
import { Target, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/ui/StatsCard';

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="neo-card text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-4">
          <Calendar className="h-8 w-8 text-white" />
        </div>
        <div className="neo-text-big text-black mb-2">ACTIVE HABITS</div>
        <div className="text-4xl font-black text-black mb-2">8</div>
        <div className="neo-text-medium text-black">habits tracked</div>
        <div className="text-sm" style={{ color: 'hsl(var(--neon-green))' }}>+12.5% THIS WEEK</div>
      </div>

      <div className="neo-card-green text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-4">
          <Target className="h-8 w-8 text-white" />
        </div>
        <div className="neo-text-big text-black mb-2">GOALS PROGRESS</div>
        <div className="text-4xl font-black text-black mb-2">3</div>
        <div className="neo-text-medium text-black">active goals</div>
        <div className="text-sm text-black">+25.0% THIS WEEK</div>
      </div>

      <div className="neo-card text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-4">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <div className="neo-text-big text-black mb-2">COMPLETION RATE</div>
        <div className="text-4xl font-black text-black mb-2">87%</div>
        <div className="neo-text-medium text-black">this week</div>
        <div className="text-sm" style={{ color: 'hsl(var(--neon-green))' }}>+5.2% THIS WEEK</div>
      </div>

      <div className="neo-card-grey text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-4">
          <Trophy className="h-8 w-8 text-white" />
        </div>
        <div className="neo-text-big text-white mb-2">TOTAL WINS</div>
        <div className="text-4xl font-black text-white mb-2">2,450</div>
        <div className="neo-text-medium text-white">lifetime points</div>
        <div className="text-sm text-white">+15.8% THIS WEEK</div>
      </div>
    </div>
  );
}
