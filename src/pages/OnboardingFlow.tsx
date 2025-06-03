import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { ArrowRight, ArrowLeft, Target, Heart, FileText, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mainGoal: '',
    goalCategory: '',
    why: '',
    contract: '',
    notifications: true
  });

  const steps = [
    'Welcome',
    'About You', 
    'Main Goal',
    'Your Why',
    'Contract',
    'Preferences',
    'Ready!'
  ];

  const goalCategories = [
    { id: 'fitness', label: 'Fitness & Health', icon: '💪' },
    { id: 'career', label: 'Career & Business', icon: '🚀' },
    { id: 'education', label: 'Learning & Education', icon: '📚' },
    { id: 'relationships', label: 'Relationships', icon: '❤️' },
    { id: 'financial', label: 'Financial Freedom', icon: '💰' },
    { id: 'personal', label: 'Personal Growth', icon: '🌱' },
    { id: 'creative', label: 'Creative Projects', icon: '🎨' },
    { id: 'spiritual', label: 'Spiritual Growth', icon: '🧘' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeOnboarding = () => {
    toast({
      title: "Welcome to The Gryt!",
      description: "Your transformation journey begins now.",
    });
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/62433d31-9986-454a-9285-9bda4b300e80.png" 
                  alt="The Gryt" 
                  className="h-20 w-20 object-contain"
                />
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-sm animate-pulse-gentle"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white">
              Welcome to <span className="text-green-500 glow-text">The Gryt</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              You're about to embark on a transformational journey. This onboarding will help us understand your goals, motivations, and create a personalized experience that builds unbreakable habits.
            </p>
            <div className="flex items-center justify-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-500" />
                <span>Set Clear Goals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-green-500" />
                <span>Find Your Why</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-green-500" />
                <span>Create Your Contract</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Tell Us About Yourself</h2>
              <p className="text-gray-400">Let's personalize your experience</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">What should we call you?</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your first name"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-300">Age (optional)</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Your age"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">What's Your Main Goal?</h2>
              <p className="text-gray-400">Choose the area you want to focus on most</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {goalCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={formData.goalCategory === category.id ? "default" : "outline"}
                  onClick={() => handleInputChange('goalCategory', category.id)}
                  className={`h-auto p-4 flex-col space-y-2 ${
                    formData.goalCategory === category.id 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'border-gray-600 text-gray-300 hover:border-green-500'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="text-sm text-center">{category.label}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainGoal" className="text-gray-300">Describe your specific goal</Label>
              <Textarea
                id="mainGoal"
                value={formData.mainGoal}
                onChange={(e) => handleInputChange('mainGoal', e.target.value)}
                placeholder="e.g., Run a marathon, Start my own business, Learn Spanish..."
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 min-h-[100px]"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">What's Your <span className="text-green-500">Why</span>?</h2>
              <p className="text-gray-400">Your deeper motivation will fuel you through challenges</p>
            </div>
            
            <Card className="glass-card border-green-500/20 bg-green-500/5 p-6">
              <div className="flex items-start space-x-3">
                <Heart className="h-6 w-6 text-green-500 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Think Deeper</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Your "why" is the emotional core that will keep you going when motivation fades. 
                    Think about how achieving this goal will impact your life, your family, your future self.
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>• How will your life change when you achieve this?</p>
                    <p>• Who else will benefit from your success?</p>
                    <p>• What would happen if you don't take action?</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="why" className="text-gray-300">Your deeper why</Label>
              <Textarea
                id="why"
                value={formData.why}
                onChange={(e) => handleInputChange('why', e.target.value)}
                placeholder="I want to achieve this because..."
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 min-h-[150px]"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Your Personal <span className="text-green-500">Contract</span></h2>
              <p className="text-gray-400">Create a commitment to your future self</p>
            </div>

            <Card className="glass-card border-green-500/20 bg-green-500/5 p-6">
              <div className="flex items-start space-x-3">
                <FileText className="h-6 w-6 text-green-500 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">The Power of Commitment</h3>
                  <p className="text-gray-300 text-sm">
                    Write a contract to yourself. This isn't just goal-setting - it's making a sacred promise 
                    to the person you're becoming. Be specific about what you commit to do daily.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="contract" className="text-gray-300">Your personal contract</Label>
              <Textarea
                id="contract"
                value={formData.contract}
                onChange={(e) => handleInputChange('contract', e.target.value)}
                placeholder="I, [your name], commit to... I will do this by... Even when it's difficult, I will..."
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 min-h-[200px]"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Preferences & Settings</h2>
              <p className="text-gray-400">Customize your experience</p>
            </div>
            
            <Card className="glass-card border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300">Daily motivation reminders</p>
                    <p className="text-sm text-gray-400">Get inspired with daily quotes and progress updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={(e) => handleInputChange('notifications', e.target.checked.toString())}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </Card>
          </div>
        );

      case 7:
        return (
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <Sparkles className="h-20 w-20 text-green-500 animate-float" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              You're Ready to Begin!
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Your transformation journey starts now. Remember, every great achievement begins with the decision to try.
            </p>
            
            <Card className="glass-card border-green-500/20 bg-green-500/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Your Commitment Summary</h3>
              <div className="space-y-2 text-left">
                <p className="text-gray-300"><strong>Goal:</strong> {formData.mainGoal}</p>
                <p className="text-gray-300"><strong>Why:</strong> {formData.why.substring(0, 100)}...</p>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return true;
      case 2: return formData.name.trim().length > 0;
      case 3: return formData.mainGoal.trim().length > 0 && formData.goalCategory;
      case 4: return formData.why.trim().length > 10;
      case 5: return formData.contract.trim().length > 20;
      case 6: return true;
      case 7: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <OnboardingProgress 
          currentStep={currentStep} 
          totalSteps={steps.length} 
          steps={steps}
        />

        <Card className="glass-card border-gray-700/50">
          <CardContent className="p-8 lg:p-12">
            {renderStep()}
            
            <div className="flex justify-between mt-12">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="text-gray-400 hover:text-white disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep === steps.length ? (
                <Button
                  onClick={completeOnboarding}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 shadow-glow"
                >
                  Enter The Gryt
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 shadow-glow disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
