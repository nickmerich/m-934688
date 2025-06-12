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
      <div className="neo-card">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-black" />
            <h2 className="neo-text-big text-black">MIND GYM COACH</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {personas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => setCurrentPersona(persona.id)}
              className={`p-4 border-4 border-black text-left transition-all ${
                currentPersona === persona.id
                  ? 'neo-card-green'
                  : 'neo-card hover:transform hover:translate-x-1 hover:translate-y-1'
              }`}
              style={{
                boxShadow: currentPersona === persona.id 
                  ? '4px 4px 0px #000000' 
                  : '2px 2px 0px #000000'
              }}
            >
              <div className="text-2xl mb-2">{persona.icon}</div>
              <div className="neo-text-small text-black mb-1">{persona.name}</div>
              <div className="text-sm text-black">{persona.description}</div>
            </button>
          ))}
        </div>
        <h3 className="neo-text-medium text-black text-center">CHOOSE YOUR AI COACH PERSONA</h3>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="neo-card">
          <div className="mb-4">
            <h3 className="neo-text-big text-black">REFLECTION SESSION</h3>
          </div>
          <div className="space-y-4">
            <Textarea
              placeholder="What's on your mind? Share your thoughts, challenges, or wins..."
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              className="neo-border bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-0 rounded-none"
              rows={3}
            />
            <button
              onClick={startReflectionSession}
              disabled={!reflectionText.trim() || isLoading}
              className="neo-button-primary w-full flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              START REFLECTION
            </button>
          </div>
        </div>

        <div className="neo-card">
          <div className="mb-4">
            <h3 className="neo-text-big text-black">QUICK BOOST</h3>
          </div>
          <div className="space-y-4">
            <button
              onClick={getMotivation}
              disabled={isLoading}
              className="neo-button-primary w-full flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              GET MOTIVATED!
            </button>
            <p className="neo-text-small text-black">
              GET A PERSONALIZED MOTIVATIONAL MESSAGE FROM YOUR AI COACH
            </p>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="neo-card">
        <div className="mb-6">
          <h2 className="neo-text-big text-black">RECENT COACHING SESSIONS</h2>
        </div>
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <p className="neo-text-medium text-black">
              NO COACHING SESSIONS YET. START A REFLECTION OR GET YOUR DAILY NUDGE!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="neo-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-block px-3 py-1 border-2 border-black bg-white">
                    <span className="text-sm font-bold text-black uppercase">{formatSessionType(session.session_type)}</span>
                  </div>
                  <span className="neo-text-small text-black">
                    {new Date(session.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="neo-text-medium text-black mb-4">{session.ai_response}</p>
                
                {!session.user_feedback && (
                  <div className="flex items-center gap-3">
                    <span className="neo-text-small text-black">WAS THIS HELPFUL?</span>
                    <button
                      onClick={() => provideFeedback(session.id, 5)}
                      className="neo-button flex items-center gap-2"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => provideFeedback(session.id, 2)}
                      className="neo-button flex items-center gap-2"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
