
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

export function StreakVisualization() {
  const streakData = [
    { day: 1, streak: 1, habit: 'Meditation' },
    { day: 2, streak: 2, habit: 'Meditation' },
    { day: 3, streak: 3, habit: 'Meditation' },
    { day: 4, streak: 4, habit: 'Meditation' },
    { day: 5, streak: 5, habit: 'Meditation' },
    { day: 6, streak: 0, habit: 'Meditation' }, // Broke streak
    { day: 7, streak: 1, habit: 'Meditation' },
    { day: 8, streak: 2, habit: 'Meditation' },
    { day: 9, streak: 3, habit: 'Meditation' },
    { day: 10, streak: 4, habit: 'Meditation' },
    { day: 11, streak: 5, habit: 'Meditation' },
    { day: 12, streak: 6, habit: 'Meditation' },
    { day: 13, streak: 7, habit: 'Meditation' },
    { day: 14, streak: 8, habit: 'Meditation' },
    { day: 15, streak: 9, habit: 'Meditation' },
    { day: 16, streak: 10, habit: 'Meditation' },
    { day: 17, streak: 11, habit: 'Meditation' },
    { day: 18, streak: 12, habit: 'Meditation' },
    { day: 19, streak: 13, habit: 'Meditation' },
    { day: 20, streak: 14, habit: 'Meditation' },
    { day: 21, streak: 15, habit: 'Meditation' },
    { day: 22, streak: 16, habit: 'Meditation' },
    { day: 23, streak: 17, habit: 'Meditation' },
    { day: 24, streak: 18, habit: 'Meditation' },
    { day: 25, streak: 19, habit: 'Meditation' },
    { day: 26, streak: 20, habit: 'Meditation' },
    { day: 27, streak: 21, habit: 'Meditation' },
    { day: 28, streak: 22, habit: 'Meditation' },
    { day: 29, streak: 23, habit: 'Meditation' },
    { day: 30, streak: 24, habit: 'Meditation' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neo-card bg-white p-3">
          <p className="neo-text-medium text-black mb-1">Day {label}</p>
          <p className="text-sm text-black">Streak: {payload[0].value} days</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="neo-card h-full">
      <CardHeader>
        <CardTitle className="neo-text-medium text-black">STREAK TRACKER</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={streakData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#000000', fontSize: 10, fontWeight: 'bold' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#000000', fontSize: 10, fontWeight: 'bold' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="streak" 
                stroke="hsl(var(--hot-pink))"
                strokeWidth={3}
                fill="hsl(var(--hot-pink))"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="neo-text-medium text-black">CURRENT</div>
            <div className="text-2xl font-black text-black">24 DAYS</div>
          </div>
          <div className="text-center">
            <div className="neo-text-medium text-black">BEST</div>
            <div className="text-2xl font-black text-black">24 DAYS</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
