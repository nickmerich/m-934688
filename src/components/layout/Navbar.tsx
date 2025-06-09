
import React from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Enhanced Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative bg-gray-950 py-0">
            <img 
              src="/lovable-uploads/f846faf6-830e-4f67-828a-5af1b2a8eb01.png" 
              alt="The Gryt" 
              className="h-10 w-10 object-contain" 
            />
            <div className="absolute inset-0 bg-green-500/20 blur-sm animate-pulse-gentle my-0 rounded-md px-0"></div>
          </div>
          <div className="text-xl font-bold">
            <span className="text-white">The </span>
            <span className="glow-text text-slate-50">Gryt</span>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search habits, goals..." 
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300" 
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative group">
            <div className="relative">
              <Bell className="h-5 w-5 transition-transform group-hover:scale-110" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-xs flex items-center justify-center p-0 animate-pulse-gentle">
                3
              </Badge>
            </div>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white group">
            <Settings className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white group">
            <User className="h-5 w-5 transition-transform group-hover:scale-110" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
