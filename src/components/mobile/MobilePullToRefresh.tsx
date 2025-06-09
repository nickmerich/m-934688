
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { usePullToRefresh } from '@/hooks/use-mobile-gestures';

interface MobilePullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export function MobilePullToRefresh({ onRefresh, children, className = '' }: MobilePullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const containerRef = usePullToRefresh(handleRefresh);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Pull to refresh indicator */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-16 -translate-y-16 bg-gray-900/80 backdrop-blur-sm z-10">
        <RefreshCw 
          className={`h-5 w-5 text-green-400 transition-transform duration-300 ${
            isRefreshing ? 'animate-spin' : ''
          }`} 
        />
        <span className="ml-2 text-sm text-gray-300">
          {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
        </span>
      </div>
      
      {children}
    </div>
  );
}
