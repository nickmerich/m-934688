
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTermsChange = (checked: boolean | "indeterminate") => {
    setAgreeToTerms(checked === true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created successfully!",
        description: "Welcome to The Gryt. Let's get you started.",
      });
      navigate('/onboarding');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white no-gradients">
      {/* Navigation */}
      <nav className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Back Button */}
            <Button
              onClick={() => navigate('/')}
              className="neo-button flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>BACK TO HOME</span>
            </Button>

            {/* Logo */}
            <div className="flex items-center">
              <img 
                alt="The Gryt" 
                src="/lovable-uploads/c3193544-bf00-4f06-a79a-b09dee14a047.png" 
                className="h-12 w-auto object-cover" 
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="bg-white py-20 lg:py-32 no-gradients">
        <div className="max-w-2xl mx-auto px-4 lg:px-6">
          <div className="text-center space-y-12 mb-12">
            <div className="neo-card-green inline-block">
              <span className="neo-text-medium text-black">🚀 START YOUR TRANSFORMATION</span>
            </div>
            
            <h1 className="neo-text-huge text-black">
              JOIN THOUSANDS BUILDING
              <span className="block" style={{
                color: 'hsl(var(--neon-green))'
              }}>
                UNBREAKABLE HABITS
              </span>
            </h1>
          </div>

          {/* Form */}
          <div className="neo-card max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="email" className="neo-text-medium text-black">
                  EMAIL
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-4 border-black text-black placeholder-gray-500 neo-shadow-medium font-bold uppercase"
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="password" className="neo-text-medium text-black">
                  PASSWORD
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="CREATE A STRONG PASSWORD"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                    className="bg-white border-4 border-black text-black placeholder-gray-500 neo-shadow-medium font-bold uppercase pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 border-0 bg-transparent hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-black" />
                    ) : (
                      <Eye className="h-4 w-4 text-black" />
                    )}
                  </Button>
                </div>
                <p className="neo-text-medium text-black text-sm">MINIMUM 8 CHARACTERS</p>
              </div>

              <div className="space-y-4">
                <Label htmlFor="confirmPassword" className="neo-text-medium text-black">
                  CONFIRM PASSWORD
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="CONFIRM YOUR PASSWORD"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-4 border-black text-black placeholder-gray-500 neo-shadow-medium font-bold uppercase"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={handleTermsChange}
                  className="border-4 border-black data-[state=checked]:bg-green-500 data-[state=checked]:border-black w-6 h-6"
                />
                <label htmlFor="terms" className="neo-text-medium text-black text-sm">
                  I AGREE TO THE{' '}
                  <Link to="/terms" className="underline font-black" style={{ color: 'hsl(var(--neon-green))' }}>
                    TERMS OF SERVICE
                  </Link>{' '}
                  AND{' '}
                  <Link to="/privacy" className="underline font-black" style={{ color: 'hsl(var(--neon-green))' }}>
                    PRIVACY POLICY
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !agreeToTerms}
                className="w-full neo-button-primary text-xl py-6"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>CREATING ACCOUNT...</span>
                  </div>
                ) : (
                  'CREATE ACCOUNT'
                )}
              </Button>
            </form>

            <div className="text-center space-y-6 mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-4 border-black"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 neo-text-medium text-black">OR</span>
                </div>
              </div>

              <p className="neo-text-medium text-black">
                ALREADY HAVE AN ACCOUNT?{' '}
                <Link
                  to="/signin"
                  className="underline font-black"
                  style={{ color: 'hsl(var(--neon-green))' }}
                >
                  SIGN IN HERE
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
