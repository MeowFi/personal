'use client'

import React from 'react';
import Navigation from './Navigation'
import Footer from './Footer'
import BootOverlay from './BootOverlay'
import { useKonamiCode } from '@/app/hooks/useKonamiCode'

interface MainLayoutClientProps {
  children: React.ReactNode;
}

const MainLayoutClient: React.FC<MainLayoutClientProps> = ({ children }) => {
  useKonamiCode(
    () => {
      console.log("Konami activated! Nyan nyan!");
      const event = new CustomEvent('runConsoleCommand', { detail: { command: `konami` } });
      document.dispatchEvent(event);
    },
    () => {
      console.log("Konami deactivated.");
      const event = new CustomEvent('runConsoleCommand', { detail: { command: `konami` } });
      document.dispatchEvent(event);
    }
  );

  return (
    <>
      <BootOverlay />
      <Navigation />
      <main className="container mx-auto px-6 py-16 space-y-24 sm:space-y-32">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayoutClient;
