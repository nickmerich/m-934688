
import React, { useState } from 'react';
import { MobileStatsGrid } from '@/components/dashboard/MobileStatsGrid';
import { MobileHabitTracker } from '@/components/habits/MobileHabitTracker';
import { MobilePullToRefresh } from '@/components/mobile/MobilePullToRefresh';
import { MobileOptimizedCard, MobileCardHeader, MobileCardContent } from '@/components/mobile/MobileOptimizedCard';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { Zap, Target, Calendar, TrendingUp, Activity, Brain } from 'lucide-react';

export function MobileEnhancedDashboard() {
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
      label: 'New Goal',
      color: 'from-blue-500 to-blue-600',
      action: () => {
        triggerHaptic('light');
        console.log('Set new goal');
      }
    },
    {
      icon: Brain,
      label: 'AI Coach',
      color: 'from-purple-500 to-purple-600',
      action: () => {
        triggerHaptic('light');
        console.log('Open AI coach');
      }
    },
    {
      icon: Activity,
      label: 'Analytics',
      color: 'from-orange-500 to-orange-600',
      action: () => {
        triggerHaptic('light');
        console.log('View analytics');
      }
    }
  ];

  return (
    <MobilePullToRefresh onRefresh={handleRefresh} className="min-h-screen bg-white">
      <div className="safe-area-top space-y-6 pb-24">
        {/* Welcome Section - Better spacing */}
        <div className="px-4 pt-2">
          <h1 className="neo-text-big text-black mb-1">
            GOOD MORNING! 👋
          </h1>
          <p className="text-sm text-black/70 mb-4">
            Let's make today count
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="px-0">
          <MobileStatsGrid />
        </div>

        {/* Quick Actions - Better spacing */}
        <div className="px-4 mt-6">
          <MobileOptimizedCard className="border-4 border-black" animated={false}>
            <MobileCardHeader>
              <h2 className="neo-text-medium text-black">QUICK ACTIONS</h2>
            </MobileCardHeader>
            <MobileCardContent className="grid grid-cols-2 gap-3 p-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`
                      p-4 rounded-lg bg-gradient-to-r ${action.color}
                      flex flex-col items-center space-y-2 text-white
                      shadow-lg hover:shadow-xl transition-all duration-200
                      min-h-[72px] touch-manipulation border-2 border-black
                      active:scale-95
                    `}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs font-bold">{action.label}</span>
                  </button>
                );
              })}
            </MobileCardContent>
          </MobileOptimizedCard>
        </div>

        {/* Today's Habits - Better spacing */}
        <div className="px-4 mt-6">
          <MobileHabitTracker />
        </div>

        {/* Recent Activity - Better spacing */}
        <div className="px-4 pb-4 mt-6">
          <MobileOptimizedCard className="border-4 border-black">
            <MobileCardHeader>
              <h2 className="neo-text-medium text-black">RECENT ACTIVITY</h2>
            </MobileCardHeader>
            <MobileCardContent className="p-4">
              <div className="space-y-3">
                {[
                  { action: 'Completed Morning Meditation', time: '2 hours ago', type: 'habit' },
                  { action: 'Updated Weight Goal progress', time: '1 day ago', type: 'goal' },
                  { action: 'Workout streak: 5 days!', time: '2 days ago', type: 'achievement' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-2 border-black rounded-lg bg-gray-50">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-black font-bold truncate">{activity.action}</p>
                      <p className="text-xs text-black/70">{activity.time}</p>
                    </div>
                    <div className={`
                      w-3 h-3 rounded-full flex-shrink-0 ml-3 border-2 border-black
                      ${activity.type === 'habit' ? 'bg-green-500' : 
                        activity.type === 'goal' ? 'bg-blue-500' : 'bg-yellow-500'}
                    `} />
                  </div>
                ))}
              </div>
            </MobileCardContent>
          </MobileOptimizedCard>
        </div>
      </div>
    </MobilePullToRefresh>
  );
}
