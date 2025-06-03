
import React from 'react';
import { Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StreakCounterProps {
  currentStreak: number;
}

export function StreakCounter({ currentStreak }: StreakCounterProps) {
  return (
    <Card className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-orange-500/20 border-orange-500/30 shadow-glow-orange animate-scale-in">
      <CardContent className="p-4 flex items-center space-x-3">
        <div className="relative floating">
          <Flame className="h-8 w-8 text-orange-500 animate-glow" />
          {currentStreak > 0 && (
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-scale-in">
              {currentStreak}
            </div>
          )}
        </div>
        <div>
          <div className="text-sm font-medium text-white/90">Current Streak</div>
          <div className="text-2xl font-bold streak-glow">{currentStreak} days</div>
        </div>
      </CardContent>
    </Card>
  );
}
