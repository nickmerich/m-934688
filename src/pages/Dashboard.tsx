
import React, { useState } from 'react';
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { MobileStatsOverview } from '@/components/dashboard/MobileStatsOverview';
import { HabitTracker } from '@/components/habits/HabitTracker';
import { MobileHabitTracker } from '@/components/habits/MobileHabitTracker';
import { GoalProgress } from '@/components/goals/GoalProgress';
import { DailyNudge } from '@/components/ai/DailyNudge';
import { WeeklyReflection } from '@/components/reflection/WeeklyReflection';
import { StreakCounter } from '@/components/gamification/StreakCounter';
import { LevelProgress } from '@/components/gamification/LevelProgress';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = () => {
  const isMobile = useIsMobile();

  const dashboardContent = (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with Level and Streak */}
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
        <div className={isMobile ? 'text-center' : ''}>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-2`}>
            Welcome back, Champion
          </h1>
          <p className="text-gray-400">Keep pushing towards your goals. Every day counts.</p>
        </div>
        <div className={`flex items-center ${isMobile ? 'justify-center' : ''} space-x-4`}>
          <StreakCounter currentStreak={7} />
          <LevelProgress currentLevel={3} currentWins={750} nextLevelWins={1000} />
        </div>
      </div>

      {/* Stats Overview */}
      {isMobile ? <MobileStatsOverview /> : <StatsOverview />}

      {/* Main Content Grid */}
      {isMobile ? (
        // Mobile Layout - Single Column
        <div className="space-y-6">
          <MobileHabitTracker />
          <GoalProgress />
          <DailyNudge />
          <WeeklyReflection />
        </div>
      ) : (
        // Desktop Layout - Two Column
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Habits and Goals */}
          <div className="lg:col-span-2 space-y-6">
            <HabitTracker />
            <GoalProgress />
          </div>

          {/* Right Column - AI Nudges and Reflection */}
          <div className="space-y-6">
            <DailyNudge />
            <WeeklyReflection />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ResponsiveLayout>
      {dashboardContent}
    </ResponsiveLayout>
  );
};

export default Dashboard;
