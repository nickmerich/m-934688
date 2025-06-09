
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import Sidebar from '@/components/layout/Sidebar';
import { MobileBottomNavigation } from '@/components/mobile/MobileBottomNavigation';
import { MobileDashboard } from '@/components/mobile/MobileDashboard';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { HabitTracker } from '@/components/habits/HabitTracker';
import { useIsMobile } from '@/hooks/use-mobile';

export function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-950">
        <MobileNavbar />
        <main className="flex-1 pb-20">
          <MobileDashboard />
        </main>
        <MobileBottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="container max-w-full p-4 lg:p-6 animate-fade-in">
            <h1 className="text-2xl font-bold mb-6 text-white">Dashboard</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <StatsOverview />
              </div>
              <div>
                <HabitTracker />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
