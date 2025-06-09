
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';

interface MobileOptimizedCardProps {
  children: React.ReactNode;
  className?: string;
  onTap?: () => void;
  hapticType?: 'light' | 'medium' | 'heavy' | 'selection';
  animated?: boolean;
}

export function MobileOptimizedCard({ 
  children, 
  className = '', 
  onTap, 
  hapticType = 'light',
  animated = true 
}: MobileOptimizedCardProps) {
  const { triggerHaptic } = useHapticFeedback();

  const handleTap = () => {
    if (onTap) {
      triggerHaptic(hapticType);
      onTap();
    }
  };

  return (
    <Card 
      className={`
        ${onTap ? 'cursor-pointer touch-manipulation' : ''}
        ${animated ? 'transition-all duration-200 active:scale-95 hover:shadow-lg' : ''}
        min-h-[44px]
        ${className}
      `}
      onClick={handleTap}
    >
      {children}
    </Card>
  );
}

interface MobileCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileCardHeader({ children, className = '' }: MobileCardHeaderProps) {
  return (
    <CardHeader className={`pb-3 ${className}`}>
      {children}
    </CardHeader>
  );
}

interface MobileCardContentProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export function MobileCardContent({ children, className = '', padding = 'md' }: MobileCardContentProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <CardContent className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </CardContent>
  );
}
