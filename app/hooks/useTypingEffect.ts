'use client'
import { useState, useEffect, useCallback } from 'react';

interface UseTypingEffectOptions {
  terms: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
}

export function useTypingEffect({
  terms,
  typingSpeed = 120,
  deletingSpeed = 50,
  pauseDelay = 1500,
}: UseTypingEffectOptions): string {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTyping = useCallback(() => {
    const fullTerm = terms[currentIndex % terms.length];
    
    if (isDeleting) {
      // Handle deleting
      setCurrentText(prev => prev.substring(0, prev.length - 1));
    } else {
      // Handle typing
      setCurrentText(prev => fullTerm.substring(0, prev.length + 1));
    }

    // Logic for switching states
    if (!isDeleting && currentText === fullTerm) {
      // Finished typing, pause then start deleting
      setTimeout(() => setIsDeleting(true), pauseDelay);
    } else if (isDeleting && currentText === '') {
      // Finished deleting, move to next term
      setIsDeleting(false);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, currentText, isDeleting, terms, pauseDelay]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [handleTyping, currentText, isDeleting, deletingSpeed, typingSpeed]);

  return currentText;
}