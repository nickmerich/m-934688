
import React from 'react';
import { Target, Calendar, Trophy, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';

const trendData = [
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 78 },
  { day: 'Wed', value: 82 },
  { day: 'Thu', value: 87 },
  { day: 'Fri', value: 85 },
  { day: 'Sat', value: 91 },
  { day: 'Sun', value: 89 }
];

const completionData = [
  { name: 'Completed', value: 87, color: 'hsl(var(--neon-green))' },
  { name: 'Remaining', value: 13, color: '#E5E7EB' }
];

const weeklyHabits = [
  { day: 'M', completed: 6, total: 8 },
  { day: 'T', completed: 7, total: 8 },
  { day: 'W', completed: 5, total: 8 },
  { day: 'T', completed: 8, total: 8 },
  { day: 'F', completed: 6, total: 8 },
  { day: 'S', completed: 7, total: 8 },
  { day: 'S', completed: 8, total: 8 }
];

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: number;
  chart: React.ReactNode;
  color?: string;
}

function EnhancedStatCard({ title, value, description, icon, trend, chart, color = "neo-card" }: StatCardProps) {
  const isPositive = trend > 0;
  
  return (
    <div className={`${color} p-4 sm:p-6 transition-all duration-300 hover:transform hover:translate-x-1 hover:translate-y-1`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center">
            <span className="text-white">{icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="neo-text-small text-black mb-1 leading-tight">{title}</div>
            <div className="text-xs text-black/70 leading-tight">{description}</div>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          {isPositive ? (
            <ArrowUp className="h-3 w-3 text-green-600" />
          ) : (
            <ArrowDown className="h-3 w-3 text-red-600" />
          )}
          <span className={`text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-3xl sm:text-4xl font-black text-black mb-2 leading-none">
          {value}
        </div>
      </div>
      
      <div className="h-16 sm:h-20">
        {chart}
      </div>
    </div>
  );
}

export function EnhancedStatsOverview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <EnhancedStatCard
          title="ACTIVE HABITS"
          value="8"
          description="habits tracked daily"
          icon={<Calendar className="h-6 w-6" />}
          trend={12.5}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyHabits}>
                <Bar 
                  dataKey="completed" 
                  fill="hsl(var(--neon-green))" 
                  stroke="#000000" 
                  strokeWidth={2}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          }
        />

        <EnhancedStatCard
          title="GOALS PROGRESS"
          value="3"
          description="active goals"
          icon={<Target className="h-6 w-6" />}
          trend={25.0}
          color="neo-card-green"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#000000" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <EnhancedStatCard
          title="COMPLETION RATE"
          value="87%"
          description="this week"
          icon={<TrendingUp className="h-6 w-6" />}
          trend={5.2}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={35}
                  dataKey="value"
                  stroke="#000000"
                  strokeWidth={2}
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          }
        />

        <EnhancedStatCard
          title="TOTAL WINS"
          value="2,450"
          description="lifetime points"
          icon={<Trophy className="h-6 w-6" />}
          trend={15.8}
          color="neo-card-grey"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#FFFFFF" 
                  strokeWidth={3}
                  dot={{ fill: '#FFFFFF', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          }
        />
      </div>
    </div>
  );
}
