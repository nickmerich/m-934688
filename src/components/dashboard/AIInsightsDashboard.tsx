
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Calendar,
  Lightbulb,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface AIInsight {
  id: string;
  insight_type: string;
  title: string;
  description: string;
  confidence_score: number;
  priority: string;
  action_required: boolean;
  is_viewed: boolean;
  is_acted_upon?: boolean;
  created_at: string;
  metadata: any;
}

interface PerformanceForecast {
  id: string;
  forecast_type: string;
  prediction_value: any;
  confidence_score: number;
  goal_id?: string;
  habit_id?: string;
}

export function AIInsightsDashboard() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [forecasts, setForecasts] = useState<PerformanceForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchInsights();
      fetchForecasts();
    }
  }, [user]);

  const fetchInsights = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('user_id', user.id)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching insights:', error);
      return;
    }

    setInsights(data || []);
  };

  const fetchForecasts = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('performance_forecasts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching forecasts:', error);
      return;
    }

    setForecasts(data || []);
    setLoading(false);
  };

  const markInsightAsViewed = async (insightId: string) => {
    await supabase
      .from('ai_insights')
      .update({ is_viewed: true })
      .eq('id', insightId);

    setInsights(prev => 
      prev.map(insight => 
        insight.id === insightId 
          ? { ...insight, is_viewed: true }
          : insight
      )
    );
  };

  const markInsightAsActioned = async (insightId: string) => {
    await supabase
      .from('ai_insights')
      .update({ is_acted_upon: true })
      .eq('id', insightId);

    setInsights(prev => 
      prev.map(insight => 
        insight.id === insightId 
          ? { ...insight, is_acted_upon: true }
          : insight
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'neo-card-green';
      default: return 'neo-card-grey';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'goal_recommendation': return <Target className="h-4 w-4" />;
      case 'schedule_optimization': return <Calendar className="h-4 w-4" />;
      case 'habit_suggestion': return <Zap className="h-4 w-4" />;
      case 'burnout_warning': return <AlertTriangle className="h-4 w-4" />;
      case 'performance_forecast': return <TrendingUp className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const formatInsightType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="neo-card text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
        <p className="neo-text-medium text-black mt-4">LOADING AI INSIGHTS...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="neo-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-black" />
            <h2 className="neo-text-big text-black">AI COMMAND CENTER</h2>
          </div>
          <div className="inline-block px-3 py-1 border-2 border-black" style={{
            background: 'hsl(var(--neon-green))',
            boxShadow: '2px 2px 0px #000000'
          }}>
            <span className="text-sm font-bold text-black">
              {insights.filter(i => !i.is_viewed).length} NEW INSIGHTS
            </span>
          </div>
        </div>
      </div>

      {/* High Priority Alerts */}
      {insights.filter(i => i.priority === 'urgent' || i.priority === 'high').length > 0 && (
        <div className="neo-card">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="neo-text-medium text-red-500">PRIORITY ACTIONS REQUIRED</h3>
          </div>
          <div className="space-y-3">
            {insights
              .filter(i => (i.priority === 'urgent' || i.priority === 'high') && !i.is_acted_upon)
              .slice(0, 3)
              .map(insight => (
                <div key={insight.id} className="neo-card-grey">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-red-500">
                        {getInsightIcon(insight.insight_type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="neo-text-small text-white mb-2">{insight.title}</h4>
                        <p className="text-sm text-white mb-3">{insight.description}</p>
                        <div className="flex items-center gap-2">
                          <div className={`inline-block px-2 py-1 border-2 border-black ${getPriorityColor(insight.priority)}`}>
                            <span className="text-xs font-bold text-black">{insight.priority.toUpperCase()}</span>
                          </div>
                          <span className="text-xs text-white">
                            CONFIDENCE: {Math.round(insight.confidence_score * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => markInsightAsActioned(insight.id)}
                      className="neo-button-primary text-xs px-3 py-2 ml-4"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      DONE
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Performance Forecasts */}
      {forecasts.length > 0 && (
        <div className="neo-card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5" style={{ color: 'hsl(var(--neon-green))' }} />
            <h3 className="neo-text-medium text-black">PERFORMANCE FORECASTS</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {forecasts.slice(0, 4).map(forecast => (
              <div key={forecast.id} className="neo-card-green">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="neo-text-small text-black capitalize">
                    {forecast.forecast_type.replace('_', ' ')}
                  </h4>
                  <div className="inline-block px-2 py-1 border-2 border-black bg-white">
                    <span className="text-xs font-bold text-black">
                      {Math.round(forecast.confidence_score * 100)}% CONFIDENT
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {forecast.forecast_type === 'success_probability' && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-black">SUCCESS LIKELIHOOD</span>
                        <span className="font-bold text-black">
                          {Math.round(forecast.prediction_value.probability * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-black h-3 border-2 border-black">
                        <div 
                          className="h-full bg-white transition-all duration-300" 
                          style={{ width: `${forecast.prediction_value.probability * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {forecast.forecast_type === 'burnout_risk' && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-black">BURNOUT RISK</span>
                        <span className={`font-bold ${
                          forecast.prediction_value.risk_level === 'high' ? 'text-red-500' :
                          forecast.prediction_value.risk_level === 'medium' ? 'text-yellow-500' :
                          'text-black'
                        }`}>
                          {forecast.prediction_value.risk_level.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Insights */}
      <div className="neo-card">
        <h3 className="neo-text-medium text-black mb-4">RECENT AI INSIGHTS</h3>
        {insights.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-black mx-auto mb-4" />
            <p className="neo-text-medium text-black mb-2">NO AI INSIGHTS AVAILABLE YET</p>
            <p className="text-sm text-black">COMPLETE MORE GOALS AND HABITS TO GENERATE INSIGHTS!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {insights.map(insight => (
              <div 
                key={insight.id} 
                className={`p-4 border-4 border-black transition-all cursor-pointer ${
                  insight.is_viewed 
                    ? 'bg-white' 
                    : 'neo-card-green'
                }`}
                style={{ boxShadow: '4px 4px 0px #000000' }}
                onClick={() => !insight.is_viewed && markInsightAsViewed(insight.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-black">
                      {getInsightIcon(insight.insight_type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="neo-text-small text-black">{insight.title}</h4>
                        {!insight.is_viewed && (
                          <div className="inline-block px-2 py-1 border-2 border-black bg-red-500">
                            <span className="text-xs font-bold text-white">NEW</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-black mb-2">{insight.description}</p>
                      <div className="flex items-center gap-3 text-xs text-black font-bold">
                        <span className="uppercase">{formatInsightType(insight.insight_type)}</span>
                        <span>•</span>
                        <span>CONFIDENCE: {Math.round(insight.confidence_score * 100)}%</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(insight.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 border-2 border-black ${getPriorityColor(insight.priority)}`} />
                    {insight.action_required && !insight.is_acted_upon && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markInsightAsActioned(insight.id);
                        }}
                        className="neo-button text-xs px-3 py-1"
                      >
                        MARK DONE
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
