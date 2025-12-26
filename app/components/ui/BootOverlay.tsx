'use client'
import { useState, useEffect, useRef } from 'react'

const bootLines = [
  "Meow-OS v3.0 Initializing...",
  "Booting from /dev/purr-drive1...",
  "Kernel version: 5.4.0-MEOW (purrfectly_stable)",
  "Loading paw-ipherals...",
  "  [OK] Mouse detected (expecting laser pointer input)",
  "  [OK] Keyboard detected (for scritching commands)",
  "  [OK] Network interface eth0 (connected to CatNet)",
  "Checking file systems...",
  "Loading Cat Utilities...",
  "Starting system services:",
  "  [OK] PurrD (daemon for optimal purring)",
  "  [OK] Nyanimation Engine (for visual flair)",
  "System Ready. Welcome to MeowFi's Lair!",
  ""
];

const TYPING_SPEED_CHAR_MS = 10; 
const TYPING_SPEED_LINE_DELAY_MS = 20;
const FINAL_FADEOUT_DELAY_MS = 200; 

const BootOverlay = () => {
  const [bootText, setBootText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  
  const charIndexInLineRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const clearExistingTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    if (!isVisible) {
      clearExistingTimer();
      return;
    }

    if (currentLineIndex >= bootLines.length) {
      clearExistingTimer();
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, FINAL_FADEOUT_DELAY_MS);
      return () => clearExistingTimer();
    }

    const typeCurrentLine = () => {
      clearExistingTimer();

      const currentLine = bootLines[currentLineIndex];
      
      if (typeof currentLine !== 'string') {
        setCurrentLineIndex(prev => prev + 1);
        return;
      }

      if (charIndexInLineRef.current < currentLine.length) {
        const charToAppend = currentLine[charIndexInLineRef.current];
        setBootText(prev => prev + charToAppend);
        charIndexInLineRef.current++;
        
        timerRef.current = setTimeout(typeCurrentLine, TYPING_SPEED_CHAR_MS);
      } else {
        setBootText(prev => prev + '\n');
        setCurrentLineIndex(prevLineIndex => prevLineIndex + 1);
        charIndexInLineRef.current = 0;
      }
    };

    timerRef.current = setTimeout(typeCurrentLine, TYPING_SPEED_LINE_DELAY_MS);

    return () => clearExistingTimer();

  }, [currentLineIndex, isVisible]);


  const overlayClassName = `fixed top-0 left-0 w-screen h-screen bg-black text-[#00ff00] font-fira-code text-base p-5 z-[10000] flex flex-col transition-opacity duration-500 ease-out ${
    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`;

  return (
    <div id="bootOverlay" className={overlayClassName}>
      <pre id="bootText" className="whitespace-pre-wrap">
        {bootText}
      </pre>
      {isVisible && currentLineIndex < bootLines.length && (
        <span
          className="inline-block bg-[#00ff00] w-2 h-[1em] animate-blink"
          style={{ animationTimingFunction: 'step-end', animationDuration: '0.7s' }}
        ></span>
      )}
    </div>
  );
};

export default BootOverlay;
