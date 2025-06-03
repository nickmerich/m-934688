
import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function HabitStreaks() {
  const streaks = [
    { name: 'Morning Meditation', streak: 21, isRecord: true },
    { name: 'Workout Session', streak: 14, isRecord: false },
    { name: 'Read 30 Minutes', streak: 12, isRecord: false },
    { name: 'Journal Writing', streak: 9, isRecord: false },
    { name: 'Drink Water', streak: 7, isRecord: false }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Flame className="h-5 w-5 text-orange-400 mr-2" />
          Current Streaks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {streaks.map((habit, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium">{habit.name}</span>
                {habit.isRecord && (
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    <Trophy className="h-3 w-3 mr-1" />
                    Record
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center text-orange-400 font-bold">
              <Flame className="h-4 w-4 mr-1" />
              {habit.streak}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
