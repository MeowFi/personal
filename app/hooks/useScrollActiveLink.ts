'use client'
import { useState, useEffect, RefObject } from 'react';

interface NavLink {
  href: string;
  // any other properties your nav links might have
}

export function useScrollActiveLink(
  navLinks: NavLink[],
  navRef: RefObject<HTMLElement>,
  offsetMargin = 150 // How close to the top of the viewport a section needs to be to be "active"
): string {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      const navHeight = navRef.current?.offsetHeight || 60; // Default if navRef not ready

      for (const link of navLinks) {
        const sectionId = link.href.startsWith('#') ? link.href.substring(1) : null;
        if (!sectionId) continue;

        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          // Check if the top of the section is within a certain range from the top of the viewport,
          // considering the nav height and an additional offset.
          if (window.scrollY >= sectionTop - navHeight - offsetMargin) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navLinks, navRef, offsetMargin]);

  return activeSection;
}