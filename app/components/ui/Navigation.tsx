'use client'

import Link from 'next/link'
import React, { useRef } from 'react'
import { useScrollActiveLink } from '@/app/hooks/useScrollActiveLink'

const navLinkData = [
  { href: '#about', label: 'cat about.md', aria: 'Navigate to About section' },
  { href: '#stack', label: 'ls -l /toolkit', aria: 'Navigate to Stack and Tools section' },
  { href: '#projects', label: 'ls projects/', aria: 'Navigate to Projects section' },
  { href: '#building', label: 'git log -1', aria: 'Navigate to Now Building and Learning Log section' },
  { href: '#contact', label: 'nano contact.txt', aria: 'Navigate to Contact section' },
]

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const activeSection = useScrollActiveLink(navLinkData, navRef);
  const [isSticky, setIsSticky] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        setIsSticky(window.scrollY > navRef.current.offsetHeight + 20);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <nav
      id="mainNav"
      ref={navRef}
      className={`py-3 transition-all duration-300 font-fira-code text-sm ${
        isSticky ? 'nav-sticky' : ''
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold gradient-text-neon" aria-label="Homepage, MeowFi.sol">
          MeowFi.sol
        </Link>
        <div className="hidden sm:flex space-x-2 sm:space-x-3">
          {navLinkData.map(link => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.aria}
              className={`px-2 py-1 rounded-md transition-colors hover:text-blue-400 ${
                activeSection === link.href.substring(1) ? 'nav-active' : 'text-gray-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
