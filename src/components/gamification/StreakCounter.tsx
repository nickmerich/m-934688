
import React from 'react';
import { Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StreakCounterProps {
  currentStreak: number;
}

export function StreakCounter({ currentStreak }: StreakCounterProps) {
  return (
    <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30">
      <CardContent className="p-4 flex items-center space-x-3">
        <div className="relative">
          <Flame className="h-8 w-8 text-orange-500" />
          {currentStreak > 0 && (
            <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {currentStreak}
            </div>
          )}
        </div>
        <div>
          <div className="text-sm font-medium text-white">Current Streak</div>
          <div className="text-2xl font-bold text-orange-500">{currentStreak} days</div>
        </div>
      </CardContent>
    </Card>
  );
}
