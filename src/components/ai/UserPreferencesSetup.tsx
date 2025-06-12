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

interface NotificationPreferences {
  daily_nudges: boolean;
  mood_checkins: boolean;
  goal_reminders: boolean;
}

interface UserPreferences {
  ai_coach_persona: string;
  coaching_style: string;
  notification_preferences: NotificationPreferences;
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
      // Type-safe parsing of notification_preferences
      const notificationPrefs = data.notification_preferences as any;
      const typedNotificationPrefs: NotificationPreferences = {
        daily_nudges: typeof notificationPrefs === 'object' && notificationPrefs?.daily_nudges === true,
        mood_checkins: typeof notificationPrefs === 'object' && notificationPrefs?.mood_checkins === true,
        goal_reminders: typeof notificationPrefs === 'object' && notificationPrefs?.goal_reminders === true,
      };

      setPreferences({
        ai_coach_persona: data.ai_coach_persona || 'balanced',
        coaching_style: data.coaching_style || 'supportive',
        notification_preferences: typedNotificationPrefs,
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
          notification_preferences: preferences.notification_preferences as any, // Cast to Json type
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

  const updateNotificationPreference = (key: keyof NotificationPreferences, value: boolean) => {
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
    <div className="neo-card">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-black border-4 border-black">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="neo-text-big text-black">AI COACHING PREFERENCES</h2>
            {hasExistingPrefs && (
              <div className="inline-block bg-green-500 border-2 border-black px-2 py-1 mt-1" style={{
                background: 'hsl(var(--neon-green))'
              }}>
                <span className="text-xs font-bold text-black">CONFIGURED</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* AI Persona Selection */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {personas.map((persona) => (
              <button
                key={persona.value}
                onClick={() => setPreferences(prev => ({ ...prev, ai_coach_persona: persona.value }))}
                className={`p-4 text-left transition-all ${
                  preferences.ai_coach_persona === persona.value
                    ? 'neo-card-green'
                    : 'neo-card hover:transform hover:translate-x-1 hover:translate-y-1'
                }`}
              >
                <div className="neo-text-medium text-black mb-1">{persona.label}</div>
                <div className="text-sm text-black">{persona.description}</div>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-black" />
            <h3 className="neo-text-medium text-black">CHOOSE YOUR AI COACH PERSONA</h3>
          </div>
        </div>

        {/* Coaching Style */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-black" />
            <h3 className="neo-text-medium text-black">COACHING STYLE</h3>
          </div>
          <div className="neo-card bg-white">
            <select 
              value={preferences.coaching_style} 
              onChange={(e) => setPreferences(prev => ({ ...prev, coaching_style: e.target.value }))}
              className="w-full p-3 border-4 border-black bg-white neo-text-medium text-black"
            >
              {coachingStyles.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label} - {style.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notification Preferences */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-black" />
            <h3 className="neo-text-medium text-black">NOTIFICATION PREFERENCES</h3>
          </div>
          <div className="space-y-4">
            <div className="neo-card flex items-center justify-between p-4">
              <div>
                <div className="neo-text-medium text-black">DAILY NUDGES</div>
                <div className="text-sm text-black">Get daily motivation from your AI coach</div>
              </div>
              <Switch
                checked={preferences.notification_preferences.daily_nudges}
                onCheckedChange={(checked) => updateNotificationPreference('daily_nudges', checked)}
              />
            </div>
            <div className="neo-card flex items-center justify-between p-4">
              <div>
                <div className="neo-text-medium text-black">MOOD CHECK-INS</div>
                <div className="text-sm text-black">Reminders to log your emotional state</div>
              </div>
              <Switch
                checked={preferences.notification_preferences.mood_checkins}
                onCheckedChange={(checked) => updateNotificationPreference('mood_checkins', checked)}
              />
            </div>
            <div className="neo-card flex items-center justify-between p-4">
              <div>
                <div className="neo-text-medium text-black">GOAL REMINDERS</div>
                <div className="text-sm text-black">Get reminded about your goals and habits</div>
              </div>
              <Switch
                checked={preferences.notification_preferences.goal_reminders}
                onCheckedChange={(checked) => updateNotificationPreference('goal_reminders', checked)}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={savePreferences}
          disabled={loading}
          className="neo-button-primary w-full text-xl py-4"
        >
          {loading ? 'SAVING...' : 'SAVE PREFERENCES'}
        </Button>
      </div>
    </div>
  );
}
