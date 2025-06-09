
import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'impact' | 'notification';

export function useHapticFeedback() {
  const triggerHaptic = useCallback((type: HapticType = 'light') => {
    // Check if device supports haptics
    if ('vibrate' in navigator) {
      switch (type) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(20);
          break;
        case 'heavy':
          navigator.vibrate([30, 10, 30]);
          break;
        case 'selection':
          navigator.vibrate(5);
          break;
        case 'impact':
          navigator.vibrate([20, 10, 20]);
          break;
        case 'notification':
          navigator.vibrate([40, 20, 40, 20, 40]);
          break;
        default:
          navigator.vibrate(10);
      }
    }
  }, []);

  return { triggerHaptic };
}
