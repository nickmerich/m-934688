
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export function HomePricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "STARTER",
      price: "FREE",
      period: "FOREVER",
      features: [
        "BASIC HABIT TRACKING",
        "3 ACTIVE GOALS",
        "WEEKLY ANALYTICS",
        "MOBILE ACCESS"
      ],
      cta: "START FREE",
      color: "neo-card",
      popular: false
    },
    {
      name: "GRYT WARRIOR",
      price: "$9",
      period: "PER MONTH",
      features: [
        "UNLIMITED HABITS & GOALS",
        "ADVANCED ANALYTICS",
        "AI HABIT COACHING",
        "PRIORITY SUPPORT",
        "INTEGRATION ACCESS"
      ],
      cta: "BECOME WARRIOR",
      color: "neo-card-green",
      popular: true
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="neo-text-huge text-black mb-8">
            CHOOSE YOUR
            <span className="block" style={{ color: 'hsl(var(--neon-green))' }}>
              TRANSFORMATION LEVEL
            </span>
          </h2>
        </div>
        
        <div className="neo-grid max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`${plan.color} relative`}>
              <div className="text-center">
                <h3 className="neo-text-big text-black mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="neo-text-huge text-black">{plan.price}</span>
                  <div className="neo-text-medium text-black">{plan.period}</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center">
                      <Check className="h-5 w-5 text-black mr-3 flex-shrink-0" strokeWidth={3} />
                      <span className="text-sm font-bold text-black uppercase">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => navigate('/signup')}
                  className="neo-button-primary w-full text-lg py-4"
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
