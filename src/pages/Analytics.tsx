
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AnalyticsOverview } from '@/components/analytics/AnalyticsOverview';
import { HabitAnalytics } from '@/components/analytics/HabitAnalytics';
import { GoalAnalytics } from '@/components/analytics/GoalAnalytics';
import { ProgressTrends } from '@/components/analytics/ProgressTrends';

const Analytics = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics & Insights</h1>
              <p className="text-gray-400 mt-2">Track your progress and get insights into your habits and goals</p>
            </div>

            {/* Overview Stats */}
            <AnalyticsOverview />

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HabitAnalytics />
              <GoalAnalytics />
            </div>

            {/* Progress Trends */}
            <ProgressTrends />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
