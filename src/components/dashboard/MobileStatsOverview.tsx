
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
      className="mobile-card-compact"
      onTap={handleClick}
      hapticType="light"
    >
      <MobileCardContent padding="sm">
        <div className="mobile-flex-between">
          <div className="mobile-flex-start space-x-3">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500 gpu-accelerated">
              {icon}
            </div>
            <div>
              <div className="mobile-text-lg font-bold text-white">{value}</div>
              <div className="mobile-text-xs text-gray-400">{title}</div>
            </div>
          </div>
          <div className={`mobile-text-xs font-medium px-2 py-1 rounded-full ${
            trend > 0 
              ? 'text-green-400 bg-green-500/10' 
              : 'text-red-400 bg-red-500/10'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
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
    <div className="mobile-grid-2 gap-3">
      {stats.map((stat, index) => (
        <MobileStatCard key={index} {...stat} />
      ))}
    </div>
  );
}
