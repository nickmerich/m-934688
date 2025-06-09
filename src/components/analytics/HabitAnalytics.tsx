import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function HabitAnalytics() {
  const habitData = [
    { name: 'Completed', value: 68, color: 'hsl(var(--neon-green))' },
    { name: 'Missed', value: 20, color: '#EF4444' },
    { name: 'Partially Done', value: 12, color: 'hsl(var(--medium-grey))' }
  ];

  const topHabits = [
    { name: 'Morning Meditation', completion: 95, streak: 21 },
    { name: 'Workout Session', completion: 87, streak: 14 },
    { name: 'Read 30 Minutes', completion: 78, streak: 12 },
    { name: 'Journal Writing', completion: 65, streak: 9 },
    { name: 'Drink Water', completion: 92, streak: 7 }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neo-card bg-white p-3">
          <p className="neo-text-medium text-black">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="neo-text-medium text-black">HABIT PERFORMANCE</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pie Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={habitData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
                stroke="#000000"
                strokeWidth={3}
              >
                {habitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => <span className="neo-text-medium text-black">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Habits */}
        <div>
          <h4 className="neo-text-medium text-black mb-3">TOP PERFORMING HABITS</h4>
          <div className="space-y-2">
            {topHabits.map((habit, index) => (
              <div key={index} className="flex items-center justify-between p-3 neo-card-green">
                <span className="neo-text-medium text-black text-sm">{habit.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="neo-text-medium text-black text-sm">{habit.completion}%</span>
                  <span className="neo-text-medium text-black text-sm">{habit.streak}d</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </>
  );
}
