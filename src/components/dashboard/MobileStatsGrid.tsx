
import React from 'react';
import { Target, Calendar, Trophy, TrendingUp, Zap, ArrowUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MobileOptimizedCard, MobileCardContent } from '@/components/mobile/MobileOptimizedCard';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';

const miniTrendData = [
  { value: 65 }, { value: 78 }, { value: 82 }, { value: 87 }, { value: 85 }, { value: 91 }, { value: 89 }
];

const habitData = [
  { day: 1, completed: 6 }, { day: 2, completed: 7 }, { day: 3, completed: 5 }, 
  { day: 4, completed: 8 }, { day: 5, completed: 6 }, { day: 6, completed: 7 }, { day: 7, completed: 8 }
];

interface MobileStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: number;
  chart: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

function MobileStatCard({ title, value, description, icon, trend, chart, color = "white", onClick }: MobileStatCardProps) {
  const { triggerHaptic } = useHapticFeedback();

  const handleClick = () => {
    if (onClick) {
      triggerHaptic('light');
      onClick();
    }
  };

  return (
    <MobileOptimizedCard 
      className="border-4 border-black mobile-stat-card"
      onTap={handleClick}
      hapticType="light"
    >
      <MobileCardContent padding="sm" className="p-4">
        <div className="space-y-3">
          {/* Header with icon and trend - Better spacing */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">{icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-black leading-tight truncate">{title}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-100 flex-shrink-0 ml-2">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-xs font-bold text-green-600">{trend}%</span>
            </div>
          </div>

          {/* Main value - Better positioning */}
          <div className="text-center py-2 mb-2">
            <div className="mobile-stat-value text-black mb-1">{value}</div>
            <div className="text-xs text-black/70 leading-tight">{description}</div>
          </div>

          {/* Chart - Fixed height and better spacing */}
          <div className="h-12 bg-gray-50 rounded border border-gray-200">
            <div className="p-2 h-full">
              {chart}
            </div>
          </div>
        </div>
      </MobileCardContent>
    </MobileOptimizedCard>
  );
}

export function MobileStatsGrid() {
  return (
    <div className="px-4">
      {/* Progress Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-black">PROGRESS: 3/5</span>
          <span className="text-sm font-bold text-green-600">87%</span>
        </div>
        <div className="w-full bg-gray-200 h-3 border-2 border-black rounded">
          <div 
            className="h-full transition-all duration-300 rounded-sm" 
            style={{ 
              width: '87%',
              background: 'hsl(var(--neon-green))'
            }}
          ></div>
        </div>
      </div>

      {/* Stats Grid - Improved spacing */}
      <div className="grid grid-cols-2 gap-4">
        <MobileStatCard
          title="HABITS"
          value="8"
          description="tracked daily"
          icon={<Calendar className="h-4 w-4" />}
          trend={12.5}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={habitData}>
                <Bar 
                  dataKey="completed" 
                  fill="#000000" 
                  radius={[1, 1, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          }
          onClick={() => console.log('Navigate to habits')}
        />

        <MobileStatCard
          title="GOALS"
          value="3"
          description="in progress"
          icon={<Target className="h-4 w-4" />}
          trend={25.0}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniTrendData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#000000" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          }
          onClick={() => console.log('Navigate to goals')}
        />

        <MobileStatCard
          title="RATE"
          value="87%"
          description="this week"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={5.2}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniTrendData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#000000" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          }
          onClick={() => console.log('View analytics')}
        />

        <MobileStatCard
          title="WINS"
          value="2.4K"
          description="total points"
          icon={<Trophy className="h-4 w-4" />}
          trend={15.8}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniTrendData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#000000" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          }
          onClick={() => console.log('View achievements')}
        />
      </div>
    </div>
  );
}
