const HeroTerminalCard = () => {
  return (
    <div className="hero-terminal-card relative w-full p-4 rounded-lg overflow-hidden shadow-2xl bg-slate-800/70 border border-slate-700/50">
      <div className="flex items-center mb-4 space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <div className="ml-auto text-xs font-fira-code text-slate-500">meowfi-term</div>
      </div>

      <div className="space-y-3 font-fira-code text-sm text-slate-300">
        <div className="space-y-1">
          <div><span className="text-blue-400/70">$ </span><span className="text-slate-100">whoami</span></div>
          <p className="pl-2">@MeowFi - Backend & Solana Developer</p>
        </div>
        <div className="space-y-1">
          <div><span className="text-blue-400/70">$ </span><span className="text-slate-100">current_focus</span></div>
          <p className="pl-2">#Rust, #Solana, #DistributedSystems</p>
        </div>
        <div className="space-y-1">
          <div><span className="text-blue-400/70">$ </span><span className="text-slate-100">cat ~/learning.log | tail -n 1</span></div>
          <p className="pl-2">Advanced Smart Contract Patterns</p>
        </div>
        <div className="space-y-1">
          <div><span className="text-blue-400/70">$ </span><span className="text-slate-100">echo $FUN_FACT</span></div>
          <p className="pl-2">AI won&apos;t take your job—people who use it will 😉</p>
        </div>
        <div>
          <span className="text-blue-400/70">$ </span><span className="terminal-cursor-style"></span>
        </div>
      </div>
    </div>
  );
};

export default HeroTerminalCard;
