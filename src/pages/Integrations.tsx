
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { IntegrationCategory } from '@/components/integrations/IntegrationCategory';
import { CalendarIntegration } from '@/components/integrations/CalendarIntegration';
import { Calendar, Brain, Dumbbell, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Integrations = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'apps' | 'calendar'>('apps');

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <main className="flex-1 p-3 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {activeTab === 'apps' ? 'App Integrations' : 'Calendar & Reminders'}
                </h1>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  {activeTab === 'apps' 
                    ? 'Connect your favorite productivity apps to enhance your journey'
                    : 'Sync your calendar and set up daily reminders to stay on track'
                  }
                </p>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex bg-gray-800 rounded-lg p-1 w-full sm:w-auto">
                <Button
                  onClick={() => setActiveTab('apps')}
                  variant={activeTab === 'apps' ? 'default' : 'ghost'}
                  size="sm"
                  className={`flex-1 sm:flex-none ${activeTab === 'apps' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">App</span> Integrations
                </Button>
                <Button
                  onClick={() => setActiveTab('calendar')}
                  variant={activeTab === 'calendar' ? 'default' : 'ghost'}
                  size="sm"
                  className={`flex-1 sm:flex-none ${activeTab === 'calendar' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar & Reminders
                </Button>
              </div>
            </div>

            {/* Content */}
            {activeTab === 'apps' ? (
              <div className="space-y-8">
                <IntegrationCategory 
                  title="Mind" 
                  description="Tools for productivity, learning, and mental clarity"
                  category="mind"
                />
                <IntegrationCategory 
                  title="Body" 
                  description="Apps for fitness, nutrition, and physical wellness"
                  category="body"
                />
                <IntegrationCategory 
                  title="Spirit" 
                  description="Resources for mindfulness, reflection, and inner growth"
                  category="spirit"
                />
              </div>
            ) : (
              <CalendarIntegration />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Integrations;
