
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, User, Bell, Brain } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserPreferences {
  ai_coach_persona: string;
  coaching_style: string;
  notification_preferences: {
    daily_nudges: boolean;
    mood_checkins: boolean;
    goal_reminders: boolean;
  };
  timezone: string;
}

export function UserPreferencesSetup() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    ai_coach_persona: 'balanced',
    coaching_style: 'supportive',
    notification_preferences: {
      daily_nudges: true,
      mood_checkins: true,
      goal_reminders: true,
    },
    timezone: 'UTC'
  });
  const [loading, setLoading] = useState(false);
  const [hasExistingPrefs, setHasExistingPrefs] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadUserPreferences();
    }
  }, [user]);

  const loadUserPreferences = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error loading preferences:', error);
      return;
    }

    if (data) {
      setPreferences({
        ai_coach_persona: data.ai_coach_persona || 'balanced',
        coaching_style: data.coaching_style || 'supportive',
        notification_preferences: data.notification_preferences || {
          daily_nudges: true,
          mood_checkins: true,
          goal_reminders: true,
        },
        timezone: data.timezone || 'UTC'
      });
      setHasExistingPrefs(true);
    }
  };

  const savePreferences = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ai_coach_persona: preferences.ai_coach_persona,
          coaching_style: preferences.coaching_style,
          notification_preferences: preferences.notification_preferences,
          timezone: preferences.timezone,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setHasExistingPrefs(true);
      toast({
        title: "Preferences Saved",
        description: "Your AI coaching preferences have been updated."
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateNotificationPreference = (key: keyof typeof preferences.notification_preferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notification_preferences: {
        ...prev.notification_preferences,
        [key]: value
      }
    }));
  };

  const personas = [
    { value: 'stoic', label: 'Stoic Mentor', description: 'Rational, disciplined, focused on control' },
    { value: 'hype', label: 'Hype Coach', description: 'Energetic, motivational, high-energy' },
    { value: 'mindfulness', label: 'Mindfulness Guru', description: 'Calm, present-focused, gentle' },
    { value: 'balanced', label: 'Balanced Guide', description: 'Adaptive, well-rounded approach' }
  ];

  const coachingStyles = [
    { value: 'supportive', label: 'Supportive', description: 'Encouraging and understanding' },
    { value: 'challenging', label: 'Challenging', description: 'Push you to your limits' },
    { value: 'analytical', label: 'Analytical', description: 'Data-driven and logical' },
    { value: 'motivational', label: 'Motivational', description: 'Inspiring and uplifting' }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-500">
          <Settings className="h-5 w-5" />
          AI Coaching Preferences
          {hasExistingPrefs && <Badge variant="outline">Configured</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Persona Selection */}
        <div>
          <Label className="text-white mb-3 block">
            <Brain className="h-4 w-4 inline mr-2" />
            Choose Your AI Coach Persona
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {personas.map((persona) => (
              <button
                key={persona.value}
                onClick={() => setPreferences(prev => ({ ...prev, ai_coach_persona: persona.value }))}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  preferences.ai_coach_persona === persona.value
                    ? 'border-green-500 bg-green-500/10 text-green-400'
                    : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
                }`}
              >
                <div className="font-medium">{persona.label}</div>
                <div className="text-xs opacity-70">{persona.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Coaching Style */}
        <div>
          <Label className="text-white mb-3 block">
            <User className="h-4 w-4 inline mr-2" />
            Coaching Style
          </Label>
          <Select 
            value={preferences.coaching_style} 
            onValueChange={(value) => setPreferences(prev => ({ ...prev, coaching_style: value }))}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {coachingStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  <div>
                    <div className="font-medium">{style.label}</div>
                    <div className="text-xs text-gray-400">{style.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Notification Preferences */}
        <div>
          <Label className="text-white mb-3 block">
            <Bell className="h-4 w-4 inline mr-2" />
            Notification Preferences
          </Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="daily-nudges" className="text-white">Daily Nudges</Label>
                <p className="text-xs text-gray-400">Get daily motivation from your AI coach</p>
              </div>
              <Switch
                id="daily-nudges"
                checked={preferences.notification_preferences.daily_nudges}
                onCheckedChange={(checked) => updateNotificationPreference('daily_nudges', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mood-checkins" className="text-white">Mood Check-ins</Label>
                <p className="text-xs text-gray-400">Reminders to log your emotional state</p>
              </div>
              <Switch
                id="mood-checkins"
                checked={preferences.notification_preferences.mood_checkins}
                onCheckedChange={(checked) => updateNotificationPreference('mood_checkins', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="goal-reminders" className="text-white">Goal Reminders</Label>
                <p className="text-xs text-gray-400">Get reminded about your goals and habits</p>
              </div>
              <Switch
                id="goal-reminders"
                checked={preferences.notification_preferences.goal_reminders}
                onCheckedChange={(checked) => updateNotificationPreference('goal_reminders', checked)}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={savePreferences}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </CardContent>
    </Card>
  );
}
