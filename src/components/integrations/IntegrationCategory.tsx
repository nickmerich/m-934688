
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Dumbbell, Heart, ExternalLink, Check } from 'lucide-react';

interface IntegrationCategoryProps {
  title: string;
  description: string;
  category: 'mind' | 'body' | 'spirit';
}

export function IntegrationCategory({ title, description, category }: IntegrationCategoryProps) {
  const getIcon = () => {
    switch (category) {
      case 'mind': return <Brain className="h-6 w-6 text-blue-400" />;
      case 'body': return <Dumbbell className="h-6 w-6 text-green-400" />;
      case 'spirit': return <Heart className="h-6 w-6 text-purple-400" />;
    }
  };

  const getApps = () => {
    switch (category) {
      case 'mind':
        return [
          { name: 'Notion', description: 'All-in-one workspace for notes and planning', connected: true, category: 'Productivity' },
          { name: 'Todoist', description: 'Task management and organization', connected: false, category: 'Task Management' },
          { name: 'Obsidian', description: 'Knowledge management and note-taking', connected: true, category: 'Knowledge Base' },
          { name: 'Forest', description: 'Focus timer with gamification', connected: false, category: 'Focus' },
          { name: 'RescueTime', description: 'Time tracking and productivity insights', connected: false, category: 'Analytics' },
          { name: 'Anki', description: 'Spaced repetition flashcards', connected: true, category: 'Learning' }
        ];
      case 'body':
        return [
          { name: 'Strava', description: 'Running and cycling activity tracking', connected: true, category: 'Fitness' },
          { name: 'MyFitnessPal', description: 'Nutrition and calorie tracking', connected: false, category: 'Nutrition' },
          { name: 'Fitbit', description: 'Activity and sleep monitoring', connected: true, category: 'Health Tracking' },
          { name: 'Nike Training Club', description: 'Workout routines and training', connected: false, category: 'Workouts' },
          { name: 'Apple Health', description: 'Comprehensive health data platform', connected: true, category: 'Health Data' },
          { name: 'Cronometer', description: 'Precise nutrition tracking', connected: false, category: 'Nutrition' }
        ];
      case 'spirit':
        return [
          { name: 'Headspace', description: 'Guided meditation and mindfulness', connected: true, category: 'Meditation' },
          { name: 'Calm', description: 'Sleep stories and relaxation', connected: false, category: 'Relaxation' },
          { name: 'Insight Timer', description: 'Meditation timer and community', connected: true, category: 'Meditation' },
          { name: 'Ten Percent Happier', description: 'Practical meditation guidance', connected: false, category: 'Mindfulness' },
          { name: 'Daily Stoic', description: 'Stoic philosophy and reflection', connected: true, category: 'Philosophy' },
          { name: 'Gratitude Journal', description: 'Daily gratitude practice', connected: false, category: 'Journaling' }
        ];
    }
  };

  const apps = getApps();

  return (
    <div>
      <div className="flex items-center space-x-3 mb-4">
        {getIcon()}
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-white flex items-center">
                    {app.name}
                    {app.connected && (
                      <Check className="h-4 w-4 text-green-400 ml-2" />
                    )}
                  </CardTitle>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {app.category}
                  </Badge>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-400 text-sm mb-4">{app.description}</p>
              <Button 
                variant={app.connected ? "outline" : "default"}
                size="sm"
                className={`w-full ${
                  app.connected 
                    ? 'border-green-500 text-green-400 hover:bg-green-500/10' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {app.connected ? 'Connected' : 'Connect'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
