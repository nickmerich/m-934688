
import React, { useState } from 'react';
import { BookOpen, Target, Lightbulb, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function HabitResources() {
  const frameworks = [
    {
      id: 'atomic-habits',
      title: 'Atomic Habits Framework',
      category: 'Habit Building',
      description: 'Build better habits with the 1% improvement rule',
      steps: [
        'Make it Obvious - Use implementation intentions and habit stacking',
        'Make it Attractive - Bundle tempting habits with beneficial ones',
        'Make it Easy - Reduce friction and use the 2-minute rule',
        'Make it Satisfying - Use immediate rewards and habit tracking'
      ],
      tips: [
        'Start with habits that take less than 2 minutes',
        'Stack new habits onto existing ones',
        'Focus on systems, not goals',
        'Track your progress visually'
      ]
    },
    {
      id: 'smart-goals',
      title: 'SMART Goals Framework',
      category: 'Goal Setting',
      description: 'Create specific, measurable, and achievable goals',
      steps: [
        'Specific - Clearly define what you want to accomplish',
        'Measurable - Include metrics to track progress',
        'Achievable - Set realistic and attainable goals',
        'Relevant - Align with your values and long-term objectives',
        'Time-bound - Set clear deadlines and milestones'
      ],
      tips: [
        'Write goals in positive language',
        'Break large goals into smaller milestones',
        'Review and adjust goals regularly',
        'Celebrate small wins along the way'
      ]
    },
    {
      id: 'okr-method',
      title: 'OKR Method',
      category: 'Goal Setting',
      description: 'Objectives and Key Results for ambitious goal setting',
      steps: [
        'Set Objective - Define what you want to achieve (qualitative)',
        'Define Key Results - Measurable outcomes (3-5 per objective)',
        'Make it Ambitious - Aim for 70% completion rate',
        'Review Quarterly - Assess progress and adjust'
      ],
      tips: [
        'Objectives should be inspiring and memorable',
        'Key Results must be measurable and time-bound',
        'Start with 3-5 objectives maximum',
        'Grade your OKRs at the end of each quarter'
      ]
    }
  ];

  const resources = [
    {
      title: 'The Ultimate Guide to Habit Stacking',
      type: 'Article',
      description: 'Learn how to chain habits together for maximum effectiveness',
      category: 'Habit Building',
      readTime: '8 min read'
    },
    {
      title: 'Science-Based Goal Setting Strategies',
      type: 'Research',
      description: 'Evidence-based approaches to achieving your objectives',
      category: 'Goal Setting',
      readTime: '12 min read'
    },
    {
      title: '21-Day Habit Formation Challenge',
      type: 'Challenge',
      description: 'Structured program to build lasting habits',
      category: 'Habit Building',
      readTime: '21 days'
    },
    {
      title: 'Quarterly Planning Template',
      type: 'Template',
      description: 'Comprehensive template for setting and tracking quarterly goals',
      category: 'Planning',
      readTime: '30 min setup'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Habit Building': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Goal Setting': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Planning': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Article': return <BookOpen className="h-4 w-4" />;
      case 'Research': return <Lightbulb className="h-4 w-4" />;
      case 'Challenge': return <Target className="h-4 w-4" />;
      case 'Template': return <ExternalLink className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Frameworks Section */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-5 w-5 mr-2 text-green-500" />
            Proven Frameworks
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Time-tested methodologies for building habits and achieving goals
          </p>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {frameworks.map((framework) => (
              <AccordionItem 
                key={framework.id} 
                value={framework.id}
                className="border border-gray-700 rounded-lg bg-gray-800"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div className="text-left">
                        <h4 className="font-medium text-white">{framework.title}</h4>
                        <p className="text-sm text-gray-400">{framework.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getCategoryColor(framework.category)}>
                      {framework.category}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-white mb-2">Steps:</h5>
                      <ol className="space-y-1">
                        {framework.steps.map((step, index) => (
                          <li key={index} className="text-sm text-gray-300 flex">
                            <span className="text-green-400 mr-2">{index + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-2">Pro Tips:</h5>
                      <ul className="space-y-1">
                        {framework.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-gray-300 flex">
                            <span className="text-yellow-400 mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Resources Section */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
            Learning Resources
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Curated content to help you master habits and goal achievement
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-gray-400">{getTypeIcon(resource.type)}</span>
                    <h4 className="font-medium text-white">{resource.title}</h4>
                    <Badge variant="outline" className={getCategoryColor(resource.category)}>
                      {resource.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{resource.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{resource.type}</span>
                    <span>•</span>
                    <span>{resource.readTime}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
            Quick Start Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white justify-start">
              <Target className="h-4 w-4 mr-2" />
              Take Habit Assessment
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Download Goal Planner
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white justify-start">
              <Lightbulb className="h-4 w-4 mr-2" />
              Start 21-Day Challenge
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white justify-start">
              <ExternalLink className="h-4 w-4 mr-2" />
              Join Community Forum
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
