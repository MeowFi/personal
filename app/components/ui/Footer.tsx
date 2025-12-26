'use client'
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [lastCommitTime, setLastCommitTime] = useState('');
  const [isCatAnimating, setIsCatAnimating] = useState(false);

  const triggerCatAnimation = () => {
    if (isCatAnimating) return;

    setIsCatAnimating(true);
    setTimeout(() => {
        setIsCatAnimating(false);
    }, 500);
  };

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setLastCommitTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    triggerCatAnimation();

    document.addEventListener('animateFooterCat', triggerCatAnimation);

    return () => {
      document.removeEventListener('animateFooterCat', triggerCatAnimation);
    };
  }, []);

  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 mt-24 sm:mt-32">
      <div className="container mx-auto px-6 py-10 text-center text-slate-500">
        <p className="font-fira-code text-sm">
          &copy; <span id="currentYear">{currentYear}</span> MeowFi // Deployed on Solana Grid // Built with Rust &{' '}
          <span className="footer-cat-container">
            <span id="footerCat" className={`inline-block footer-cat-span ${isCatAnimating ? 'footer-cat-animate' : ''}`}>
              ᓚᘏᗢ
            </span>
          </span>
        </p>
        <p className="text-xs mt-2">
          This site is an ongoing experiment. Last commit: <span id="lastCommitTime">{lastCommitTime}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
