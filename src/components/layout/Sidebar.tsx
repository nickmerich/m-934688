
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Target, 
  Calendar, 
  Users, 
  Trophy, 
  User,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Habits', path: '/habits' },
  { icon: Target, label: 'Goals', path: '/goals' },
  { icon: Trophy, label: 'Analytics', path: '/analytics' },
  { icon: Users, label: 'Community', path: '/community' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={cn(
      "bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800",
                isActive && "bg-green-500/10 text-green-500 border border-green-500/20",
                isCollapsed ? "px-2" : "px-4"
              )}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-500 mb-2">Your Progress</div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-sm text-white font-medium">Level 3 Warrior</div>
            <div className="text-xs text-gray-400">750 / 1000 XP</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
