
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
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

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
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
  };

  return (
    <div className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300 ${
      isCollapsed ? 'lg:w-16' : 'lg:w-64'
    }`}>
      <div className="flex flex-col flex-grow bg-white border-r-4 border-black">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-6 py-8 border-b-4 border-black">
          <div className="neo-card-green inline-block">
            <span className={`neo-text-medium text-black ${isCollapsed ? 'hidden' : ''}`}>THE GRYT</span>
            {isCollapsed && <span className="neo-text-medium text-black">TG</span>}
          </div>
        </div>

        {/* Toggle Button */}
        {onToggle && (
          <div className="px-6 py-2 border-b-2 border-black">
            <Button
              onClick={onToggle}
              className="neo-button w-full text-xs"
            >
              {isCollapsed ? '→' : '←'}
            </Button>
          </div>
        )}

        {/* User Info */}
        {user && !isCollapsed && (
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
        <nav className="flex-1 px-6 py-8 space-y-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-bold border-4 border-black transition-all duration-200 ${
                  isActive
                    ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-black hover:bg-gray-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : ''}
              >
                <IconComponent
                  className={`h-5 w-5 ${
                    isActive ? 'text-white' : 'text-black'
                  } ${isCollapsed ? '' : 'mr-3'}`}
                  strokeWidth={3}
                />
                {!isCollapsed && (
                  <>
                    {item.name}
                    {item.name === 'AI PARTNER' && (
                      <Badge className="ml-auto bg-yellow-400 text-black border-2 border-black">
                        NEW
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out Button */}
        <div className="px-6 py-4 border-t-4 border-black">
          <Button
            onClick={handleSignOut}
            className={`neo-button w-full flex items-center justify-center space-x-2 ${
              isCollapsed ? 'px-2' : ''
            }`}
            title={isCollapsed ? 'SIGN OUT' : ''}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>SIGN OUT</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
