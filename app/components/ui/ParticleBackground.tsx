'use client'
import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particleContainer = containerRef.current;
    if (!particleContainer) return;

    while (particleContainer.firstChild) {
      particleContainer.removeChild(particleContainer.firstChild);
    }

    const numParticles = 30;
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.position = 'absolute';
      particle.style.backgroundColor = 'var(--accent-color-lighter)';
      particle.style.borderRadius = '50%';
      particle.style.opacity = '0.1';
      particle.style.animationName = 'move-particles';
      particle.style.animationTimingFunction = 'linear';
      particle.style.animationIterationCount = 'infinite';


      particle.style.width = `${Math.random() * 2 + 1}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particleContainer.appendChild(particle);
    }
  }, []);

  return <div ref={containerRef} className="particles fixed top-0 left-0 right-0 bottom-0 overflow-hidden z-0" />;
};

export default ParticleBackground;
