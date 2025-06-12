
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
      className="border-4 border-black"
      onTap={handleClick}
      hapticType="light"
    >
      <MobileCardContent padding="sm">
        <div className="space-y-3">
          {/* Header with icon and trend */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center">
                <span className="text-white text-sm">{icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-black leading-tight">{title}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-100">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-xs font-bold text-green-600">{trend}%</span>
            </div>
          </div>

          {/* Main value */}
          <div className="text-center py-2">
            <div className="text-2xl font-black text-black leading-none mb-1">{value}</div>
            <div className="text-xs text-black/70">{description}</div>
          </div>

          {/* Chart */}
          <div className="h-12" style={{ background: color === "green" ? 'hsl(var(--neon-green))' : color }}>
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
    <div className="grid grid-cols-2 gap-3 p-4">
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
        color="green"
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
        color="#374151"
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={miniTrendData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#FFFFFF" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        }
        onClick={() => console.log('View achievements')}
      />
    </div>
  );
}
