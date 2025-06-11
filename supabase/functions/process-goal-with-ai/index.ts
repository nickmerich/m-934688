
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GoalProcessingRequest {
  vagueGoal: string;
  persona: string;
  userId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { vagueGoal, persona, userId }: GoalProcessingRequest = await req.json();

    if (!vagueGoal || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get matching templates
    const { data: templates } = await supabase
      .from('smart_goal_templates')
      .select('*')
      .eq('is_active', true)
      .contains('persona_type', [persona]);

    // Find best matching template
    let bestTemplate = null;
    const goalLower = vagueGoal.toLowerCase();
    
    for (const template of templates || []) {
      for (const example of template.vague_input_examples) {
        if (goalLower.includes(example.toLowerCase()) || 
            example.toLowerCase().includes(goalLower)) {
          bestTemplate = template;
          break;
        }
      }
      if (bestTemplate) break;
    }

    // Fallback to first template if no exact match
    if (!bestTemplate && templates && templates.length > 0) {
      bestTemplate = templates[0];
    }

    // Generate AI-powered SMART goal
    const openAIKey = Deno.env.get('OPENAI_API_KEY');
    let smartGoal;

    if (openAIKey && bestTemplate) {
      // Use OpenAI for sophisticated goal generation
      const prompt = `Transform this vague goal into a SMART goal using the template structure.

Vague Goal: "${vagueGoal}"
User Persona: ${persona}
Template: ${JSON.stringify(bestTemplate.smart_goal_structure)}
Dependencies: ${JSON.stringify(bestTemplate.dependency_patterns)}
Milestones: ${JSON.stringify(bestTemplate.milestone_templates)}

Create a specific, personalized SMART goal with:
1. A compelling title
2. Clear description
3. SMART breakdown (Specific, Measurable, Achievable, Relevant, Time-bound)
4. 3-5 key dependencies
5. 3-4 milestone checkpoints

Respond in JSON format:
{
  "title": "...",
  "description": "...",
  "category": "${bestTemplate.category}",
  "specific": "...",
  "measurable": "...",
  "achievable": "...",
  "relevant": "...",
  "timeBound": "...",
  "dependencies": ["...", "..."],
  "milestones": [{"week": 2, "description": "..."}, ...]
}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      const aiResult = await response.json();
      smartGoal = JSON.parse(aiResult.choices[0].message.content);
    } else {
      // Fallback: Use template-based generation
      smartGoal = {
        title: `${vagueGoal.charAt(0).toUpperCase() + vagueGoal.slice(1)} Goal`,
        description: `A structured approach to achieving: ${vagueGoal}`,
        category: bestTemplate?.category || 'Personal Development',
        specific: `Focus on ${vagueGoal} with clear daily actions`,
        measurable: 'Track progress with specific metrics and milestones',
        achievable: 'Start small and build momentum gradually',
        relevant: `Aligned with your ${persona} approach to personal growth`,
        timeBound: 'Complete within 8-12 weeks with weekly checkpoints',
        dependencies: ['Consistent daily practice', 'Regular progress tracking', 'Support system'],
        milestones: [
          { week: 2, description: 'Establish initial routine' },
          { week: 4, description: 'First measurable progress checkpoint' },
          { week: 8, description: 'Mid-point evaluation and adjustment' }
        ]
      };
    }

    // Save AI insight
    await supabase.from('ai_insights').insert({
      user_id: userId,
      insight_type: 'goal_recommendation',
      title: 'SMART Goal Created',
      description: `Transformed "${vagueGoal}" into structured goal: ${smartGoal.title}`,
      confidence_score: 0.85,
      action_required: true,
      priority: 'high',
      data_sources: ['ai_goal_architect', 'smart_goal_templates'],
      metadata: { original_goal: vagueGoal, persona: persona }
    });

    return new Response(
      JSON.stringify({ smartGoal }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error processing goal:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process goal' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
