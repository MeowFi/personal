'use client'
import React, { useEffect, useRef, CSSProperties, ElementType, FC, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
  id?: string;
  scrollMarginTop?: string;
  threshold?: number;
  triggerOnce?: boolean;
  animationDelay?: string;
}

export const FadeInSection: FC<FadeInSectionProps> = ({
  children,
  className,
  as: Tag = 'section',
  style,
  id,
  scrollMarginTop,
  threshold = 0.1,
  triggerOnce = true,
  animationDelay,
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  const combinedClassName = `fade-in-section ${className || ''}`.trim();
  
  const combinedStyle: CSSProperties = {
    ...style,
    ...(scrollMarginTop && { scrollMarginTop }),
    ...(animationDelay && { animationDelay }),
  };

  const props = {
    ref: ref as any, // Using 'as any' here is a pragmatic way to handle dynamic tag refs in TypeScript
    id,
    className: combinedClassName,
    style: combinedStyle,
  };

  return React.createElement(Tag, props, children);
};
