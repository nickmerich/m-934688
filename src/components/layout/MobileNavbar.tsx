
import React, { useState } from 'react';
import { Bell, Search, Settings, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '📅', label: 'Habits', path: '/habits' },
  { icon: '🎯', label: 'Goals', path: '/goals' },
  { icon: '📈', label: 'Analytics', path: '/analytics' },
  { icon: '👤', label: 'Profile', path: '/profile' },
  { icon: '🔧', label: 'Integrations', path: '/integrations' },
];

export function MobileNavbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="md:hidden border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <img 
              src="/lovable-uploads/62433d31-9986-454a-9285-9bda4b300e80.png" 
              alt="The Gryt" 
              className="h-8 w-8 object-contain"
            />
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-sm animate-pulse-gentle"></div>
          </div>
          <div className="text-lg font-bold">
            <span className="text-white">The </span>
            <span className="text-green-500 glow-text">Gryt</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-500 text-xs flex items-center justify-center p-0">
              3
            </Badge>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gray-900 border-gray-800">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="/lovable-uploads/62433d31-9986-454a-9285-9bda4b300e80.png" 
                      alt="The Gryt" 
                      className="h-6 w-6 object-contain"
                    />
                    <span className="text-sm font-bold text-white">The <span className="text-green-500">Gryt</span></span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 py-4">
                  <div className="space-y-2">
                    {menuItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Button
                          key={item.path}
                          variant="ghost"
                          onClick={() => navigate(item.path)}
                          className={`w-full justify-start text-left h-12 ${
                            isActive 
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                              : 'text-gray-300 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          <span className="mr-3 text-lg">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* User Profile */}
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">Champion</div>
                      <div className="text-xs text-gray-400">Level 3 Warrior</div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="px-4 pb-3 border-t border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search habits, goals..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
            />
          </div>
        </div>
      )}
    </nav>
  );
}
