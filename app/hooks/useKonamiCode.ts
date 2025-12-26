'use client'
import { useEffect, useState, useCallback } from 'react';

const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function useKonamiCode(onActivate: () => void, onDeactivate: () => void) {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    const sequenceKey = konamiSequence[konamiIndex];

    // Guard against undefined keys or index out of bounds.
    if (typeof key !== 'string' || typeof sequenceKey !== 'string') {
      setKonamiIndex(0);
      return;
    }

    if (key.toLowerCase() === sequenceKey.toLowerCase()) {
      const newIndex = konamiIndex + 1;
      setKonamiIndex(newIndex);

      if (newIndex === konamiSequence.length) {
        if (isActive) {
          onDeactivate();
          document.body.classList.remove('konami-mode-active');
        } else {
          onActivate();
          document.body.classList.add('konami-mode-active');
        }
        setIsActive(prev => !prev);
        setKonamiIndex(0);
      }
    } else {
      // Reset only if the pressed key is not part of the Konami sequence at all.
      // This prevents an accidental reset if the user presses a sequence key out of order.
      const isKeyInSequence = konamiSequence.some(
        (val) => val.toLowerCase() === key.toLowerCase()
      );

      if (!isKeyInSequence) {
        setKonamiIndex(0);
      }
    }
  }, [konamiIndex, isActive, onActivate, onDeactivate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return isActive;
}
