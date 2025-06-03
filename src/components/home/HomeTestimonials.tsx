
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Quote } from 'lucide-react';

export function HomeTestimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Entrepreneur",
      content: "The Gryt helped me build the discipline to launch my startup. The habit tracking is game-changing.",
      achievement: "Built 3 core habits in 90 days"
    },
    {
      name: "Marcus Johnson",
      role: "Student",
      content: "Writing my personal contract was powerful. It keeps me accountable to my future self every day.",
      achievement: "Improved GPA by 1.2 points"
    },
    {
      name: "Elena Rodriguez",
      role: "Fitness Coach",
      content: "The goal breakdown system helped me structure my fitness business better than any other tool.",
      achievement: "Grew client base by 200%"
    }
  ];

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 px-4 sm:px-0">
            Real People, Real <span className="text-green-500">Transformations</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 px-4 sm:px-0">
            See how The Gryt has changed lives across the globe
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-white">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {testimonial.achievement}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
