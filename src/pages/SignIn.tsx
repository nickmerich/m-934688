import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in to The Gryt.",
      });
      navigate('/dashboard');
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

            {/* Empty middle section */}
            <div></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="bg-white py-20 lg:py-32 no-gradients">
        <div className="max-w-2xl mx-auto px-4 lg:px-6">
          <div className="text-center space-y-12 mb-12">
            <div className="neo-card-green inline-block">
              <span className="neo-text-medium text-black">🎯 WELCOME BACK, CHAMPION</span>
            </div>
            
            <h1 className="neo-text-huge text-black">
              CONTINUE YOUR
              <span className="block" style={{
                color: 'hsl(var(--neon-green))'
              }}>
                TRANSFORMATION
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
                    placeholder="ENTER YOUR PASSWORD"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
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
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="neo-text-medium text-black underline hover:no-underline"
                  style={{ color: 'hsl(var(--neon-green))' }}
                >
                  FORGOT PASSWORD?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full neo-button-primary text-xl py-6"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>SIGNING IN...</span>
                  </div>
                ) : (
                  'SIGN IN'
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
                NEW TO THE GRYT?{' '}
                <Link
                  to="/signup"
                  className="underline font-black"
                  style={{ color: 'hsl(var(--neon-green))' }}
                >
                  CREATE ACCOUNT
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
