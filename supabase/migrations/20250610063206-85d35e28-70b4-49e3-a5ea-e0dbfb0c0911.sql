
-- Create habits table with comprehensive fields
CREATE TABLE public.habits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  frequency TEXT NOT NULL DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'custom')),
  frequency_data JSONB, -- Store custom frequency settings
  scheduled_days INTEGER[] DEFAULT ARRAY[1,2,3,4,5,6,7], -- 1=Monday, 7=Sunday
  scheduled_time TIME,
  reminder_enabled BOOLEAN DEFAULT false,
  reminder_time TIME,
  goal_id UUID REFERENCES public.goals(id) ON DELETE SET NULL,
  linked_habit_id UUID REFERENCES public.habits(id) ON DELETE SET NULL, -- For habit stacking
  reward_points INTEGER NOT NULL DEFAULT 10,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

-- Create policies for habits
CREATE POLICY "Users can view their own habits" 
  ON public.habits 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own habits" 
  ON public.habits 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits" 
  ON public.habits 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits" 
  ON public.habits 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create habit completions table for tracking
CREATE TABLE public.habit_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completion_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  UNIQUE(habit_id, completion_date)
);

-- Add Row Level Security for habit completions
ALTER TABLE public.habit_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own habit completions" 
  ON public.habit_completions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own habit completions" 
  ON public.habit_completions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habit completions" 
  ON public.habit_completions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habit completions" 
  ON public.habit_completions 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add indexes for better performance
CREATE INDEX idx_habits_user_id ON public.habits(user_id);
CREATE INDEX idx_habits_active ON public.habits(user_id, is_active);
CREATE INDEX idx_habit_completions_user_date ON public.habit_completions(user_id, completion_date);
CREATE INDEX idx_habit_completions_habit_date ON public.habit_completions(habit_id, completion_date);
