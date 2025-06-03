
import React from 'react';
import { Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const dailyNudges = [
  {
    message: "Your morning meditation streak is impressive! This consistency is building mental resilience that will serve you in all areas of life.",
    type: "encouragement",
    action: "Keep it going! Set your timer now."
  },
  {
    message: "You missed your workout yesterday, but that doesn't define you. Champions bounce back stronger. What's one small step you can take today?",
    type: "motivation",
    action: "Start with 10 push-ups right now."
  },
  {
    message: "Your reading habit is accelerating your growth. Knowledge compounds daily. Consider taking notes to maximize retention.",
    type: "tip",
    action: "Grab your journal and summarize yesterday's reading."
  }
];

export function DailyNudge() {
  const navigate = useNavigate();
  const [currentNudge, setCurrentNudge] = React.useState(0);

  const refreshNudge = () => {
    setCurrentNudge((prev) => (prev + 1) % dailyNudges.length);
  };

  const nudge = dailyNudges[currentNudge];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'encouragement': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'motivation': return 'from-orange-500/20 to-red-500/20 border-orange-500/30';
      case 'tip': return 'from-blue-500/20 to-purple-500/20 border-blue-500/30';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  return (
    <Card className={`bg-gradient-to-r ${getTypeColor(nudge.type)} border`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
            Daily Nudge
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={refreshNudge}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-200 text-sm leading-relaxed">
          {nudge.message}
        </p>
        
        <div className="p-3 bg-black/20 rounded-lg border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Suggested Action:</p>
          <p className="text-sm text-white font-medium">{nudge.action}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between text-xs text-gray-500 flex-1">
            <span>Powered by Gryt AI</span>
            <span className="capitalize">{nudge.type}</span>
          </div>
        </div>

        <Button
          onClick={() => navigate('/ai-habit-partner')}
          className="w-full bg-green-500 hover:bg-green-600 text-white mt-4"
          size="sm"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Upgrade to AI Habit Partner
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
