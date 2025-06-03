import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Trophy, Zap, Users, CheckCircle, Quote } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Navigation */}
      <nav className="border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/lovable-uploads/62433d31-9986-454a-9285-9bda4b300e80.png" 
                  alt="The Gryt" 
                  className="h-10 w-10 object-contain"
                />
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-sm animate-pulse-gentle"></div>
              </div>
              <div className="text-xl sm:text-2xl font-bold">
                <span className="text-white">The </span>
                <span className="text-green-500 glow-text">Gryt</span>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/signin')}
                className="text-gray-300 hover:text-white text-sm sm:text-base px-2 sm:px-4"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-glow text-sm sm:text-base px-3 sm:px-4"
              >
                Get Started
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative">
          <div className="text-center space-y-6 sm:space-y-8">
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">
              🔥 Join 10,000+ people building unbreakable habits
            </Badge>
            
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight px-4 sm:px-0">
              <span className="text-green-500 glow-text">Reach Your Potential</span>
              <span className="block text-white">Through Consistent Daily Habits</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              The Gryt isn't just another habit tracker. It's a complete transformation system that builds 
              unshakeable discipline, turns dreams into systematic progress, and forges the mental toughness 
              needed to achieve extraordinary results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
              <Button 
                size="lg"
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-glow hover:shadow-glow-intense transition-all duration-300"
              >
                Start Your Transformation
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/signin')}
                className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Testimonials Section */}
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

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
            Your Transformation Starts <span className="text-green-500">Today</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
            Join thousands of people who have already committed to building unbreakable habits and achieving their most ambitious goals.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/signup')}
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-glow hover:shadow-glow-intense transition-all duration-300"
          >
            Begin Your Journey
            <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/62433d31-9986-454a-9285-9bda4b300e80.png" 
                alt="The Gryt" 
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
              />
              <span className="text-lg sm:text-xl font-bold text-white">The <span className="text-green-500">Gryt</span></span>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm text-center">
              © 2024 The Gryt. Building unbreakable habits, one day at a time.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
