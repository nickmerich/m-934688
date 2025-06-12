
import React from 'react';
import { Target, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { EnhancedStatsOverview } from '@/components/dashboard/EnhancedStatsOverview';
import { useIsMobile } from '@/hooks/use-mobile';

export function StatsOverview() {
  const isMobile = useIsMobile();

  // For mobile, we'll use the enhanced version with better charts
  if (isMobile) {
    return <EnhancedStatsOverview />;
  }

  // Desktop version with enhanced visuals
  return <EnhancedStatsOverview />;
}
