
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
      <div className="mobile-spacing-md safe-area-top">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="mobile-text-xl font-bold text-white mb-2">
            Good morning! 👋
          </h1>
          <p className="mobile-text-sm text-gray-400">
            Let's make today count
          </p>
        </div>

        {/* Quick Actions */}
        <MobileOptimizedCard className="mb-6" animated={false}>
          <MobileCardHeader>
            <h2 className="mobile-text-lg font-semibold text-white">Quick Actions</h2>
          </MobileCardHeader>
          <MobileCardContent className="mobile-grid-2 gap-3">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`
                    mobile-button p-4 rounded-lg bg-gradient-to-r ${action.color}
                    flex flex-col items-center space-y-2 text-white
                    shadow-lg hover:shadow-xl
                  `}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="mobile-text-xs font-medium">{action.label}</span>
                </button>
              );
            })}
          </MobileCardContent>
        </MobileOptimizedCard>

        {/* Stats Overview */}
        <div className="mb-6">
          <MobileStatsOverview />
        </div>

        {/* Today's Habits */}
        <div className="mb-6">
          <MobileHabitTracker />
        </div>

        {/* Recent Activity */}
        <MobileOptimizedCard>
          <MobileCardHeader>
            <h2 className="mobile-text-lg font-semibold text-white">Recent Activity</h2>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="space-y-3">
              {[
                { action: 'Completed Morning Meditation', time: '2 hours ago', type: 'habit' },
                { action: 'Updated Weight Goal progress', time: '1 day ago', type: 'goal' },
                { action: 'Workout streak: 5 days!', time: '2 days ago', type: 'achievement' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="mobile-text-sm text-white font-medium">{activity.action}</p>
                    <p className="mobile-text-xs text-gray-400">{activity.time}</p>
                  </div>
                  <div className={`
                    w-2 h-2 rounded-full
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
