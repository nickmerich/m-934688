
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HabitHeatmap() {
  // Generate mock heatmap data for the last 12 weeks
  const weeks = Array.from({ length: 12 }, (_, weekIndex) => {
    return Array.from({ length: 7 }, (_, dayIndex) => ({
      week: weekIndex,
      day: dayIndex,
      completion: Math.floor(Math.random() * 5), // 0-4 habits completed
      date: new Date(Date.now() - (11 - weekIndex) * 7 * 24 * 60 * 60 * 1000 + dayIndex * 24 * 60 * 60 * 1000)
    }));
  }).flat();

  const getIntensityColor = (completion: number) => {
    const colors = [
      'bg-gray-200', // 0 habits
      'bg-green-200', // 1 habit
      'bg-green-400', // 2 habits
      'bg-green-600', // 3 habits
      'bg-green-800'  // 4+ habits
    ];
    return colors[Math.min(completion, 4)];
  };

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Card className="neo-card h-full">
      <CardHeader>
        <CardTitle className="neo-text-medium text-black">HABIT HEATMAP</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Day labels */}
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            {dayLabels.map((day, index) => (
              <span key={index} className="w-6 text-center">{day}</span>
            ))}
          </div>
          
          {/* Heatmap grid */}
          <div className="grid grid-cols-7 gap-1">
            {weeks.slice(0, 84).map((day, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded border-2 border-black cursor-pointer transition-all hover:scale-110 ${getIntensityColor(day.completion)}`}
                title={`${day.date.toLocaleDateString()}: ${day.completion} habits completed`}
              />
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-gray-600 mt-4">
            <span>Less</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded border border-black ${getIntensityColor(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
