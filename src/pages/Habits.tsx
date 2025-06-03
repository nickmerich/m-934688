
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { HabitTracker } from '@/components/habits/HabitTracker';
import { HabitStats } from '@/components/habits/HabitStats';
import { HabitStreaks } from '@/components/habits/HabitStreaks';
import { WeeklyHabitChart } from '@/components/habits/WeeklyHabitChart';
import { HabitResources } from '@/components/habits/HabitResources';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Habits = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [showResources, setShowResources] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {showResources ? 'Resources & Frameworks' : 'Habits Dashboard'}
                </h1>
                <p className="text-gray-400 mt-2">
                  {showResources 
                    ? 'Learn proven strategies for building better habits and achieving your goals'
                    : 'Build and track your daily habits for lasting change'
                  }
                </p>
              </div>
              <Button
                onClick={() => setShowResources(!showResources)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {showResources ? 'Back to Dashboard' : 'View Resources'}
              </Button>
            </div>

            {showResources ? (
              <HabitResources />
            ) : (
              <>
                {/* Stats Overview */}
                <HabitStats />

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Today's Habits */}
                  <div className="lg:col-span-2">
                    <HabitTracker />
                  </div>

                  {/* Right Column - Streaks and Analytics */}
                  <div className="space-y-6">
                    <HabitStreaks />
                    <WeeklyHabitChart />
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Habits;
