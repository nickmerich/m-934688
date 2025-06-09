
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export function ProgressTrends() {
  const trendsData = [
    { week: 'Week 1', habits: 65, goals: 40 },
    { week: 'Week 2', habits: 72, goals: 45 },
    { week: 'Week 3', habits: 68, goals: 52 },
    { week: 'Week 4', habits: 78, goals: 58 },
    { week: 'Week 5', habits: 85, goals: 65 },
    { week: 'Week 6', habits: 82, goals: 72 },
    { week: 'Week 7', habits: 87, goals: 75 },
    { week: 'Week 8', habits: 89, goals: 78 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neo-card bg-white p-3">
          <p className="neo-text-medium text-black mb-1">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm text-black">
              {item.name}: {item.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="neo-text-medium text-black">PROGRESS TRENDS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendsData}>
              <XAxis 
                dataKey="week" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#000000', fontSize: 12, fontWeight: 'bold' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#000000', fontSize: 12, fontWeight: 'bold' }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => <span className="neo-text-medium text-black">{value}</span>}
              />
              <Line 
                type="monotone" 
                dataKey="habits" 
                stroke="hsl(var(--neon-green))" 
                strokeWidth={4}
                name="Habits Completion"
                dot={{ fill: 'hsl(var(--neon-green))', strokeWidth: 3, r: 6, stroke: '#000000' }}
              />
              <Line 
                type="monotone" 
                dataKey="goals" 
                stroke="hsl(var(--hot-pink))" 
                strokeWidth={4}
                name="Goals Progress"
                dot={{ fill: 'hsl(var(--hot-pink))', strokeWidth: 3, r: 6, stroke: '#000000' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between">
          <span className="neo-text-medium text-black">8-WEEK TREND</span>
          <span className="neo-text-medium text-green-600">↑ 24% IMPROVEMENT</span>
        </div>
      </CardContent>
    </>
  );
}
