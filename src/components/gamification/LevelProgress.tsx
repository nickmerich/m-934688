
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
    <Card className="bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 border-green-500/30 shadow-glow animate-scale-in">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Trophy className="h-6 w-6 text-green-500 animate-glow floating" />
          <div>
            <div className="text-sm font-medium text-white/90 flex items-center space-x-2">
              <span>Level {currentLevel}</span>
              <span className="level-badge text-xs">{getLevelTitle(currentLevel)}</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-gray-400">
            <span className="xp-glow">{currentWins} Wins</span>
            <span className="text-white/70">{nextLevelWins} Wins</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
