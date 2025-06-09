import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

  const steps = ['Welcome', 'About You', 'Main Goal', 'Your Why', 'Contract', 'Preferences', 'Ready!'];

  const goalCategories = [
    { id: 'fitness', label: 'FITNESS & HEALTH', icon: '💪' },
    { id: 'career', label: 'CAREER & BUSINESS', icon: '🚀' },
    { id: 'education', label: 'EDUCATION', icon: '📚' },
    { id: 'relationships', label: 'RELATIONSHIPS', icon: '❤️' },
    { id: 'financial', label: 'FINANCIAL FREEDOM', icon: '💰' },
    { id: 'personal', label: 'PERSONAL GROWTH', icon: '🌱' },
    { id: 'creative', label: 'CREATIVE PROJECTS', icon: '🎨' },
    { id: 'spiritual', label: 'SPIRITUAL GROWTH', icon: '🧘' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
      title: "WELCOME TO THE GRYT!",
      description: "YOUR TRANSFORMATION JOURNEY BEGINS NOW."
    });
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="neo-card-green inline-block p-6">
                <img 
                  src="/lovable-uploads/b4bc62c0-02e4-4cf2-ade9-561284c211a2.png" 
                  alt="The Gryt" 
                  className="h-16 w-16 mx-auto object-fill" 
                />
              </div>
            </div>
            <h1 className="neo-text-huge text-black">
              WELCOME TO <span style={{ color: 'hsl(var(--neon-green))' }}>THE GRYT</span>
            </h1>
            <p className="neo-text-medium text-black max-w-3xl mx-auto leading-relaxed">
              YOU'RE ABOUT TO EMBARK ON A TRANSFORMATIONAL JOURNEY. THIS ONBOARDING WILL HELP US UNDERSTAND YOUR GOALS, MOTIVATIONS, AND CREATE A PERSONALIZED EXPERIENCE THAT BUILDS UNBREAKABLE HABITS.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-black">
              <div className="flex items-center space-x-3">
                <div className="neo-card-green p-2">
                  <Target className="h-6 w-6 text-black" strokeWidth={3} />
                </div>
                <span className="neo-text-medium">SET CLEAR GOALS</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="neo-card-green p-2">
                  <Heart className="h-6 w-6 text-black" strokeWidth={3} />
                </div>
                <span className="neo-text-medium">FIND YOUR WHY</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="neo-card-green p-2">
                  <FileText className="h-6 w-6 text-black" strokeWidth={3} />
                </div>
                <span className="neo-text-medium">CREATE YOUR CONTRACT</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="neo-text-big text-black mb-4">TELL US ABOUT YOURSELF</h2>
              <p className="neo-text-medium text-black">LET'S PERSONALIZE YOUR EXPERIENCE</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="neo-text-medium text-black">WHAT SHOULD WE CALL YOU?</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="ENTER YOUR FIRST NAME"
                  className="neo-border bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 h-12 text-lg font-bold uppercase"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="age" className="neo-text-medium text-black">AGE (OPTIONAL)</Label>
                <Input 
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="YOUR AGE"
                  className="neo-border bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 h-12 text-lg font-bold uppercase"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="neo-text-big text-black mb-4">WHAT'S YOUR MAIN GOAL?</h2>
              <p className="neo-text-medium text-black">CHOOSE THE AREA YOU WANT TO FOCUS ON MOST</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {goalCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={formData.goalCategory === category.id ? "default" : "outline"}
                  onClick={() => handleInputChange('goalCategory', category.id)}
                  className={`h-auto p-6 flex-col space-y-3 ${
                    formData.goalCategory === category.id ? 'neo-button-primary' : 'neo-button'
                  }`}
                >
                  <span className="text-3xl">{category.icon}</span>
                  <span className="text-sm text-center font-black uppercase">{category.label}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              <Label htmlFor="mainGoal" className="neo-text-medium text-black">DESCRIBE YOUR SPECIFIC GOAL</Label>
              <Textarea 
                id="mainGoal"
                value={formData.mainGoal}
                onChange={(e) => handleInputChange('mainGoal', e.target.value)}
                placeholder="E.G., RUN A MARATHON, START MY OWN BUSINESS, LEARN SPANISH..."
                className="neo-border bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 min-h-[120px] text-lg font-bold uppercase resize-none"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="neo-text-big text-black mb-4">
                WHAT'S YOUR <span style={{ color: 'hsl(var(--neon-green))' }}>WHY</span>?
              </h2>
              <p className="neo-text-medium text-black">YOUR DEEPER MOTIVATION WILL FUEL YOU THROUGH CHALLENGES</p>
            </div>
            
            <div className="neo-card-pink p-6">
              <div className="flex items-start space-x-4">
                <Heart className="h-8 w-8 text-black mt-1" strokeWidth={3} />
                <div>
                  <h3 className="neo-text-medium text-black mb-3">THINK DEEPER</h3>
                  <p className="neo-text-medium text-black mb-4 leading-relaxed">
                    YOUR "WHY" IS THE EMOTIONAL CORE THAT WILL KEEP YOU GOING WHEN MOTIVATION FADES. 
                    THINK ABOUT HOW ACHIEVING THIS GOAL WILL IMPACT YOUR LIFE, YOUR FAMILY, YOUR FUTURE SELF.
                  </p>
                  <div className="space-y-2 text-black">
                    <p className="font-bold">• HOW WILL YOUR LIFE CHANGE WHEN YOU ACHIEVE THIS?</p>
                    <p className="font-bold">• WHO ELSE WILL BENEFIT FROM YOUR SUCCESS?</p>
                    <p className="font-bold">• WHAT WOULD HAPPEN IF YOU DON'T TAKE ACTION?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="why" className="neo-text-medium text-black">YOUR DEEPER WHY</Label>
              <Textarea 
                id="why"
                value={formData.why}
                onChange={(e) => handleInputChange('why', e.target.value)}
                placeholder="I WANT TO ACHIEVE THIS BECAUSE..."
                className="neo-border bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 min-h-[150px] text-lg font-bold uppercase resize-none"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="neo-text-big text-black mb-4">
                YOUR PERSONAL <span style={{ color: 'hsl(var(--neon-green))' }}>CONTRACT</span>
              </h2>
              <p className="neo-text-medium text-black">CREATE A COMMITMENT TO YOUR FUTURE SELF</p>
            </div>

            <div className="neo-card-charcoal p-6">
              <div className="flex items-start space-x-4">
                <FileText className="h-8 w-8 text-white mt-1" strokeWidth={3} />
                <div>
                  <h3 className="neo-text-medium text-white mb-3">THE POWER OF COMMITMENT</h3>
                  <p className="neo-text-medium text-white leading-relaxed">
                    WRITE A CONTRACT TO YOURSELF. THIS ISN'T JUST GOAL-SETTING - IT'S MAKING A SACRED PROMISE 
                    TO THE PERSON YOU'RE BECOMING. BE SPECIFIC ABOUT WHAT YOU COMMIT TO DO DAILY.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="contract" className="neo-text-medium text-black">YOUR PERSONAL CONTRACT</Label>
              <Textarea 
                id="contract"
                value={formData.contract}
                onChange={(e) => handleInputChange('contract', e.target.value)}
                placeholder="I, [YOUR NAME], COMMIT TO... I WILL DO THIS BY... EVEN WHEN IT'S DIFFICULT, I WILL..."
                className="neo-border bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 min-h-[200px] text-lg font-bold uppercase resize-none"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="neo-text-big text-black mb-4">PREFERENCES & SETTINGS</h2>
              <p className="neo-text-medium text-black">CUSTOMIZE YOUR EXPERIENCE</p>
            </div>
            
            <div className="neo-card p-6">
              <h3 className="neo-text-medium text-black mb-6">NOTIFICATIONS</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="neo-text-medium text-black">DAILY MOTIVATION REMINDERS</p>
                  <p className="text-black font-bold mt-1">GET INSPIRED WITH DAILY QUOTES AND PROGRESS UPDATES</p>
                </div>
                <div className="neo-card-green p-3">
                  <input 
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={(e) => handleInputChange('notifications', e.target.checked.toString())}
                    className="w-6 h-6 accent-black"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="neo-card-green p-8">
                <Sparkles className="h-16 w-16 text-black mx-auto" strokeWidth={3} />
              </div>
            </div>
            <h1 className="neo-text-huge text-black">
              YOU'RE READY TO BEGIN!
            </h1>
            <p className="neo-text-medium text-black max-w-3xl mx-auto leading-relaxed">
              YOUR TRANSFORMATION JOURNEY STARTS NOW. REMEMBER, EVERY GREAT ACHIEVEMENT BEGINS WITH THE DECISION TO TRY.
            </p>
            
            <div className="neo-card-pink p-8">
              <h3 className="neo-text-medium text-black mb-4">YOUR COMMITMENT SUMMARY</h3>
              <div className="space-y-3 text-left">
                <p className="text-black font-bold">
                  <span className="neo-text-medium">GOAL:</span> {formData.mainGoal}
                </p>
                <p className="text-black font-bold">
                  <span className="neo-text-medium">WHY:</span> {formData.why.substring(0, 100)}...
                </p>
              </div>
            </div>
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
    <div className="min-h-screen bg-white py-8 px-4 no-gradients">
      <div className="max-w-4xl mx-auto">
        <OnboardingProgress currentStep={currentStep} totalSteps={steps.length} steps={steps} />

        <div className="neo-card">
          <div className="p-8 lg:p-12">
            {renderStep()}
            
            <div className="flex justify-between mt-12">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="neo-button disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                PREVIOUS
              </Button>

              {currentStep === steps.length ? (
                <Button
                  onClick={completeOnboarding}
                  className="neo-button-primary px-8"
                >
                  ENTER THE GRYT
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="neo-button-primary px-8 disabled:opacity-50"
                >
                  CONTINUE
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
