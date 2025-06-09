
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Zap, Target, BarChart3, User } from 'lucide-react';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';

const navigationItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Habits', href: '/habits', icon: Zap },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/profile', icon: User },
];

export function MobileBottomNavigation() {
  const location = useLocation();
  const { triggerHaptic } = useHapticFeedback();

  const handleNavClick = () => {
    triggerHaptic('selection');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          const IconComponent = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={handleNavClick}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 px-1 py-2 text-xs transition-colors duration-200 ${
                isActive
                  ? 'text-green-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <IconComponent 
                className={`h-5 w-5 mb-1 transition-transform duration-200 ${
                  isActive ? 'scale-110' : ''
                }`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`truncate font-medium ${
                isActive ? 'text-green-400' : 'text-gray-400'
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
