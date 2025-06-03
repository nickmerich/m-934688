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
              <div className="text-2xl font-bold">
                <span className="text-white">The </span>
                <span className="text-green-500 glow-text">Gryt</span>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/signin')}
                className="text-gray-300 hover:text-white"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-glow"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative">
          <div className="text-center space-y-8">
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2 text-sm font-medium">
              🔥 Join 10,000+ people building unbreakable habits
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              <span className="text-green-500 glow-text">Reach Your Potential</span>
              <span className="block text-white">Through Consistent Daily Habits</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The Gryt isn't just another habit tracker. It's a complete transformation system that builds 
              unshakeable discipline, turns dreams into systematic progress, and forges the mental toughness 
              needed to achieve extraordinary results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-4 text-lg font-semibold shadow-glow hover:shadow-glow-intense transition-all duration-300"
              >
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/signin')}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Build <span className="text-green-500">Unstoppable Momentum</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our comprehensive system addresses every aspect of personal transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card border-gray-700/50 hover:border-green-500/30 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4 group-hover:bg-green-500/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Real People, Real <span className="text-green-500">Transformations</span>
            </h2>
            <p className="text-xl text-gray-400">
              See how The Gryt has changed lives across the globe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-green-500 mb-4" />
                  <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
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
      <section className="py-20 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Your Transformation Starts <span className="text-green-500">Today</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of people who have already committed to building unbreakable habits and achieving their most ambitious goals.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/signup')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-12 py-4 text-lg font-bold shadow-glow hover:shadow-glow-intense transition-all duration-300"
          >
            Begin Your Journey
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/62433d31-9986-454a-9285-9bda4b300e80.png" 
                alt="The Gryt" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold text-white">The <span className="text-green-500">Gryt</span></span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 The Gryt. Building unbreakable habits, one day at a time.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
