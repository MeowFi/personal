'use client'
import { useTypingEffect } from '@/app/hooks/useTypingEffect';

interface TypingAnimationProps {
  terms: string[];
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ terms }) => {
  const currentTerm = useTypingEffect({ terms });

  return (
    <>
      <span className="text-blue-400 font-medium">{currentTerm}</span>
      <span className="typing-cursor"></span>
    </>
  );
};

export default TypingAnimation;
