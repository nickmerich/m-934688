
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CoachingRequest {
  userId: string;
  sessionType: 'daily_nudge' | 'reflection' | 'goal_planning' | 'mood_support' | 'motivation';
  persona: string;
  userInput?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { userId, sessionType, persona, userInput }: CoachingRequest = await req.json();

    if (!userId || !sessionType || !persona) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user context
    const { data: goals } = await supabase
      .from('goals')
      .select('title, category, progress')
      .eq('user_id', userId)
      .limit(3);

    const { data: recentHabits } = await supabase
      .from('habit_completions')
      .select('habit:habits(name)')
      .eq('user_id', userId)
      .gte('completion_date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .limit(5);

    const { data: recentMood } = await supabase
      .from('emotional_checkins')
      .select('mood_score, energy_level, emotions_tags')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    // Define persona characteristics
    const personaPrompts = {
      stoic: "You are a wise Stoic mentor. Focus on what can be controlled, acceptance, and rational thinking. Use philosophical insights and practical wisdom. Be calm and measured.",
      hype: "You are an energetic hype coach! Get the user PUMPED UP and excited. Use enthusiasm, energy, and motivational language. Make them feel like they can conquer anything!",
      mindfulness: "You are a gentle mindfulness guide. Focus on present-moment awareness, self-compassion, and inner peace. Speak calmly and help them connect with their inner wisdom.",
      balanced: "You are a balanced, adaptive coach. Adjust your style based on what the user needs most. Be supportive, practical, and encouraging while staying authentic."
    };

    // Generate session-specific prompts
    let prompt = `${personaPrompts[persona as keyof typeof personaPrompts]}\n\n`;
    
    const contextInfo = `User Context:
- Goals: ${goals?.map(g => `${g.title} (${g.progress}% complete)`).join(', ') || 'None set'}
- Recent habits: ${recentHabits?.map(h => h.habit?.name).join(', ') || 'None tracked'}
- Recent mood: ${recentMood ? `${recentMood.mood_score}/10, energy ${recentMood.energy_level}/10` : 'Not tracked'}
`;

    switch (sessionType) {
      case 'daily_nudge':
        prompt += `${contextInfo}

Create a personalized daily nudge (2-3 sentences) that:
1. Acknowledges their recent progress or challenges
2. Provides specific, actionable encouragement
3. Connects to their goals or habits
4. Matches your persona style

Keep it concise but meaningful.`;
        break;

      case 'reflection':
        prompt += `${contextInfo}

The user shared: "${userInput}"

Provide a thoughtful reflection response (3-4 sentences) that:
1. Acknowledges their feelings and thoughts
2. Offers perspective or insight
3. Suggests a gentle next step or reframe
4. Stays true to your coaching persona`;
        break;

      case 'motivation':
        prompt += `${contextInfo}

Create an energizing motivational message (3-4 sentences) that:
1. Reminds them of their strength and capability
2. Connects to their specific goals and progress
3. Provides concrete inspiration for today
4. Embodies your persona's motivational style`;
        break;

      case 'mood_support':
        prompt += `${contextInfo}

The user seems to need emotional support. Provide a caring response (3-4 sentences) that:
1. Validates their current emotional state
2. Offers comfort and perspective
3. Suggests a small, manageable step forward
4. Maintains your persona while being compassionate`;
        break;

      default:
        prompt += `Provide general coaching guidance based on the user's context.`;
    }

    let aiResponse = '';
    const openAIKey = Deno.env.get('OPENAI_API_KEY');

    if (openAIKey) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.8,
          max_tokens: 300,
        }),
      });

      const result = await response.json();
      aiResponse = result.choices[0].message.content.trim();
    } else {
      // Fallback responses based on persona and session type
      const fallbacks = {
        stoic: {
          daily_nudge: "Remember, you have power over your mind - not outside events. Focus on your actions today, they are within your control.",
          motivation: "Every small step you take builds the fortress of your character. Your consistency today shapes your tomorrow.",
          reflection: "What happened is in the past. What matters now is how you choose to respond and move forward with wisdom."
        },
        hype: {
          daily_nudge: "YES! Today is YOUR day to SHINE! You've got goals to crush and habits to build - let's GO!",
          motivation: "You are UNSTOPPABLE! Every goal you're working on is getting closer - keep that momentum rolling!",
          reflection: "I hear you, and you know what? That takes COURAGE to share! Now let's channel that energy into ACTION!"
        },
        mindfulness: {
          daily_nudge: "Take a moment to breathe and appreciate how far you've come. Each mindful step today brings you closer to your goals.",
          motivation: "You have everything you need within you right now. Trust your journey and take one mindful step forward.",
          reflection: "Thank you for sharing your heart. Remember to be gentle with yourself as you navigate this moment."
        },
        balanced: {
          daily_nudge: "You're making steady progress on your journey. Consider what small action today would feel most meaningful to you.",
          motivation: "Your commitment to growth is inspiring. Focus on one thing today that aligns with your values and goals.",
          reflection: "I appreciate you sharing this with me. What feels like a helpful next step from where you are right now?"
        }
      };

      aiResponse = fallbacks[persona as keyof typeof fallbacks]?.[sessionType as keyof typeof fallbacks.balanced] || 
                   "Thank you for connecting with your AI coach today. Remember, every small step counts toward your bigger goals.";
    }

    // Save the coaching session
    const { data: session, error } = await supabase
      .from('ai_coaching_sessions')
      .insert({
        user_id: userId,
        session_type: sessionType,
        persona_used: persona,
        prompt_given: prompt,
        ai_response: aiResponse,
        context_data: {
          goals: goals?.length || 0,
          recent_habits: recentHabits?.length || 0,
          user_input: userInput || null,
          mood_context: recentMood || null
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving session:', error);
      throw error;
    }

    return new Response(
      JSON.stringify({ session }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error generating coaching session:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate coaching session' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
