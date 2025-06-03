
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function WeeklyHabitChart() {
  const weeklyData = [
    { day: 'Mon', completed: 4, total: 5 },
    { day: 'Tue', completed: 5, total: 5 },
    { day: 'Wed', completed: 3, total: 5 },
    { day: 'Thu', completed: 4, total: 5 },
    { day: 'Fri', completed: 5, total: 5 },
    { day: 'Sat', completed: 2, total: 5 },
    { day: 'Sun', completed: 3, total: 5 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-lg">
          <p className="text-white text-sm">{`${label}: ${payload[0].value}/${payload[0].payload.total} habits`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">This Week's Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                domain={[0, 5]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="completed" 
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <span>Weekly average: 3.7/5 habits</span>
          <span className="text-green-400">74% completion rate</span>
        </div>
      </CardContent>
    </Card>
  );
}
