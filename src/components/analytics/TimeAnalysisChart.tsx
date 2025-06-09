
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function TimeAnalysisChart() {
  const hourlyData = [
    { hour: '6AM', productivity: 85, habits: 3 },
    { hour: '7AM', productivity: 95, habits: 4 },
    { hour: '8AM', productivity: 90, habits: 3 },
    { hour: '9AM', productivity: 88, habits: 2 },
    { hour: '10AM', productivity: 75, habits: 2 },
    { hour: '11AM', productivity: 70, habits: 1 },
    { hour: '12PM', productivity: 65, habits: 1 },
    { hour: '1PM', productivity: 60, habits: 1 },
    { hour: '2PM', productivity: 68, habits: 2 },
    { hour: '3PM', productivity: 72, habits: 2 },
    { hour: '4PM', productivity: 78, habits: 2 },
    { hour: '5PM', productivity: 80, habits: 3 },
    { hour: '6PM', productivity: 85, habits: 4 },
    { hour: '7PM', productivity: 82, habits: 3 },
    { hour: '8PM', productivity: 75, habits: 2 },
    { hour: '9PM', productivity: 70, habits: 2 },
    { hour: '10PM', productivity: 60, habits: 1 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neo-card bg-white p-3">
          <p className="neo-text-medium text-black mb-1">{label}</p>
          <p className="text-sm text-black">Productivity: {payload[0].value}%</p>
          <p className="text-sm text-black">Habits: {payload[0].payload.habits}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="neo-card h-full">
      <CardHeader>
        <CardTitle className="neo-text-medium text-black">TIME ANALYSIS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <XAxis 
                dataKey="hour" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#000000', fontSize: 10, fontWeight: 'bold' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#000000', fontSize: 10, fontWeight: 'bold' }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="productivity" 
                fill="hsl(var(--neon-green))"
                stroke="#000000"
                strokeWidth={2}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <div className="neo-text-medium text-black">PEAK HOURS: 7-9 AM</div>
          <div className="text-sm text-black mt-1">Average productivity: 92%</div>
        </div>
      </CardContent>
    </Card>
  );
}
