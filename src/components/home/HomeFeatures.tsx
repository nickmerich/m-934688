
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Trophy, Zap, Users } from 'lucide-react';

export function HomeFeatures() {
  const features = [
    {
      icon: Target,
      title: "Goal Mastery",
      description: "Transform your aspirations into systematic achievements through proven goal-setting frameworks."
    },
    {
      icon: Zap,
      title: "Habit Engineering",
      description: "Build unbreakable habits that compound daily, creating the foundation for lasting change."
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      description: "Visualize your journey with detailed analytics and celebrate every milestone achieved."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with like-minded individuals who share your commitment to growth and excellence."
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 px-4 sm:px-0">
            Everything You Need to Build <span className="text-green-500">Unstoppable Momentum</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
            Our comprehensive system addresses every aspect of personal transformation
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card border-gray-700/50 hover:border-green-500/30 transition-all duration-300 group">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-500/10 rounded-full mb-3 sm:mb-4 group-hover:bg-green-500/20 transition-colors">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
