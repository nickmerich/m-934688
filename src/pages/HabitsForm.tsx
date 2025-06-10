
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Calendar, Clock, Target, Link, Save } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const habitSchema = z.object({
  name: z.string().min(1, 'Habit name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  frequency: z.enum(['daily', 'weekly', 'custom']),
  scheduledDays: z.array(z.number()).min(1, 'Select at least one day'),
  scheduledTime: z.string().optional(),
  reminderEnabled: z.boolean().default(false),
  reminderTime: z.string().optional(),
  goalId: z.string().optional(),
  linkedHabitId: z.string().optional(),
});

type HabitFormData = z.infer<typeof habitSchema>;

const CATEGORIES = [
  'Health', 'Fitness', 'Mindfulness', 'Learning', 'Productivity', 
  'Relationships', 'Finance', 'Creativity', 'Career', 'Personal Development'
];

const DAYS_OF_WEEK = [
  { id: 1, name: 'Monday', short: 'M' },
  { id: 2, name: 'Tuesday', short: 'T' },
  { id: 3, name: 'Wednesday', short: 'W' },
  { id: 4, name: 'Thursday', short: 'T' },
  { id: 5, name: 'Friday', short: 'F' },
  { id: 6, name: 'Saturday', short: 'S' },
  { id: 7, name: 'Sunday', short: 'S' },
];

const HabitsForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [goals, setGoals] = useState<any[]>([]);
  const [existingHabits, setExistingHabits] = useState<any[]>([]);

  const form = useForm<HabitFormData>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      difficulty: 'Easy',
      frequency: 'daily',
      scheduledDays: [1, 2, 3, 4, 5, 6, 7],
      scheduledTime: '',
      reminderEnabled: false,
      reminderTime: '',
      goalId: '',
      linkedHabitId: '',
    },
  });

  useEffect(() => {
    fetchGoals();
    fetchExistingHabits();
  }, []);

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('id, title, category')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const fetchExistingHabits = async () => {
    try {
      const { data, error } = await supabase
        .from('habits')
        .select('id, name, category')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExistingHabits(data || []);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const calculateRewardPoints = (difficulty: string, frequency: string) => {
    const basePoints = {
      'Easy': 10,
      'Medium': 20,
      'Hard': 30
    };
    
    const frequencyMultiplier = {
      'daily': 1,
      'weekly': 0.7,
      'custom': 0.8
    };

    return Math.round(basePoints[difficulty as keyof typeof basePoints] * frequencyMultiplier[frequency as keyof typeof frequencyMultiplier]);
  };

  const onSubmit = async (data: HabitFormData) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const rewardPoints = calculateRewardPoints(data.difficulty, data.frequency);

      const habitData = {
        user_id: user.id,
        name: data.name,
        description: data.description || null,
        category: data.category,
        difficulty: data.difficulty,
        frequency: data.frequency,
        scheduled_days: data.scheduledDays,
        scheduled_time: data.scheduledTime || null,
        reminder_enabled: data.reminderEnabled,
        reminder_time: data.reminderTime || null,
        goal_id: data.goalId || null,
        linked_habit_id: data.linkedHabitId || null,
        reward_points: rewardPoints,
      };

      const { error } = await supabase
        .from('habits')
        .insert([habitData]);

      if (error) throw error;

      toast({
        title: "Habit Created Successfully!",
        description: `${data.name} has been added to your habits.`,
      });

      navigate('/habits');
    } catch (error) {
      console.error('Error creating habit:', error);
      toast({
        title: "Error",
        description: "Failed to create habit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAndAddAnother = async (data: HabitFormData) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-white no-gradients">
      {/* Navigation */}
      <nav className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex h-20 items-center justify-between">
            <Button
              onClick={() => navigate('/habits')}
              className="neo-button flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>BACK TO HABITS</span>
            </Button>

            <div className="neo-card-green inline-block">
              <span className="neo-text-medium text-black">📝 CREATE NEW HABIT</span>
            </div>

            <div></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="bg-white py-12 no-gradients">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <div className="text-center space-y-8 mb-12">
            <h1 className="neo-text-huge text-black">
              BUILD A NEW
              <span className="block" style={{ color: 'hsl(var(--neon-green))' }}>
                HABIT
              </span>
            </h1>
            <p className="neo-text-medium text-black max-w-2xl mx-auto">
              CREATE A POWERFUL HABIT THAT WILL HELP YOU ACHIEVE YOUR GOALS AND TRANSFORM YOUR LIFE
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="neo-card p-8">
                <h2 className="neo-text-big text-black mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-3" />
                  BASIC INFORMATION
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="neo-text-medium text-black">HABIT NAME</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g., Morning Meditation, Daily Exercise"
                            className="neo-border p-4 text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="neo-text-medium text-black">CATEGORY</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="neo-border p-4 text-lg">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="neo-text-medium text-black">DIFFICULTY</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="neo-border p-4 text-lg">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Easy">Easy (+{calculateRewardPoints('Easy', form.watch('frequency'))} Wins)</SelectItem>
                            <SelectItem value="Medium">Medium (+{calculateRewardPoints('Medium', form.watch('frequency'))} Wins)</SelectItem>
                            <SelectItem value="Hard">Hard (+{calculateRewardPoints('Hard', form.watch('frequency'))} Wins)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="neo-text-medium text-black">DESCRIPTION (OPTIONAL)</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Describe your habit and why it's important to you..."
                            className="neo-border p-4 min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="neo-card p-8">
                <h2 className="neo-text-big text-black mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-3" />
                  SCHEDULING
                </h2>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="neo-text-medium text-black">FREQUENCY</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="neo-border p-4 text-lg">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scheduledDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="neo-text-medium text-black">SCHEDULED DAYS</FormLabel>
                        <div className="grid grid-cols-7 gap-2 mt-3">
                          {DAYS_OF_WEEK.map((day) => (
                            <div key={day.id} className="text-center">
                              <Checkbox
                                checked={field.value.includes(day.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, day.id]);
                                  } else {
                                    field.onChange(field.value.filter((d) => d !== day.id));
                                  }
                                }}
                                className="neo-border"
                              />
                              <div className="neo-text-medium text-black mt-2">{day.short}</div>
                              <div className="text-sm text-gray-600">{day.name}</div>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scheduledTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="neo-text-medium text-black">PREFERRED TIME (OPTIONAL)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="time"
                            className="neo-border p-4 text-lg"
                          />
                        </FormControl>
                        <FormDescription>
                          Set a preferred time to build consistency
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="neo-card p-8">
                <h2 className="neo-text-big text-black mb-6 flex items-center">
                  <Clock className="h-6 w-6 mr-3" />
                  REMINDERS
                </h2>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="reminderEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="neo-border"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="neo-text-medium text-black">
                            ENABLE DAILY REMINDERS
                          </FormLabel>
                          <FormDescription>
                            Get notified when it's time to complete your habit
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch('reminderEnabled') && (
                    <FormField
                      control={form.control}
                      name="reminderTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="neo-text-medium text-black">REMINDER TIME</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="time"
                              className="neo-border p-4 text-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="neo-card p-8">
                <h2 className="neo-text-big text-black mb-6 flex items-center">
                  <Link className="h-6 w-6 mr-3" />
                  CONNECTIONS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="goalId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="neo-text-medium text-black">LINK TO GOAL (OPTIONAL)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="neo-border p-4 text-lg">
                              <SelectValue placeholder="Select a goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {goals.map((goal) => (
                              <SelectItem key={goal.id} value={goal.id}>
                                {goal.title} ({goal.category})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Connect this habit to one of your goals
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedHabitId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="neo-text-medium text-black">HABIT STACK (OPTIONAL)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="neo-border p-4 text-lg">
                              <SelectValue placeholder="Link to existing habit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {existingHabits.map((habit) => (
                              <SelectItem key={habit.id} value={habit.id}>
                                {habit.name} ({habit.category})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Stack this habit after an existing one
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="neo-button-primary text-xl px-12 py-6"
                >
                  <Save className="h-5 w-5 mr-2" />
                  {isLoading ? 'CREATING...' : 'CREATE HABIT'}
                </Button>
                <Button
                  type="button"
                  onClick={form.handleSubmit(handleSaveAndAddAnother)}
                  disabled={isLoading}
                  className="neo-button text-xl px-12 py-6"
                >
                  SAVE & ADD ANOTHER
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default HabitsForm;
