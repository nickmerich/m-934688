
import React, { useState } from 'react';
import { Check, Sparkles, Zap, Crown, MessageCircle, Calendar, BarChart3, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  buttonText: string;
  color: string;
}

export function AIHabitPartnerPricing() {
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '$9' : '$90',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Perfect for individuals starting their habit journey',
      features: [
        'Basic daily nudges & reminders',
        'Simple habit tracking (up to 5 habits)',
        'Weekly progress reports',
        'Basic conversational coaching',
        'Email support'
      ],
      icon: <Sparkles className="h-6 w-6" />,
      buttonText: 'Start Free Trial',
      color: 'border-blue-500'
    },
    {
      name: 'Growth',
      price: billingCycle === 'monthly' ? '$19' : '$190',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For serious habit builders who want personalized guidance',
      features: [
        'Advanced AI coaching conversations',
        'Unlimited habit tracking',
        'Personalized habit analytics',
        'Calendar & productivity tool integrations',
        'Adaptive recommendations',
        'Priority support',
        'Custom nudge scheduling'
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: true,
      buttonText: 'Get Growth Plan',
      color: 'border-green-500'
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '$39' : '$390',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Complete habit mastery with advanced AI insights',
      features: [
        'Everything in Growth plan',
        'Advanced behavioral analytics',
        'Predictive habit success modeling',
        'Custom AI coaching personality',
        'Team collaboration features',
        'API access for integrations',
        'White-label options',
        'Dedicated success manager'
      ],
      icon: <Crown className="h-6 w-6" />,
      buttonText: 'Go Pro',
      color: 'border-purple-500'
    }
  ];

  const handleSubscribe = (tierName: string) => {
    toast({
      title: "Coming Soon!",
      description: `${tierName} plan will be available soon. Join our waitlist to get early access.`,
    });
  };

  const coreCapabilities = [
    {
      title: 'Daily Nudges & Reminders',
      description: 'Personalized daily nudges and gentle accountability prompts based on user-defined habits and tasks.',
      icon: <MessageCircle className="h-5 w-5 text-blue-400" />
    },
    {
      title: 'Conversational Coaching',
      description: 'Supportive, conversational interactions for goal clarity, motivation, and overcoming common blockers.',
      icon: <Sparkles className="h-5 w-5 text-green-400" />
    },
    {
      title: 'Habit Analytics',
      description: 'Tracks habit consistency and performance, providing real-time actionable feedback.',
      icon: <BarChart3 className="h-5 w-5 text-purple-400" />
    },
    {
      title: 'Adaptive Recommendations',
      description: 'Suggests habit adjustments and improvements based on ongoing user behavior analysis.',
      icon: <Settings className="h-5 w-5 text-orange-400" />
    },
    {
      title: 'Seamless Integration',
      description: 'Syncs seamlessly with the growth dashboard and productivity tools (Google Calendar, Slack, Notion).',
      icon: <Calendar className="h-5 w-5 text-cyan-400" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-8 w-8 text-green-500" />
          <h1 className="text-4xl font-bold text-white">AI Habit Partner</h1>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A conversational AI companion that supports habit formation and execution to ensure actionable insights lead directly to daily improvements and consistent results.
        </p>
      </div>

      {/* Core Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {coreCapabilities.map((capability, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                {capability.icon}
                <CardTitle className="text-white text-lg">{capability.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">{capability.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
          Monthly
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            billingCycle === 'yearly' ? 'bg-green-500' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
          Yearly
        </span>
        {billingCycle === 'yearly' && (
          <Badge className="bg-green-500 text-white">Save 20%</Badge>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {pricingTiers.map((tier, index) => (
          <Card 
            key={index} 
            className={`bg-gray-900 border-2 ${tier.color} relative ${
              tier.popular ? 'scale-105 shadow-xl' : ''
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-500 text-white px-4 py-1">Most Popular</Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                {tier.icon}
              </div>
              <CardTitle className="text-white text-xl">{tier.name}</CardTitle>
              <div className="text-center">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-gray-400">{tier.period}</span>
              </div>
              <p className="text-gray-400 text-sm">{tier.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handleSubscribe(tier.name)}
                className={`w-full ${
                  tier.popular 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                } text-white`}
              >
                {tier.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Model Details */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-2xl text-center">Revenue Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400">Subscription-Based SaaS</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Tiered pricing model for different user needs</li>
                <li>• Recurring monthly/yearly revenue stream</li>
                <li>• Free trial to reduce acquisition friction</li>
                <li>• Annual discounts to improve retention</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Value Propositions</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Personalized AI coaching at scale</li>
                <li>• Measurable habit improvement outcomes</li>
                <li>• Seamless integration with existing tools</li>
                <li>• Data-driven insights for behavior change</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-700">
            <p className="text-center text-gray-400">
              Target: $50-100 ARR per user with 85%+ retention rate through continuous value delivery
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
