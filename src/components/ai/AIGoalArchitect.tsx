
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
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-500">
            <Target className="h-5 w-5" />
            AI Goal Architect
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              What do you want to achieve? (Be as vague as you want!)
            </label>
            <Textarea
              placeholder="e.g., 'get in shape', 'learn something new', 'be more productive'..."
              value={vagueGoal}
              onChange={(e) => setVagueGoal(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Choose Your Persona
            </label>
            <div className="grid grid-cols-2 gap-2">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => setSelectedPersona(persona.id)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedPersona === persona.id
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

          <Button
            onClick={processGoalWithAI}
            disabled={!vagueGoal.trim() || isProcessing}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing with AI...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4 mr-2" />
                Transform to SMART Goal
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {smartGoal && (
        <Card className="bg-gray-900 border-green-500/50">
          <CardHeader>
            <CardTitle className="text-green-400">{smartGoal.title}</CardTitle>
            <Badge variant="outline" className="w-fit">{smartGoal.category}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">{smartGoal.description}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-1">🎯 Specific</h4>
                  <p className="text-sm text-gray-400">{smartGoal.specific}</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">📊 Measurable</h4>
                  <p className="text-sm text-gray-400">{smartGoal.measurable}</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">✅ Achievable</h4>
                  <p className="text-sm text-gray-400">{smartGoal.achievable}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-1">🎯 Relevant</h4>
                  <p className="text-sm text-gray-400">{smartGoal.relevant}</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">⏰ Time-bound</h4>
                  <p className="text-sm text-gray-400">{smartGoal.timeBound}</p>
                </div>
              </div>
            </div>

            {smartGoal.dependencies.length > 0 && (
              <div>
                <h4 className="font-medium text-white mb-2">🔗 Dependencies</h4>
                <div className="flex flex-wrap gap-2">
                  {smartGoal.dependencies.map((dep, index) => (
                    <Badge key={index} variant="secondary">{dep}</Badge>
                  ))}
                </div>
              </div>
            )}

            {smartGoal.milestones.length > 0 && (
              <div>
                <h4 className="font-medium text-white mb-2">🏆 Key Milestones</h4>
                <div className="space-y-2">
                  {smartGoal.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-green-500" />
                      <span className="text-green-400">Week {milestone.week}:</span>
                      <span className="text-gray-300">{milestone.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
