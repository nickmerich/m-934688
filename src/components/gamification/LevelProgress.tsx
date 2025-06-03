
import React from 'react';
import { Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface LevelProgressProps {
  currentLevel: number;
  currentWins: number;
  nextLevelWins: number;
}

export function LevelProgress({ currentLevel, currentWins, nextLevelWins }: LevelProgressProps) {
  const progressPercentage = (currentWins / nextLevelWins) * 100;

  const getLevelTitle = (level: number) => {
    if (level < 5) return 'Novice';
    if (level < 10) return 'Warrior';
    if (level < 15) return 'Champion';
    if (level < 20) return 'Master';
    return 'Legend';
  };

  return (
    <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Trophy className="h-6 w-6 text-green-500" />
          <div>
            <div className="text-sm font-medium text-white">Level {currentLevel}</div>
            <div className="text-xs text-gray-400">{getLevelTitle(currentLevel)}</div>
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{currentWins} Wins</span>
            <span>{nextLevelWins} Wins</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
