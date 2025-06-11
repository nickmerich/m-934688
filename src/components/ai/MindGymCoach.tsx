
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Brain, MessageSquare, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CoachingSession {
  id: string;
  session_type: string;
  persona_used: string;
  ai_response: string;
  created_at: string;
  user_feedback?: number;
}

export function MindGymCoach() {
  const [sessions, setSessions] = useState<CoachingSession[]>([]);
  const [currentPersona, setCurrentPersona] = useState<string>('balanced');
  const [isLoading, setIsLoading] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  const personas = [
    { 
      id: 'stoic', 
      name: 'Stoic Mentor', 
      description: 'Disciplined, rational, focused on what you can control',
      icon: '🏛️'
    },
    { 
      id: 'hype', 
      name: 'Hype Coach', 
      description: 'Energetic, motivational, gets you pumped up',
      icon: '🔥'
    },
    { 
      id: 'mindfulness', 
      name: 'Mindfulness Guru', 
      description: 'Calm, present-focused, emphasizes awareness',
      icon: '🧘'
    },
    { 
      id: 'balanced', 
      name: 'Balanced Guide', 
      description: 'Well-rounded approach, adapts to your needs',
      icon: '⚖️'
    }
  ];

  useEffect(() => {
    fetchRecentSessions();
    getDailyNudge();
  }, [user]);

  const fetchRecentSessions = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('ai_coaching_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching sessions:', error);
      return;
    }

    setSessions(data || []);
  };

  const getDailyNudge = async () => {
    if (!user) return;

    // Check if user already got a daily nudge today
    const today = new Date().toISOString().split('T')[0];
    const { data: todayNudge } = await supabase
      .from('ai_coaching_sessions')
      .select('id')
      .eq('user_id', user.id)
      .eq('session_type', 'daily_nudge')
      .gte('created_at', today + 'T00:00:00')
      .maybeSingle();

    if (todayNudge) return; // Already got today's nudge

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-coaching-session', {
        body: {
          userId: user.id,
          sessionType: 'daily_nudge',
          persona: currentPersona
        }
      });

      if (error) throw error;

      if (data?.session) {
        setSessions(prev => [data.session, ...prev]);
      }
    } catch (error) {
      console.error('Error getting daily nudge:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startReflectionSession = async () => {
    if (!user || !reflectionText.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-coaching-session', {
        body: {
          userId: user.id,
          sessionType: 'reflection',
          persona: currentPersona,
          userInput: reflectionText.trim()
        }
      });

      if (error) throw error;

      if (data?.session) {
        setSessions(prev => [data.session, ...prev]);
        setReflectionText('');
        toast({
          title: "Reflection Session Complete",
          description: "Your AI coach has provided personalized insights."
        });
      }
    } catch (error) {
      console.error('Error starting reflection:', error);
      toast({
        title: "Error",
        description: "Failed to start reflection session.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getMotivation = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-coaching-session', {
        body: {
          userId: user.id,
          sessionType: 'motivation',
          persona: currentPersona
        }
      });

      if (error) throw error;

      if (data?.session) {
        setSessions(prev => [data.session, ...prev]);
      }
    } catch (error) {
      console.error('Error getting motivation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const provideFeedback = async (sessionId: string, rating: number) => {
    const { error } = await supabase
      .from('ai_coaching_sessions')
      .update({ user_feedback: rating })
      .eq('id', sessionId);

    if (!error) {
      setSessions(prev => 
        prev.map(session => 
          session.id === sessionId 
            ? { ...session, user_feedback: rating }
            : session
        )
      );
      toast({
        title: "Feedback Recorded",
        description: "Thank you! This helps improve your coaching experience."
      });
    }
  };

  const formatSessionType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Persona Selection */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-500">
            <Brain className="h-5 w-5" />
            Choose Your AI Coach Persona
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {personas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setCurrentPersona(persona.id)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  currentPersona === persona.id
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">{persona.icon}</div>
                <div className="font-medium text-white text-sm">{persona.name}</div>
                <div className="text-xs text-gray-400">{persona.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Reflection Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder="What's on your mind? Share your thoughts, challenges, or wins..."
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              rows={3}
            />
            <Button
              onClick={startReflectionSession}
              disabled={!reflectionText.trim() || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Reflection
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Boost</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={getMotivation}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Get Motivated!
            </Button>
            <p className="text-xs text-gray-400 mt-2">
              Get a personalized motivational message from your AI coach
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Coaching Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No coaching sessions yet. Start a reflection or get your daily nudge!
            </p>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{formatSessionType(session.session_type)}</Badge>
                    <span className="text-xs text-gray-400">
                      {new Date(session.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3">{session.ai_response}</p>
                  
                  {!session.user_feedback && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Was this helpful?</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => provideFeedback(session.id, 5)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => provideFeedback(session.id, 2)}
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
