
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import Sidebar from '@/components/layout/Sidebar';
import { MobileBottomNavigation } from '@/components/mobile/MobileBottomNavigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-950 relative">
        <MobileNavbar />
        <main className="flex-1 pb-20 overflow-x-hidden">
          <div className="safe-area-top">
            {children}
          </div>
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
        <main className={`flex-1 transition-all duration-300 overflow-hidden ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="h-full overflow-auto p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
