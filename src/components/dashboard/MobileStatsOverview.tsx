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
      className="mobile-card-compact bg-green-500 border-4 border-black"
      onTap={handleClick}
      hapticType="light"
    >
      <MobileCardContent padding="sm">
        <div className="flex flex-col items-center text-center space-y-2">
          {/* Icon at the top */}
          <div className="p-2.5 bg-black rounded-lg text-white">
            {icon}
          </div>
          
          {/* Data block below icon */}
          <div className="bg-gray-600 p-3 rounded-lg w-full text-white">
            <div className="mobile-text-lg font-bold mb-1">{value}</div>
            <div className="mobile-text-xs text-gray-300 mb-2">{title}</div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">{description}</span>
              <span className="font-medium px-2 py-0.5 rounded-full bg-white text-black">
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
      icon: <Calendar className="h-5 w-5" />,
      trend: 12.5,
      onClick: () => console.log('Navigate to habits')
    },
    {
      title: "Goals in Progress",
      value: "3",
      description: "active goals",
      icon: <Target className="h-5 w-5" />,
      trend: 25.0,
      onClick: () => console.log('Navigate to goals')
    },
    {
      title: "Completion Rate",
      value: "87%",
      description: "this week",
      icon: <TrendingUp className="h-5 w-5" />,
      trend: 5.2,
      onClick: () => console.log('View analytics')
    },
    {
      title: "Total Wins",
      value: "2,450",
      description: "lifetime points",
      icon: <Trophy className="h-5 w-5" />,
      trend: 15.8,
      onClick: () => console.log('View achievements')
    }
  ];

  return (
    <div className="mobile-grid-2 gap-4">
      {stats.map((stat, index) => (
        <MobileStatCard key={index} {...stat} />
      ))}
    </div>
  );
}
