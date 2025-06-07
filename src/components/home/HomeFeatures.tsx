
import React from 'react';
import { Target, Trophy, Zap, Users } from 'lucide-react';

export function HomeFeatures() {
  const features = [
    {
      icon: Target,
      title: "GOAL MASTERY",
      description: "TRANSFORM ASPIRATIONS INTO SYSTEMATIC ACHIEVEMENTS THROUGH PROVEN FRAMEWORKS.",
      color: "neo-card-green"
    },
    {
      icon: Zap,
      title: "HABIT ENGINEERING",
      description: "BUILD UNBREAKABLE HABITS THAT COMPOUND DAILY AND CREATE LASTING CHANGE.",
      color: "neo-card-pink"
    },
    {
      icon: Trophy,
      title: "PROGRESS TRACKING",
      description: "VISUALIZE YOUR JOURNEY WITH DETAILED ANALYTICS AND CELEBRATE MILESTONES.",
      color: "neo-card"
    },
    {
      icon: Users,
      title: "FUTURE COMMUNITY",
      description: "SOON YOU'LL CONNECT WITH LIKE-MINDED INDIVIDUALS COMMITTED TO EXCELLENCE.",
      color: "neo-card-charcoal"
    }
  ];

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="neo-text-huge text-white mb-8">
            EVERYTHING YOU NEED TO BUILD
            <span className="block" style={{ color: 'hsl(var(--neon-green))' }}>
              UNSTOPPABLE MOMENTUM
            </span>
          </h2>
          <p className="neo-text-medium text-white max-w-3xl mx-auto">
            OUR COMPREHENSIVE SYSTEM ADDRESSES EVERY ASPECT OF PERSONAL TRANSFORMATION
          </p>
        </div>
        
        <div className="neo-grid">
          {features.map((feature, index) => (
            <div key={index} className={feature.color}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <feature.icon className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">{feature.title}</h3>
                <p className="neo-text-medium text-black leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
