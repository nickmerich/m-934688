
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
  is_acted_upon?: boolean; // Add this optional property
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
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
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
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-green-500" />
          <h2 className="text-2xl font-bold text-white">AI Command Center</h2>
        </div>
        <Badge variant="outline" className="text-green-400 border-green-500">
          {insights.filter(i => !i.is_viewed).length} New Insights
        </Badge>
      </div>

      {/* High Priority Alerts */}
      {insights.filter(i => i.priority === 'urgent' || i.priority === 'high').length > 0 && (
        <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/50">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Priority Actions Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights
                .filter(i => (i.priority === 'urgent' || i.priority === 'high') && !i.is_acted_upon)
                .slice(0, 3)
                .map(insight => (
                  <div key={insight.id} className="flex items-start justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="text-red-400">
                        {getInsightIcon(insight.insight_type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{insight.title}</h4>
                        <p className="text-sm text-gray-300">{insight.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(insight.priority)} text-white border-none`}
                          >
                            {insight.priority.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            Confidence: {Math.round(insight.confidence_score * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => markInsightAsActioned(insight.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Done
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Forecasts */}
      {forecasts.length > 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Forecasts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {forecasts.slice(0, 4).map(forecast => (
                <div key={forecast.id} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white capitalize">
                      {forecast.forecast_type.replace('_', ' ')}
                    </h4>
                    <Badge variant="outline">
                      {Math.round(forecast.confidence_score * 100)}% confident
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {forecast.forecast_type === 'success_probability' && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Success Likelihood</span>
                          <span className="text-green-400">
                            {Math.round(forecast.prediction_value.probability * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={forecast.prediction_value.probability * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    {forecast.forecast_type === 'burnout_risk' && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Burnout Risk</span>
                          <span className={`${
                            forecast.prediction_value.risk_level === 'high' ? 'text-red-400' :
                            forecast.prediction_value.risk_level === 'medium' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {forecast.prediction_value.risk_level}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Insights */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {insights.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No AI insights available yet.</p>
              <p className="text-sm text-gray-500">Complete more goals and habits to generate insights!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {insights.map(insight => (
                <div 
                  key={insight.id} 
                  className={`p-4 rounded-lg border transition-all ${
                    insight.is_viewed 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-green-500/5 border-green-500/30'
                  }`}
                  onClick={() => !insight.is_viewed && markInsightAsViewed(insight.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-green-400">
                        {getInsightIcon(insight.insight_type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-white">{insight.title}</h4>
                          {!insight.is_viewed && (
                            <Badge variant="outline" className="text-xs text-green-400 border-green-500">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{insight.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="capitalize">{formatInsightType(insight.insight_type)}</span>
                          <span>•</span>
                          <span>Confidence: {Math.round(insight.confidence_score * 100)}%</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(insight.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(insight.priority)}`} />
                      {insight.action_required && !insight.is_acted_upon && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            markInsightAsActioned(insight.id);
                          }}
                        >
                          Mark Done
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
