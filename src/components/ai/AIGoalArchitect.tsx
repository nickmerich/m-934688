import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Target, Lightbulb, Calendar, Trophy } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SmartGoal {
  title: string;
  description: string;
  category: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
  dependencies: string[];
  milestones: Array<{ week: number; description: string }>;
}

interface AIGoalArchitectProps {
  onGoalCreated?: (goal: SmartGoal) => void;
}

export function AIGoalArchitect({ onGoalCreated }: AIGoalArchitectProps) {
  const [vagueGoal, setVagueGoal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [smartGoal, setSmartGoal] = useState<SmartGoal | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string>('balanced');
  const { user } = useAuth();
  const { toast } = useToast();

  const personas = [
    { id: 'athlete_2_0', label: 'Athlete 2.0', description: 'Performance-focused, data-driven' },
    { id: 'rebuilder', label: 'Rebuilder', description: 'Starting fresh, building foundations' },
    { id: 'dreamer_gen_z', label: 'Dreamer Gen Z', description: 'Creative, tech-savvy, ambitious' },
    { id: 'balanced', label: 'Balanced', description: 'Well-rounded approach' }
  ];

  const processGoalWithAI = async () => {
    if (!vagueGoal.trim() || !user) return;

    setIsProcessing(true);
    try {
      // Call our AI Goal Processing edge function
      const { data, error } = await supabase.functions.invoke('process-goal-with-ai', {
        body: {
          vagueGoal: vagueGoal.trim(),
          persona: selectedPersona,
          userId: user.id
        }
      });

      if (error) throw error;

      const processedGoal = data.smartGoal;
      setSmartGoal(processedGoal);

      // Save to goals table
      const { error: saveError } = await supabase.from('goals').insert({
        user_id: user.id,
        title: processedGoal.title,
        description: processedGoal.description,
        category: processedGoal.category,
        progress: 0
      });

      if (saveError) throw saveError;

      toast({
        title: "AI Goal Created!",
        description: "Your vague idea has been transformed into a SMART goal."
      });

      if (onGoalCreated) {
        onGoalCreated(processedGoal);
      }

    } catch (error) {
      console.error('Error processing goal:', error);
      toast({
        title: "Error",
        description: "Failed to process your goal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="neo-card">
        <div className="flex items-center gap-2 mb-6">
          <Target className="h-6 w-6 text-black" />
          <h2 className="neo-text-big text-black">AI GOAL ARCHITECT</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block neo-text-small text-black mb-3">
              WHAT DO YOU WANT TO ACHIEVE?
            </label>
            <Textarea
              placeholder="e.g., 'get in shape', 'learn something new', 'be more productive'..."
              value={vagueGoal}
              onChange={(e) => setVagueGoal(e.target.value)}
              className="neo-border bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-0 rounded-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block neo-text-small text-black mb-3">
              CHOOSE YOUR PERSONA
            </label>
            <div className="grid grid-cols-2 gap-3">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => setSelectedPersona(persona.id)}
                  className={`p-4 border-4 border-black text-left transition-all ${
                    selectedPersona === persona.id
                      ? 'neo-card-green'
                      : 'neo-card hover:transform hover:translate-x-1 hover:translate-y-1'
                  }`}
                  style={{
                    boxShadow: selectedPersona === persona.id 
                      ? '4px 4px 0px #000000' 
                      : '2px 2px 0px #000000'
                  }}
                >
                  <div className="neo-text-small text-black">{persona.label}</div>
                  <div className="text-sm text-black mt-1">{persona.description}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={processGoalWithAI}
            disabled={!vagueGoal.trim() || isProcessing}
            className="neo-button-primary w-full flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                PROCESSING WITH AI...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4" />
                TRANSFORM TO SMART GOAL
              </>
            )}
          </button>
        </div>
      </div>

      {smartGoal && (
        <div className="neo-card-green">
          <div className="mb-4">
            <h3 className="neo-text-big text-black mb-2">{smartGoal.title}</h3>
            <div className="inline-block px-3 py-1 border-2 border-black bg-white">
              <span className="text-sm font-bold text-black uppercase">{smartGoal.category}</span>
            </div>
          </div>
          
          <p className="neo-text-small text-black mb-6">{smartGoal.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="neo-text-small text-black mb-2 flex items-center gap-2">
                  🎯 SPECIFIC
                </h4>
                <p className="text-sm text-black">{smartGoal.specific}</p>
              </div>
              <div>
                <h4 className="neo-text-small text-black mb-2 flex items-center gap-2">
                  📊 MEASURABLE
                </h4>
                <p className="text-sm text-black">{smartGoal.measurable}</p>
              </div>
              <div>
                <h4 className="neo-text-small text-black mb-2 flex items-center gap-2">
                  ✅ ACHIEVABLE
                </h4>
                <p className="text-sm text-black">{smartGoal.achievable}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="neo-text-small text-black mb-2 flex items-center gap-2">
                  🎯 RELEVANT
                </h4>
                <p className="text-sm text-black">{smartGoal.relevant}</p>
              </div>
              <div>
                <h4 className="neo-text-small text-black mb-2 flex items-center gap-2">
                  ⏰ TIME-BOUND
                </h4>
                <p className="text-sm text-black">{smartGoal.timeBound}</p>
              </div>
            </div>
          </div>

          {smartGoal.dependencies.length > 0 && (
            <div className="mt-6">
              <h4 className="neo-text-small text-black mb-3">🔗 DEPENDENCIES</h4>
              <div className="flex flex-wrap gap-2">
                {smartGoal.dependencies.map((dep, index) => (
                  <div key={index} className="inline-block px-3 py-1 border-2 border-black bg-white">
                    <span className="text-sm font-bold text-black">{dep}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {smartGoal.milestones.length > 0 && (
            <div className="mt-6">
              <h4 className="neo-text-small text-black mb-3">🏆 KEY MILESTONES</h4>
              <div className="space-y-3">
                {smartGoal.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border-2 border-black bg-white">
                    <Calendar className="h-4 w-4 text-black" />
                    <span className="neo-text-small text-black">WEEK {milestone.week}:</span>
                    <span className="text-sm text-black">{milestone.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
