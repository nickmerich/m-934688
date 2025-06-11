
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
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-green-500 border-4 border-black px-3 py-1 mb-4" style={{
            background: 'hsl(var(--neon-green))',
            boxShadow: '4px 4px 0px #000000'
          }}>
            <span className="text-sm font-bold text-black">🚀 COMMAND CENTER</span>
          </div>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-white border-4 border-black neo-shadow-harsh">
            <TabsTrigger 
              value="overview" 
              className="neo-button flex items-center gap-2 data-[state=active]:neo-card-green data-[state=active]:text-black"
            >
              <TrendingUp className="h-4 w-4" />
              {!isMobile && "OVERVIEW"}
            </TabsTrigger>
            <TabsTrigger 
              value="ai-insights" 
              className="neo-button flex items-center gap-2 data-[state=active]:neo-card-green data-[state=active]:text-black"
            >
              <Brain className="h-4 w-4" />
              {!isMobile && "AI INSIGHTS"}
            </TabsTrigger>
            <TabsTrigger 
              value="goal-architect" 
              className="neo-button flex items-center gap-2 data-[state=active]:neo-card-green data-[state=active]:text-black"
            >
              <Target className="h-4 w-4" />
              {!isMobile && "GOAL ARCHITECT"}
            </TabsTrigger>
            <TabsTrigger 
              value="mindgym" 
              className="neo-button flex items-center gap-2 data-[state=active]:neo-card-green data-[state=active]:text-black"
            >
              <Zap className="h-4 w-4" />
              {!isMobile && "MINDGYM"}
            </TabsTrigger>
            <TabsTrigger 
              value="habits" 
              className="neo-button flex items-center gap-2 data-[state=active]:neo-card-green data-[state=active]:text-black"
            >
              <Dumbbell className="h-4 w-4" />
              {!isMobile && "HABITS"}
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className="neo-button flex items-center gap-2 data-[state=active]:neo-card-green data-[state=active]:text-black"
            >
              <Target className="h-4 w-4" />
              {!isMobile && "GOALS"}
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="neo-button flex items-center gap-2 data-[state=active]:neo-card-green data-[state=active]:text-black"
            >
              <Settings className="h-4 w-4" />
              {!isMobile && "SETTINGS"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            {isMobile ? <MobileStatsOverview /> : <StatsOverview />}
            
            {/* Quick AI Insights Preview */}
            <div className="grid lg:grid-cols-2 gap-6">
              <AIInsightsDashboard />
            </div>
          </TabsContent>

          <TabsContent value="ai-insights">
            <AIInsightsDashboard />
          </TabsContent>

          <TabsContent value="goal-architect">
            <AIGoalArchitect />
          </TabsContent>

          <TabsContent value="mindgym">
            <MindGymCoach />
          </TabsContent>

          <TabsContent value="habits">
            <HabitTracker />
          </TabsContent>

          <TabsContent value="goals">
            <GoalProgress />
          </TabsContent>

          <TabsContent value="settings">
            <UserPreferencesSetup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
