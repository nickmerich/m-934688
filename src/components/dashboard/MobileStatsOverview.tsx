
import React from 'react';
import { Target, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { MobileOptimizedCard, MobileCardContent } from '@/components/mobile/MobileOptimizedCard';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';

interface StatItemProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: number;
  onClick?: () => void;
}

function MobileStatCard({ title, value, description, icon, trend, onClick }: StatItemProps) {
  const { triggerHaptic } = useHapticFeedback();

  const handleClick = () => {
    if (onClick) {
      triggerHaptic('light');
      onClick();
    }
  };

  return (
    <MobileOptimizedCard 
      className="mobile-card-compact border-4 border-black"
      onTap={handleClick}
      hapticType="light"
    >
      <MobileCardContent padding="sm">
        <div className="flex flex-col items-center text-center space-y-2">
          {/* Icon at the top */}
          <div className="p-2 bg-black rounded-lg text-white flex-shrink-0">
            {icon}
          </div>
          
          {/* Data block below icon */}
          <div className="p-2 rounded-lg w-full text-black" style={{ background: 'hsl(var(--neon-green))' }}>
            <div className="text-sm font-bold mb-1 leading-tight">{value}</div>
            <div className="text-xs text-black/80 mb-1 leading-tight">{title}</div>
            <div className="flex items-center justify-between text-xs leading-tight">
              <span className="text-black/70 truncate mr-1">{description}</span>
              <span className="font-bold px-1.5 py-0.5 rounded bg-black text-white flex-shrink-0">
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            </div>
          </div>
        </div>
      </MobileCardContent>
    </MobileOptimizedCard>
  );
}

export function MobileStatsOverview() {
  const stats = [
    {
      title: "Active Habits",
      value: "8",
      description: "habits tracked",
      icon: <Calendar className="h-4 w-4" />,
      trend: 12.5,
      onClick: () => console.log('Navigate to habits')
    },
    {
      title: "Goals in Progress",
      value: "3",
      description: "active goals",
      icon: <Target className="h-4 w-4" />,
      trend: 25.0,
      onClick: () => console.log('Navigate to goals')
    },
    {
      title: "Completion Rate",
      value: "87%",
      description: "this week",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: 5.2,
      onClick: () => console.log('View analytics')
    },
    {
      title: "Total Wins",
      value: "2,450",
      description: "lifetime points",
      icon: <Trophy className="h-4 w-4" />,
      trend: 15.8,
      onClick: () => console.log('View achievements')
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {stats.map((stat, index) => (
        <MobileStatCard key={index} {...stat} />
      ))}
    </div>
  );
}
