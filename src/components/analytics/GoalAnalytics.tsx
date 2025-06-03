
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function GoalAnalytics() {
  const goalProgressData = [
    { category: 'Health', completed: 8, total: 10 },
    { category: 'Career', completed: 5, total: 8 },
    { category: 'Learning', completed: 12, total: 15 },
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
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-lg">
          <p className="text-white text-sm">{`${label}: ${payload[0].value}/${payload[0].payload.total} goals`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Goal Analytics</CardTitle>
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
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="completed" 
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Active Goals Progress */}
        <div>
          <h4 className="text-white font-medium mb-3">Active Goals Progress</h4>
          <div className="space-y-3">
            {recentGoals.map((goal, index) => (
              <div key={index} className="p-3 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-sm font-medium">{goal.name}</span>
                  <span className="text-gray-400 text-xs">{goal.daysLeft} days left</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="text-purple-400 text-xs mt-1">{goal.progress}% complete</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
