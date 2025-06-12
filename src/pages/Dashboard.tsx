import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { MobileStatsOverview } from '@/components/dashboard/MobileStatsOverview';
import { AIInsightsDashboard } from '@/components/dashboard/AIInsightsDashboard';
import { AIGoalArchitect } from '@/components/ai/AIGoalArchitect';
import { MindGymCoach } from '@/components/ai/MindGymCoach';
import { UserPreferencesSetup } from '@/components/ai/UserPreferencesSetup';
import { HabitTracker } from '@/components/habits/HabitTracker';
import { GoalProgress } from '@/components/goals/GoalProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Brain, 
  Target, 
  Dumbbell, 
  TrendingUp, 
  Users, 
  Settings,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white no-gradients">
      <div className="container mx-auto px-4 py-6 lg:px-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8 text-center">
          <h1 className="neo-text-massive text-black mb-2">
            GRYT
            <span className="block" style={{
              color: 'hsl(var(--neon-green))'
            }}>
              DASHBOARD
            </span>
          </h1>
          <p className="neo-text-big text-black">BUILD YOURSELF. DO THE THING.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 lg:space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-white border-4 border-black neo-shadow-harsh p-2 gap-2">
            <TabsTrigger 
              value="overview" 
              className="bg-white text-black border-2 border-black font-bold uppercase px-3 py-2 transition-all data-[state=active]:bg-green-500 data-[state=active]:text-black hover:transform hover:translate-x-1 hover:translate-y-1 flex items-center gap-2"
              style={{
                background: activeTab === 'overview' ? 'hsl(var(--neon-green))' : 'white',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              <TrendingUp className="h-4 w-4" />
              {!isMobile && "OVERVIEW"}
            </TabsTrigger>
            <TabsTrigger 
              value="ai-insights" 
              className="bg-white text-black border-2 border-black font-bold uppercase px-3 py-2 transition-all data-[state=active]:bg-green-500 data-[state=active]:text-black hover:transform hover:translate-x-1 hover:translate-y-1 flex items-center gap-2"
              style={{
                background: activeTab === 'ai-insights' ? 'hsl(var(--neon-green))' : 'white',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              <Brain className="h-4 w-4" />
              {!isMobile && "INSIGHTS"}
            </TabsTrigger>
            <TabsTrigger 
              value="goal-architect" 
              className="bg-white text-black border-2 border-black font-bold uppercase px-3 py-2 transition-all data-[state=active]:bg-green-500 data-[state=active]:text-black hover:transform hover:translate-x-1 hover:translate-y-1 flex items-center gap-2"
              style={{
                background: activeTab === 'goal-architect' ? 'hsl(var(--neon-green))' : 'white',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              <Target className="h-4 w-4" />
              {!isMobile && "GOALS"}
            </TabsTrigger>
            <TabsTrigger 
              value="mindgym" 
              className="bg-white text-black border-2 border-black font-bold uppercase px-3 py-2 transition-all data-[state=active]:bg-green-500 data-[state=active]:text-black hover:transform hover:translate-x-1 hover:translate-y-1 flex items-center gap-2"
              style={{
                background: activeTab === 'mindgym' ? 'hsl(var(--neon-green))' : 'white',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              <Zap className="h-4 w-4" />
              {!isMobile && "MIND"}
            </TabsTrigger>
            <TabsTrigger 
              value="habits" 
              className="bg-white text-black border-2 border-black font-bold uppercase px-3 py-2 transition-all data-[state=active]:bg-green-500 data-[state=active]:text-black hover:transform hover:translate-x-1 hover:translate-y-1 flex items-center gap-2"
              style={{
                background: activeTab === 'habits' ? 'hsl(var(--neon-green))' : 'white',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              <Dumbbell className="h-4 w-4" />
              {!isMobile && "HABITS"}
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className="bg-white text-black border-2 border-black font-bold uppercase px-3 py-2 transition-all data-[state=active]:bg-green-500 data-[state=active]:text-black hover:transform hover:translate-x-1 hover:translate-y-1 flex items-center gap-2"
              style={{
                background: activeTab === 'goals' ? 'hsl(var(--neon-green))' : 'white',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              <Target className="h-4 w-4" />
              {!isMobile && "PROGRESS"}
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="bg-white text-black border-2 border-black font-bold uppercase px-3 py-2 transition-all data-[state=active]:bg-green-500 data-[state=active]:text-black hover:transform hover:translate-x-1 hover:translate-y-1 flex items-center gap-2"
              style={{
                background: activeTab === 'settings' ? 'hsl(var(--neon-green))' : 'white',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              <Settings className="h-4 w-4" />
              {!isMobile && "SETTINGS"}
            </TabsTrigger>
          </TabsList>

          <div className="px-0">
            <TabsContent value="overview" className="space-y-6 mt-4">
              {/* Stats Overview */}
              {isMobile ? <MobileStatsOverview /> : <StatsOverview />}
              
              {/* Quick AI Insights Preview */}
              <div className="grid lg:grid-cols-2 gap-6">
                <AIInsightsDashboard />
              </div>
            </TabsContent>

            <TabsContent value="ai-insights" className="mt-4">
              <AIInsightsDashboard />
            </TabsContent>

            <TabsContent value="goal-architect" className="mt-4">
              <AIGoalArchitect />
            </TabsContent>

            <TabsContent value="mindgym" className="mt-4">
              <MindGymCoach />
            </TabsContent>

            <TabsContent value="habits" className="mt-4">
              <HabitTracker />
            </TabsContent>

            <TabsContent value="goals" className="mt-4">
              <GoalProgress />
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <UserPreferencesSetup />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
