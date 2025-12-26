'use client'
import React, { useState, FormEvent } from 'react';
import { FadeInSection } from '../../hooks/useIntersectionObserver';

interface GuestbookEntryData {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const initialEntries: GuestbookEntryData[] = [
  { id: "1", name: "@DevDude", message: "Awesome site, MeowFi! Love the terminal vibes. 🚀", timestamp: "May 28, 2025" },
  { id: "2", name: "@CatLover_JS", message: "Purrfectly designed! The AI console is super cool. ᓚᘏᗢ", timestamp: "May 25, 2025" },
];

// GuestbookEntry Component (can be co-located or separate)
const GuestbookEntry: React.FC<GuestbookEntryData & { isNew?: boolean }> = ({ name, message, timestamp, isNew }) => (
  <div className={`guestbook-entry bg-slate-800/70 p-4 rounded-md border border-slate-700 ${isNew ? 'animate-pulse-once' : ''}`}>
    <p className="text-sm text-slate-300 break-words whitespace-pre-wrap">&quot;{message}&quot;</p>
    <p className="text-xs text-slate-500 mt-1 text-right">- {name} ({timestamp})</p>
  </div>
);


const GuestbookSection = () => {
  const [entries, setEntries] = useState<GuestbookEntryData[]>(initialEntries);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [tempAlert, setTempAlert] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (guestMessage.trim() === "") {
      setTempAlert("Meow-ssage cannot be empty!");
      setTimeout(() => setTempAlert(null), 3000);
      return;
    }

    const newEntry: GuestbookEntryData = {
      id: Date.now().toString(), // Simple ID for client-side
      name: guestName.trim() || "Anonymous",
      message: guestMessage.trim(),
      timestamp: "Just Now",
    };

    setEntries(prevEntries => [newEntry, ...prevEntries]);
    setGuestName('');
    setGuestMessage('');

    // For console feedback via custom event
    const consoleEvent = new CustomEvent('runConsoleCommand', {
      detail: { command: `echo "New Meow-ssage from ${newEntry.name}! (Mock Submission)"` }
    });
    document.dispatchEvent(consoleEvent);
  };

  return (
    <FadeInSection id="guestbook" className="scroll-mt-24" scrollMarginTop='96px'>
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center gradient-text-neon font-fira-code">
        <span className="text-blue-400 text-2xl mr-2">💌</span>cat guestbook.log
      </h2>
      <div className="max-w-2xl mx-auto section-card-mixed p-8 rounded-xl">
        {tempAlert && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-[10001]">
            {tempAlert}
          </div>
        )}
        <form id="guestbookForm" onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label htmlFor="guestName" className="block text-sm font-medium text-slate-300 mb-1">Name:</label>
            <input
              type="text"
              id="guestName"
              name="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-500"
              placeholder="Your Name / Handle"
            />
          </div>
          <div>
            <label htmlFor="guestMessage" className="block text-sm font-medium text-slate-300 mb-1">Meow-ssage:</label>
            <textarea
              id="guestMessage"
              name="guestMessage"
              rows={3}
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-500"
              placeholder="Leave a friendly meow-ssage!"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
            aria-label="Submit guestbook message"
          >
            Send Meow-ssage (Mock)
          </button>
        </form>
        <div id="guestbookEntries" className="space-y-4">
          {entries.map((entry, index) => (
            <GuestbookEntry key={entry.id} {...entry} isNew={index === 0 && entry.timestamp === "Just Now"} />
          ))}
        </div>
      </div>
    </FadeInSection>
  );
};

export default GuestbookSection;