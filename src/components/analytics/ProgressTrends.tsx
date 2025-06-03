
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
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white text-sm font-medium mb-1">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {item.name}: {item.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Progress Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendsData}>
              <XAxis 
                dataKey="week" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => <span className="text-gray-300">{value}</span>}
              />
              <Line 
                type="monotone" 
                dataKey="habits" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Habits Completion"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="goals" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                name="Goals Progress"
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <span>8-week trend analysis</span>
          <span className="text-green-400">↑ 24% improvement overall</span>
        </div>
      </CardContent>
    </Card>
  );
}
