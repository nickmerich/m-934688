
-- Create enhanced user preferences table for AI personas and settings
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ai_coach_persona TEXT DEFAULT 'balanced' CHECK (ai_coach_persona IN ('stoic', 'hype', 'mindfulness', 'balanced')),
  notification_preferences JSONB DEFAULT '{"daily_nudges": true, "mood_checkins": true, "goal_reminders": true}',
  coaching_style TEXT DEFAULT 'supportive' CHECK (coaching_style IN ('supportive', 'challenging', 'analytical', 'motivational')),
  timezone TEXT DEFAULT 'UTC',
  energy_patterns JSONB DEFAULT '{}', -- Store user's energy patterns throughout the day
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create AI coaching sessions table for MindGym Coach
CREATE TABLE public.ai_coaching_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL CHECK (session_type IN ('daily_nudge', 'reflection', 'goal_planning', 'mood_support', 'motivation')),
  persona_used TEXT NOT NULL,
  prompt_given TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  user_feedback INTEGER CHECK (user_feedback >= 1 AND user_feedback <= 5), -- 1-5 rating
  context_data JSONB DEFAULT '{}', -- Mood, goals, recent activity context
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create social accountability pods table
CREATE TABLE public.social_pods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  pod_type TEXT DEFAULT 'accountability' CHECK (pod_type IN ('accountability', 'challenge', 'support')),
  max_members INTEGER DEFAULT 8 CHECK (max_members >= 2 AND max_members <= 20),
  current_members INTEGER DEFAULT 0,
  matching_criteria JSONB DEFAULT '{}', -- Goals, personality traits, schedule availability
  ai_moderator_enabled BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pod memberships table
CREATE TABLE public.pod_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pod_id UUID NOT NULL REFERENCES public.social_pods(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
  engagement_score INTEGER DEFAULT 0 CHECK (engagement_score >= 0 AND engagement_score <= 100),
  UNIQUE(pod_id, user_id)
);

-- Create context data table for adaptive scheduling
CREATE TABLE public.context_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data_type TEXT NOT NULL CHECK (data_type IN ('calendar', 'location', 'mood', 'energy', 'health', 'weather')),
  data_source TEXT NOT NULL, -- 'google_calendar', 'apple_health', 'manual', etc.
  raw_data JSONB NOT NULL,
  processed_insights JSONB DEFAULT '{}',
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE -- For temporary data like location
);

-- Create AI insights table for storing recommendations and predictions
CREATE TABLE public.ai_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL CHECK (insight_type IN ('goal_recommendation', 'schedule_optimization', 'habit_suggestion', 'burnout_warning', 'performance_forecast')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  confidence_score NUMERIC(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  action_required BOOLEAN DEFAULT false,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  data_sources TEXT[] DEFAULT '{}', -- Which data sources contributed to this insight
  metadata JSONB DEFAULT '{}',
  is_viewed BOOLEAN DEFAULT false,
  is_acted_upon BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create integration configurations table
CREATE TABLE public.integration_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  integration_type TEXT NOT NULL CHECK (integration_type IN ('google_calendar', 'apple_calendar', 'healthkit', 'oura', 'strava', 'notion', 'reclaim')),
  is_active BOOLEAN DEFAULT true,
  access_token TEXT, -- Encrypted
  refresh_token TEXT, -- Encrypted
  token_expires_at TIMESTAMP WITH TIME ZONE,
  sync_frequency TEXT DEFAULT 'hourly' CHECK (sync_frequency IN ('realtime', 'hourly', 'daily', 'weekly')),
  sync_settings JSONB DEFAULT '{}',
  last_sync_at TIMESTAMP WITH TIME ZONE,
  last_sync_status TEXT DEFAULT 'pending' CHECK (last_sync_status IN ('pending', 'success', 'error', 'rate_limited')),
  error_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, integration_type)
);

-- Create enhanced emotional checkins table for EmoGPT
CREATE TABLE public.emotional_checkins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood_score INTEGER NOT NULL CHECK (mood_score >= 1 AND mood_score <= 10),
  energy_level INTEGER NOT NULL CHECK (energy_level >= 1 AND energy_level <= 10),
  stress_level INTEGER NOT NULL CHECK (stress_level >= 1 AND stress_level <= 10),
  confidence_level INTEGER CHECK (confidence_level >= 1 AND confidence_level <= 10),
  motivation_level INTEGER CHECK (motivation_level >= 1 AND motivation_level <= 10),
  emotions_tags TEXT[] DEFAULT '{}', -- happy, anxious, excited, overwhelmed, etc.
  journal_entry TEXT,
  ai_analysis JSONB DEFAULT '{}', -- Sentiment analysis, patterns, recommendations
  trigger_events TEXT[] DEFAULT '{}', -- What caused this emotional state
  coping_strategies_used TEXT[] DEFAULT '{}',
  goals_affected UUID[] DEFAULT '{}', -- Which goals were impacted by this emotional state
  checkin_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create performance forecasts table
CREATE TABLE public.performance_forecasts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_id UUID REFERENCES public.goals(id) ON DELETE CASCADE,
  habit_id UUID REFERENCES public.habits(id) ON DELETE CASCADE,
  forecast_type TEXT NOT NULL CHECK (forecast_type IN ('success_probability', 'completion_date', 'burnout_risk', 'optimal_schedule')),
  prediction_value JSONB NOT NULL, -- Flexible field for different prediction types
  confidence_score NUMERIC(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  data_points_used INTEGER NOT NULL,
  model_version TEXT DEFAULT 'v1',
  factors_analyzed TEXT[] DEFAULT '{}',
  forecast_date DATE NOT NULL DEFAULT CURRENT_DATE,
  valid_until DATE,
  actual_outcome JSONB, -- To track prediction accuracy
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create smart goal templates table for AI Goal Architect
CREATE TABLE public.smart_goal_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_name TEXT NOT NULL,
  category TEXT NOT NULL,
  persona_type TEXT[] DEFAULT '{}', -- athlete_2_0, rebuilder, dreamer_gen_z
  vague_input_examples TEXT[] NOT NULL,
  smart_goal_structure JSONB NOT NULL,
  dependency_patterns JSONB DEFAULT '{}',
  milestone_templates JSONB DEFAULT '{}',
  success_metrics JSONB DEFAULT '{}',
  estimated_duration_weeks INTEGER,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  is_active BOOLEAN DEFAULT true,
  usage_count INTEGER DEFAULT 0,
  success_rate NUMERIC(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security for all new tables
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_coaching_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_pods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pod_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.context_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emotional_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smart_goal_templates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_preferences
CREATE POLICY "Users can view their own preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own preferences" ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own preferences" ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own preferences" ON public.user_preferences FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for ai_coaching_sessions
CREATE POLICY "Users can view their own coaching sessions" ON public.ai_coaching_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own coaching sessions" ON public.ai_coaching_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own coaching sessions" ON public.ai_coaching_sessions FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for social_pods
CREATE POLICY "Users can view pods they're members of" ON public.social_pods FOR SELECT USING (
  id IN (SELECT pod_id FROM public.pod_memberships WHERE user_id = auth.uid())
  OR created_by = auth.uid()
  OR is_active = true -- Allow viewing active pods for discovery
);
CREATE POLICY "Users can create pods" ON public.social_pods FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Pod creators can update their pods" ON public.social_pods FOR UPDATE USING (auth.uid() = created_by);

-- Create RLS policies for pod_memberships
CREATE POLICY "Users can view memberships for pods they're in" ON public.pod_memberships FOR SELECT USING (
  user_id = auth.uid() OR 
  pod_id IN (SELECT pod_id FROM public.pod_memberships WHERE user_id = auth.uid())
);
CREATE POLICY "Users can join pods" ON public.pod_memberships FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own memberships" ON public.pod_memberships FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can leave pods" ON public.pod_memberships FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for context_data
CREATE POLICY "Users can view their own context data" ON public.context_data FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own context data" ON public.context_data FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own context data" ON public.context_data FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own context data" ON public.context_data FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for ai_insights
CREATE POLICY "Users can view their own insights" ON public.ai_insights FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own insights" ON public.ai_insights FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own insights" ON public.ai_insights FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own insights" ON public.ai_insights FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for integration_configs
CREATE POLICY "Users can view their own integrations" ON public.integration_configs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own integrations" ON public.integration_configs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own integrations" ON public.integration_configs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own integrations" ON public.integration_configs FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for emotional_checkins
CREATE POLICY "Users can view their own checkins" ON public.emotional_checkins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own checkins" ON public.emotional_checkins FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own checkins" ON public.emotional_checkins FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own checkins" ON public.emotional_checkins FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for performance_forecasts
CREATE POLICY "Users can view their own forecasts" ON public.performance_forecasts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own forecasts" ON public.performance_forecasts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own forecasts" ON public.performance_forecasts FOR UPDATE USING (auth.uid() = user_id);

-- Smart goal templates are public for all users to view
CREATE POLICY "All users can view smart goal templates" ON public.smart_goal_templates FOR SELECT USING (is_active = true);

-- Create indexes for better performance
CREATE INDEX idx_user_preferences_user_id ON public.user_preferences(user_id);
CREATE INDEX idx_ai_coaching_sessions_user_id ON public.ai_coaching_sessions(user_id);
CREATE INDEX idx_ai_coaching_sessions_created_at ON public.ai_coaching_sessions(created_at DESC);
CREATE INDEX idx_social_pods_active ON public.social_pods(is_active, created_at DESC);
CREATE INDEX idx_pod_memberships_user_id ON public.pod_memberships(user_id);
CREATE INDEX idx_pod_memberships_pod_id ON public.pod_memberships(pod_id);
CREATE INDEX idx_context_data_user_id_type ON public.context_data(user_id, data_type);
CREATE INDEX idx_context_data_recorded_at ON public.context_data(recorded_at DESC);
CREATE INDEX idx_ai_insights_user_id_priority ON public.ai_insights(user_id, priority, created_at DESC);
CREATE INDEX idx_integration_configs_user_id ON public.integration_configs(user_id);
CREATE INDEX idx_emotional_checkins_user_date ON public.emotional_checkins(user_id, checkin_date DESC);
CREATE INDEX idx_performance_forecasts_user_goal ON public.performance_forecasts(user_id, goal_id);
CREATE INDEX idx_smart_goal_templates_category ON public.smart_goal_templates(category, is_active);

-- Insert some initial smart goal templates
INSERT INTO public.smart_goal_templates (template_name, category, persona_type, vague_input_examples, smart_goal_structure, dependency_patterns, milestone_templates, difficulty_level) VALUES
('Fitness Foundation', 'Health', ARRAY['rebuilder', 'athlete_2_0'], 
 ARRAY['get in shape', 'be healthier', 'lose weight', 'get fit'], 
 '{"specific": "Exercise {frequency} times per week for {duration} minutes", "measurable": "Track workouts and progress metrics", "achievable": "Start with bodyweight exercises", "relevant": "Improve overall health and energy", "time_bound": "{timeframe} weeks"}',
 '{"sleep": "7-8 hours per night", "hydration": "2-3 liters water daily", "nutrition": "Balanced meals with protein"}',
 '{"week_2": "Complete 2 full workouts", "week_4": "Increase duration by 5 minutes", "week_8": "Complete fitness assessment"}',
 'beginner'),

('Learning Sprint', 'Learning', ARRAY['dreamer_gen_z', 'rebuilder'], 
 ARRAY['learn something new', 'get better at', 'master a skill'], 
 '{"specific": "Dedicate {duration} minutes daily to learning {skill}", "measurable": "Complete {milestone_count} milestones", "achievable": "Break into small daily sessions", "relevant": "Advance career/personal growth", "time_bound": "{timeframe} weeks"}',
 '{"consistency": "Same time each day", "resources": "Quality learning materials", "practice": "Apply knowledge regularly"}',
 '{"week_1": "Complete basics module", "week_3": "Build first project", "week_6": "Demonstrate proficiency"}',
 'intermediate'),

('Mindfulness Journey', 'Mental Health', ARRAY['rebuilder', 'dreamer_gen_z'], 
 ARRAY['be more mindful', 'reduce stress', 'meditate more', 'find inner peace'], 
 '{"specific": "Practice mindfulness meditation for {duration} minutes daily", "measurable": "Track meditation sessions and mood", "achievable": "Start with guided meditations", "relevant": "Improve mental wellbeing", "time_bound": "{timeframe} weeks"}',
 '{"environment": "Quiet, consistent space", "routine": "Same time daily", "apps": "Meditation app access"}',
 '{"week_1": "7 consecutive days", "week_3": "Increase session length", "week_6": "Practice without guidance"}',
 'beginner');
