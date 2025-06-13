
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  Home, 
  Target, 
  BarChart3, 
  Settings, 
  Zap, 
  User,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'DASHBOARD', href: '/dashboard', icon: Home },
    { name: 'HABITS', href: '/habits', icon: Zap },
    { name: 'GOALS', href: '/goals', icon: Target },
    { name: 'ANALYTICS', href: '/analytics', icon: BarChart3 },
    { name: 'INTEGRATIONS', href: '/integrations', icon: Settings },
    { name: 'AI PARTNER', href: '/ai-habit-partner', icon: Sparkles },
    { name: 'PROFILE', href: '/profile', icon: User },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Header */}
      <div className="bg-white border-b-4 border-black">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/c3193544-bf00-4f06-a79a-b09dee14a047.png" 
              alt="The Gryt Bear Logo" 
              className="h-8 w-8 object-contain" 
            />
            <span className="neo-text-medium text-black">THE GRYT</span>
          </div>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="neo-button">
                <Menu className="h-5 w-5" strokeWidth={3} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white border-l-4 border-black p-0">
              <div className="flex flex-col h-full">
                {/* Header with Bear Logo */}
                <div className="px-6 py-6 border-b-4 border-black">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/lovable-uploads/c3193544-bf00-4f06-a79a-b09dee14a047.png" 
                      alt="The Gryt Bear Logo" 
                      className="h-10 w-10 object-contain" 
                    />
                    <span className="neo-text-medium text-black">THE GRYT</span>
                  </div>
                </div>

                {/* User Info */}
                {user && (
                  <div className="px-6 py-4 border-b-4 border-black">
                    <div className="neo-card-pink p-3">
                      <p className="neo-text-medium text-black truncate">
                        {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                      </p>
                      <p className="text-sm text-black/70 truncate">{user.email}</p>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 px-6 py-6 space-y-4">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    const IconComponent = item.icon;
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center px-4 py-3 text-sm font-bold border-4 border-black transition-all duration-200 ${
                          isActive
                            ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                            : 'bg-white text-black hover:bg-gray-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        }`}
                      >
                        <IconComponent
                          className={`mr-3 h-5 w-5 ${
                            isActive ? 'text-white' : 'text-black'
                          }`}
                          strokeWidth={3}
                        />
                        {item.name}
                        {item.name === 'AI PARTNER' && (
                          <Badge className="ml-auto bg-yellow-400 text-black border-2 border-black">
                            NEW
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Sign Out Button */}
                <div className="px-6 py-6 border-t-4 border-black">
                  <Button
                    onClick={handleSignOut}
                    className="neo-button w-full flex items-center justify-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>SIGN OUT</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
