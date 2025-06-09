
import { useEffect, useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export function useSwipeGestures(handlers: SwipeHandlers) {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          handlers.onSwipeLeft?.();
        } else {
          handlers.onSwipeRight?.();
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          handlers.onSwipeUp?.();
        } else {
          handlers.onSwipeDown?.();
        }
      }
    }
  };

  return { handleTouchStart, handleTouchEnd };
}

export function usePullToRefresh(onRefresh: () => void | Promise<void>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isRefreshing = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0 && !isRefreshing.current) {
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (container.scrollTop === 0 && !isRefreshing.current) {
        currentY.current = e.touches[0].clientY;
        const deltaY = currentY.current - startY.current;
        
        if (deltaY > 0 && deltaY < 100) {
          e.preventDefault();
          container.style.transform = `translateY(${deltaY / 3}px)`;
        }
      }
    };

    const handleTouchEnd = async () => {
      if (container.scrollTop === 0 && !isRefreshing.current) {
        const deltaY = currentY.current - startY.current;
        
        if (deltaY > 60) {
          isRefreshing.current = true;
          container.style.transform = 'translateY(60px)';
          await onRefresh();
          isRefreshing.current = false;
        }
        
        container.style.transform = 'translateY(0)';
        container.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
          container.style.transition = '';
        }, 300);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh]);

  return containerRef;
}
