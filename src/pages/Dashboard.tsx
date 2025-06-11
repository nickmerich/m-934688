
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
import { useMobile } from '@/hooks/use-mobile';
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
  const isMobile = useMobile();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Your GRYT Command Center</h1>
          <p className="text-gray-400">Build yourself. Do the thing. Your AI-powered growth ecosystem.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-gray-900">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {!isMobile && "Overview"}
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              {!isMobile && "AI Insights"}
            </TabsTrigger>
            <TabsTrigger value="goal-architect" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              {!isMobile && "Goal Architect"}
            </TabsTrigger>
            <TabsTrigger value="mindgym" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {!isMobile && "MindGym"}
            </TabsTrigger>
            <TabsTrigger value="habits" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              {!isMobile && "Habits"}
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              {!isMobile && "Goals"}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {!isMobile && "Settings"}
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
