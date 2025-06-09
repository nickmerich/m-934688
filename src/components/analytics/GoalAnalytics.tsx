
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function GoalAnalytics() {
  const goalProgressData = [
    { category: 'Health', completed: 8, total: 10 },
    { category: 'Career', completed: 5, total: 8 },
    { category: 'Education', completed: 12, total: 15 },
    { category: 'Personal', completed: 6, total: 9 },
    { category: 'Finance', completed: 3, total: 5 }
  ];

  const recentGoals = [
    { name: 'Complete React Course', progress: 85, daysLeft: 5 },
    { name: 'Run Marathon Training', progress: 60, daysLeft: 45 },
    { name: 'Save $5000', progress: 78, daysLeft: 30 },
    { name: 'Read 24 Books', progress: 45, daysLeft: 90 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neo-card bg-white p-3">
          <p className="neo-text-medium text-black">{`${label}: ${payload[0].value}/${payload[0].payload.total} goals`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="neo-text-medium text-black">GOAL ANALYTICS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Goals by Category Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={goalProgressData}>
              <XAxis 
                dataKey="category" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#000000', fontSize: 12, fontWeight: 'bold' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#000000', fontSize: 12, fontWeight: 'bold' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="completed" 
                fill="hsl(var(--hot-pink))"
                stroke="#000000"
                strokeWidth={2}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Active Goals Progress */}
        <div>
          <h4 className="neo-text-medium text-black mb-3">ACTIVE GOALS</h4>
          <div className="space-y-3">
            {recentGoals.map((goal, index) => (
              <div key={index} className="p-3 neo-card-pink">
                <div className="flex justify-between items-center mb-2">
                  <span className="neo-text-medium text-black text-sm">{goal.name}</span>
                  <span className="text-black text-xs">{goal.daysLeft} DAYS LEFT</span>
                </div>
                <div className="w-full bg-black h-3 border-2 border-black">
                  <div 
                    className="bg-white h-full transition-all duration-300 border-r-2 border-black" 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="neo-text-medium text-black text-xs mt-1">{goal.progress}% COMPLETE</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </>
  );
}
