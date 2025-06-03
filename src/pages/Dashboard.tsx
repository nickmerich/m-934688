
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { HabitTracker } from '@/components/habits/HabitTracker';
import { GoalProgress } from '@/components/goals/GoalProgress';
import { DailyNudge } from '@/components/ai/DailyNudge';
import { WeeklyReflection } from '@/components/reflection/WeeklyReflection';
import { StreakCounter } from '@/components/gamification/StreakCounter';
import { LevelProgress } from '@/components/gamification/LevelProgress';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        
        <main className="flex-1 transition-all duration-300 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header with Level and Streak */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Champion</h1>
                <p className="text-gray-400">Keep pushing towards your goals. Every day counts.</p>
              </div>
              <div className="flex items-center space-x-4">
                <StreakCounter currentStreak={7} />
                <LevelProgress currentLevel={3} currentWins={750} nextLevelWins={1000} />
              </div>
            </div>

            {/* Stats Overview */}
            <StatsOverview />

            {/* Main Content Grid */}
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
