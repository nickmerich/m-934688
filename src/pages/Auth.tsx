
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as any)?.from || '/dashboard';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(formData.email, formData.password);
    
    if (!error) {
      navigate(from);
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    
    setIsLoading(true);
    
    const { error } = await signUp(formData.email, formData.password, formData.fullName);
    
    if (!error) {
      // User will be redirected after email confirmation
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white no-gradients">
      {/* Navigation */}
      <nav className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="neo-button flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>BACK TO HOME</span>
            </Link>
            <div></div>
          </div>
        </div>
      </nav>

      {/* Auth Form */}
      <section className="bg-white py-20 lg:py-32 no-gradients">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <div className="neo-card-green inline-block mb-6">
              <span className="neo-text-medium text-black">🔐 AUTHENTICATION</span>
            </div>
            <h1 className="neo-text-huge text-black mb-4">
              JOIN THE
              <span className="block" style={{ color: 'hsl(var(--neon-green))' }}>
                JOURNEY
              </span>
            </h1>
            <p className="neo-text-medium text-black">
              TRACK YOUR HABITS AND ACHIEVE YOUR GOALS
            </p>
          </div>

          <Card className="neo-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="neo-text-big text-black">GET STARTED</CardTitle>
              <CardDescription className="neo-text-medium text-black opacity-70">
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
                  <TabsTrigger value="signin" className="neo-text-medium data-[state=active]:bg-white data-[state=active]:text-black">
                    SIGN IN
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="neo-text-medium data-[state=active]:bg-white data-[state=active]:text-black">
                    SIGN UP
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="neo-text-medium text-black">
                        EMAIL
                      </Label>
                      <Input
                        id="signin-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="neo-border bg-white text-black placeholder:text-black/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="neo-text-medium text-black">
                        PASSWORD
                      </Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="neo-border bg-white text-black placeholder:text-black/60 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="neo-button-primary w-full"
                    >
                      {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="neo-text-medium text-black">
                        FULL NAME
                      </Label>
                      <Input
                        id="signup-name"
                        name="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="neo-border bg-white text-black placeholder:text-black/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="neo-text-medium text-black">
                        EMAIL
                      </Label>
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="neo-border bg-white text-black placeholder:text-black/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="neo-text-medium text-black">
                        PASSWORD
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          minLength={6}
                          className="neo-border bg-white text-black placeholder:text-black/60 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm" className="neo-text-medium text-black">
                        CONFIRM PASSWORD
                      </Label>
                      <Input
                        id="signup-confirm"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="neo-border bg-white text-black placeholder:text-black/60"
                      />
                      {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-red-500 text-sm">Passwords do not match</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading || (formData.password !== formData.confirmPassword)}
                      className="neo-button-primary w-full"
                    >
                      {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Auth;
