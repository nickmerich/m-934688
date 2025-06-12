
import React, { useState } from 'react';
import { MobileStatsOverview } from '@/components/dashboard/MobileStatsOverview';
import { MobileHabitTracker } from '@/components/habits/MobileHabitTracker';
import { MobilePullToRefresh } from '@/components/mobile/MobilePullToRefresh';
import { MobileOptimizedCard, MobileCardHeader, MobileCardContent } from '@/components/mobile/MobileOptimizedCard';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { Zap, Target, Calendar, TrendingUp } from 'lucide-react';

export function MobileDashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const { triggerHaptic } = useHapticFeedback();

  const handleRefresh = async () => {
    setRefreshing(true);
    triggerHaptic('medium');
    
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setRefreshing(false);
    triggerHaptic('light');
  };

  const quickActions = [
    {
      icon: Zap,
      label: 'Quick Log',
      color: 'from-green-500 to-green-600',
      action: () => {
        triggerHaptic('light');
        console.log('Quick log habit');
      }
    },
    {
      icon: Target,
      label: 'Set Goal',
      color: 'from-blue-500 to-blue-600',
      action: () => {
        triggerHaptic('light');
        console.log('Set new goal');
      }
    },
    {
      icon: Calendar,
      label: 'Schedule',
      color: 'from-purple-500 to-purple-600',
      action: () => {
        triggerHaptic('light');
        console.log('View schedule');
      }
    },
    {
      icon: TrendingUp,
      label: 'Progress',
      color: 'from-orange-500 to-orange-600',
      action: () => {
        triggerHaptic('light');
        console.log('View progress');
      }
    }
  ];

  return (
    <MobilePullToRefresh onRefresh={handleRefresh} className="min-h-screen bg-gray-950">
      <div className="px-4 py-4 safe-area-top space-y-4">
        {/* Welcome Section */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-white mb-1">
            Good morning! 👋
          </h1>
          <p className="text-sm text-gray-400">
            Let's make today count
          </p>
        </div>

        {/* Quick Actions */}
        <MobileOptimizedCard className="mb-4" animated={false}>
          <MobileCardHeader>
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
          </MobileCardHeader>
          <MobileCardContent className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`
                    p-3 rounded-lg bg-gradient-to-r ${action.color}
                    flex flex-col items-center space-y-1 text-white
                    shadow-lg hover:shadow-xl transition-all duration-200
                    min-h-[60px] touch-manipulation
                  `}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs font-medium">{action.label}</span>
                </button>
              );
            })}
          </MobileCardContent>
        </MobileOptimizedCard>

        {/* Stats Overview */}
        <div className="mb-4">
          <MobileStatsOverview />
        </div>

        {/* Today's Habits */}
        <div className="mb-4">
          <MobileHabitTracker />
        </div>

        {/* Recent Activity */}
        <MobileOptimizedCard>
          <MobileCardHeader>
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="space-y-3">
              {[
                { action: 'Completed Morning Meditation', time: '2 hours ago', type: 'habit' },
                { action: 'Updated Weight Goal progress', time: '1 day ago', type: 'goal' },
                { action: 'Workout streak: 5 days!', time: '2 days ago', type: 'achievement' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                  <div className={`
                    w-2 h-2 rounded-full flex-shrink-0 ml-2
                    ${activity.type === 'habit' ? 'bg-green-500' : 
                      activity.type === 'goal' ? 'bg-blue-500' : 'bg-yellow-500'}
                  `} />
                </div>
              ))}
            </div>
          </MobileCardContent>
        </MobileOptimizedCard>
      </div>
    </MobilePullToRefresh>
  );
}
