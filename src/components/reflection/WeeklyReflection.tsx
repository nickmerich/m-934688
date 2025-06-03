
import React, { useState } from 'react';
import { BookOpen, ChevronRight, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ReflectionEntry {
  week: string;
  highlights: string[];
  challenges: string[];
  improvements: string[];
  mood: 'excellent' | 'good' | 'okay' | 'challenging';
}

const mockReflections: ReflectionEntry[] = [
  {
    week: 'Week of Jan 15-21',
    highlights: ['Completed all morning meditations', 'Hit gym 5 times'],
    challenges: ['Struggled with late-night phone usage', 'Missed reading twice'],
    improvements: ['Need better sleep schedule', 'Set specific reading time'],
    mood: 'good'
  }
];

export function WeeklyReflection() {
  const [showForm, setShowForm] = useState(false);

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excellent': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'good': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'okay': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'challenging': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'excellent': return '🚀';
      case 'good': return '😊';
      case 'okay': return '😐';
      case 'challenging': return '😓';
      default: return '🤔';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
            Weekly Reflection
          </CardTitle>
          <Button 
            size="sm" 
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            onClick={() => setShowForm(!showForm)}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Reflect
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockReflections.length > 0 ? (
          <div className="space-y-3">
            {mockReflections.map((reflection, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{reflection.week}</h4>
                  <Badge variant="outline" className={getMoodColor(reflection.mood)}>
                    {getMoodEmoji(reflection.mood)} {reflection.mood}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-green-400 font-medium">Highlights:</span>
                    <ul className="text-gray-300 mt-1 ml-4">
                      {reflection.highlights.map((highlight, i) => (
                        <li key={i} className="list-disc">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <span className="text-orange-400 font-medium">Challenges:</span>
                    <ul className="text-gray-300 mt-1 ml-4">
                      {reflection.challenges.map((challenge, i) => (
                        <li key={i} className="list-disc">{challenge}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 mb-4">No reflections yet this week</p>
            <Button 
              className="bg-purple-500 hover:bg-purple-600 text-white"
              onClick={() => setShowForm(true)}
            >
              Start Your First Reflection
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
