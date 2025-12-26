'use client'
import React, { useState, useEffect, useRef, useCallback, KeyboardEvent as ReactKeyboardEvent } from 'react';

declare const Tone: any;

interface CommandDefinition {
  description: string;
  usage?: string;
  action: (args?: string[]) => void | Promise<void>;
}
interface Commands {
  [key: string]: CommandDefinition;
}
interface OutputLine {
  id: string;
  type: 'command' | 'info' | 'error';
  content: string;
}

const InteractiveConsole = () => {
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const consoleOutputRef = useRef<HTMLDivElement>(null);
  const consoleInputRef = useRef<HTMLInputElement>(null);

  const audioRef = useRef<{ synth: any; sequence: any; isReady: boolean; isPlaying: boolean; }>({
    synth: null,
    sequence: null,
    isReady: false,
    isPlaying: false,
  });

  const generateId = () => `line-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const appendLine = (content: string, type: OutputLine['type']) => {
    setOutput(prev => [...prev, { id: generateId(), type, content }]);
  };

  const setupAudio = () => {
    if (typeof Tone === 'undefined' || audioRef.current.isReady) return;

    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'square' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.1 },
    }).toDestination();
    
    const melody = [
      { time: '0:0:0', note: 'B4', dur: '16n' }, { time: '0:0:1', note: 'E5', dur: '16n' },
      { time: '0:0:2', note: 'F#5', dur: '16n' }, { time: '0:0:3', note: 'G#5', dur: '16n' },
      { time: '0:1:0', note: 'E5', dur: '8n' }, { time: '0:1:2', note: 'G#5', dur: '16n' },
      { time: '0:1:3', note: 'F#5', dur: '16n' }, { time: '0:2:0', note: 'E5', dur: '16n' },
      { time: '0:2:1', note: 'C#5', dur: '16n' }, { time: '0:2:2', note: 'B4', dur: '8n' },
      { time: '0:3:0', note: 'B4', dur: '16n' }, { time: '0:3:1', note: 'C#5', dur: '16n' },
      { time: '0:3:2', note: 'E5', dur: '8n' },
    ];

    type MelodyStep = { time: string; note: string; dur: string };

    const sequence = new Tone.Part(
      (time: number, value: MelodyStep) => {
        synth.triggerAttackRelease(value.note, value.dur, time);
      },
      melody as MelodyStep[]
    );
    
    sequence.loop = true;
    sequence.loopEnd = '1m';
    
    audioRef.current = { synth, sequence, isReady: true, isPlaying: false };
    console.log("Theme song ready.");
  };

  const playThemeSong = useCallback(async () => {
    if (typeof Tone === 'undefined') {
      appendLine("Audio library not loaded yet.", 'error');
      return;
    }
    if (!audioRef.current.isReady) {
      setupAudio();
    }
    if (audioRef.current.isReady && !audioRef.current.isPlaying) {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }
      Tone.Transport.start();
      audioRef.current.sequence.start(0);
      audioRef.current.isPlaying = true;
      appendLine("Playing theme song... 🎶", 'info');
    }
  }, [appendLine]);

  const stopThemeSong = useCallback(() => {
    if (audioRef.current.isReady && audioRef.current.isPlaying) {
      Tone.Transport.stop();
      audioRef.current.sequence.stop();
      audioRef.current.isPlaying = false;
      appendLine("Theme song stopped.", 'info');
    }
  }, [appendLine]);

  useEffect(() => {
    const playHandler = () => playThemeSong();
    const stopHandler = () => stopThemeSong();
    document.addEventListener('playThemeSong', playHandler);
    document.addEventListener('stopThemeSong', stopHandler);
    return () => {
      document.removeEventListener('playThemeSong', playHandler);
      document.removeEventListener('stopThemeSong', stopHandler);
      if (audioRef.current.isReady) {
        Tone.Transport.stop();
        Tone.Transport.cancel();
      }
    };
  }, [playThemeSong, stopThemeSong]);

  const commands: Commands = {
    meow: {
      description: "Get a greeting from the cat and trigger an animation.",
      action: () => {
        appendLine("ᓚᘏᗢ Purrrrr...", 'info');
        document.dispatchEvent(new CustomEvent('animateFooterCat'));
      },
    },
    cat: {
        description: "Display content of a file.",
        usage: "[filename]",
        action: (args) => {
            const filename = args?.[0];
            if (!filename) {
                appendLine("Usage: cat [filename]", "error");
                return;
            }
            switch (filename) {
                case 'about.md':
                    appendLine("Hey there! I'm @MeowFi. My world revolves around robust backend development and the thrilling frontiers of the Solana ecosystem. I focus on crafting systems that are not just scalable and efficient, but also elegant in their architecture.<br><br>The challenge of complex problem-solving is my fuel, especially at the nexus of high-performance blockchain tech and battle-tested backend principles. If it involves Rust, distributed systems, or pushing web3 boundaries, count me in!", 'info');
                    break;
                case 'philosophy.config':
                    appendLine("[philosophy]<br>clarity_over_complexity = true<br>lifelong_learning_mode = enabled<br>open_source_contributor = active<br>build_for_scale = true<br>security_first_mindset = non_negotiable<br>embrace_the_challenge = always", 'info');
                    break;
                case 'projects':
                case 'projects/':
                    appendLine("Project Nebula (DeFi), Realtime Collab Engine (Elixir)... more on GitHub!", 'info');
                    break;
                case 'contact.txt':
                    appendLine("Open for collaborations or just a friendly chat. Find me on X/Twitter: @MeowfiDev", 'info');
                    break;
                case 'guestbook.log':
                     appendLine("Guestbook entries are displayed on the page. Feel free to leave a meow-ssage! 😉", 'info');
                     break;
                case 'stack':
                    appendLine("Primary technologies: Rust, Solana, Elixir, Next.js, TypeScript, GraphQL, Node.js, PostgreSQL.", 'info');
                    break;
                case 'side_quests':
                    appendLine("CLI Cat Fact Fetcher (Rust)<br>Solana Wallet Watcher (Node.js)<br>Advent of Code (Elixir)", 'info');
                    break;
                default:
                    appendLine(`cat: ${filename}: No such file or directory`, 'error');
            }
        },
    },
    konami: {
        description: "Shows info about the Konami code secret.",
        action: () => appendLine("Hint: Use your keyboard's arrow keys (↑ ↑ ↓ ↓ ← → ← →) and the 'B' and 'A' keys to unlock a secret mode! 😉", 'info'),
    },
    help: {
        description: "Show this help message.",
        action: () => {
          let helpText = "Available commands:\n";
          Object.entries(commands).forEach(([name, { description, usage }]) => {
            helpText += `${name.padEnd(18, ' ')} - ${description}${usage ? ` (Usage: ${name} ${usage})` : ''}\n`;
          });
          appendLine(helpText.trim().replace(/\n/g, '<br>'), 'info');
        }
    },
    ls: {
        description: "List mock files/directories.",
        action: () => appendLine("about.md   projects   stack   contact.txt   philosophy.config   side_quests   guestbook.log", 'info'),
    },
    clear: { description: "Clear the console output.", action: () => setOutput([]) },
    whoami: { description: "Display user info.", action: () => appendLine("You're interacting with MeowFi's digital playground! I'm a backend dev exploring Solana.", 'info') },
    theme: { description: "Change site accent theme.", usage: "set [default|matrix|purple]", action: (args) => { if (args && args[0] === 'set' && args[1]) { const themeName = args[1].toLowerCase(); const root = document.documentElement; let consolePromptColor = '#60a5fa'; if (themeName === 'matrix') { root.style.setProperty('--accent-color', '#34d399'); root.style.setProperty('--accent-color-darker', '#059669'); root.style.setProperty('--accent-color-lighter', '#6ee7b7'); root.style.setProperty('--console-bg', '#0A0A0A'); root.style.setProperty('--console-text', '#00FF00'); consolePromptColor = '#33FF33'; } else if (themeName === 'purple') { root.style.setProperty('--accent-color', '#a855f7'); root.style.setProperty('--accent-color-darker', '#7e22ce'); root.style.setProperty('--accent-color-lighter', '#c084fc'); root.style.setProperty('--console-bg', '#1e1b2e'); root.style.setProperty('--console-text', '#d8b4fe'); consolePromptColor = '#e9d5ff'; } else { root.style.setProperty('--accent-color', '#3b82f6'); root.style.setProperty('--accent-color-darker', '#2563eb'); root.style.setProperty('--accent-color-lighter', '#60a5fa'); root.style.setProperty('--console-bg', '#000000'); root.style.setProperty('--console-text', '#93c5fd'); } root.style.setProperty('--console-prompt', consolePromptColor); appendLine(`Theme set to: ${themeName}`, 'info'); } else { appendLine("Usage: theme set [default|matrix|purple]", 'error'); } } },
    echo: { description: "Display a line of text.", usage: "[text to display]", action: (args) => { if (args && args.length > 0) { appendLine(args.join(" "), 'info'); } else { appendLine("", 'info'); } } },
  };

  const handleCommandExecution = useCallback(async (commandText: string) => {
    appendLine(commandText, 'command');
    const parts = commandText.trim().split(/\s+/);
    const mainCmd = parts[0].toLowerCase();
    const cmdArgs = parts.slice(1);
    if (commands[mainCmd]) {
      const commandAction = commands[mainCmd].action;
      await Promise.resolve(commandAction(cmdArgs));
    } else {
      appendLine(`bash: command not found: ${mainCmd}. Try 'help'.`, 'error');
    }
  }, [commands, appendLine]);

  const handleKeyDown = async (e: ReactKeyboardEvent<HTMLInputElement>) => {
    const inputElement = e.currentTarget;
    if (e.key === 'Tab') {
        e.preventDefault();
        if (input.trim().toLowerCase() === 'theme') {
            setInput('theme set ');
            appendLine('default    matrix    purple', 'info');
            return;
        }
        const parts = input.split(/\s+/);
        const currentWord = parts[parts.length - 1];
        let potentialCompletions: string[] = [];
        let baseCommand = "";
        if (parts.length === 1) {
            potentialCompletions = Object.keys(commands);
            baseCommand = '';
        } else if (parts.length > 1 && parts[0].toLowerCase() === 'cat') {
            potentialCompletions = [ 'about.md', 'philosophy.config', 'projects', 'contact.txt', 'guestbook.log', 'stack', 'side_quests' ];
            baseCommand = parts.slice(0, -1).join(' ') + ' ';
        } else if (parts.length > 1 && parts[0].toLowerCase() === 'theme' && parts[1]?.toLowerCase() === 'set') {
            potentialCompletions = ['default', 'matrix', 'purple'];
            baseCommand = 'theme set ';
        } else { 
            return; 
        }
        const wordToComplete = input.endsWith(' ') ? '' : currentWord;
        const matches = potentialCompletions.filter(item => item.startsWith(wordToComplete));
        if (matches.length === 1) {
            setInput(baseCommand + matches[0] + ' ');
        } else if (matches.length > 1) {
            let prefix = matches[0];
            for (let i = 1; i < matches.length; i++) {
                while (matches[i].indexOf(prefix) !== 0) {
                    prefix = prefix.substring(0, prefix.length - 1);
                    if (prefix === "") break;
                }
            }
            if (prefix.length > wordToComplete.length) {
                setInput(baseCommand + prefix);
            } else {
                appendLine(matches.join('    '), 'info');
            }
        }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const currentInput = input.trim();
      if (currentInput === "") return;
      if (currentInput !== history[0]) {
        setHistory(prev => [currentInput, ...prev].slice(0, 50));
      }
      setHistoryIndex(-1);
      setInput('');
      await handleCommandExecution(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        const nextInput = history[newIndex];
        setInput(nextInput);
        setTimeout(() => inputElement.selectionStart = inputElement.selectionEnd = nextInput.length, 0);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const nextInput = history[newIndex];
        setInput(nextInput);
        setTimeout(() => inputElement.selectionStart = inputElement.selectionEnd = nextInput.length, 0);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (consoleOutputRef.current) {
      consoleOutputRef.current.scrollTop = consoleOutputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    consoleInputRef.current?.focus();
  }, [])

  useEffect(() => {
    const handleRunConsoleCommand = (event: Event) => {
        const customEvent = event as CustomEvent<{ command: string }>;
        if (customEvent.detail && typeof customEvent.detail.command === 'string') {
            const commandToRun = customEvent.detail.command.trim();
            if (commandToRun) {
                if (commandToRun !== history[0]) {
                    setHistory(prev => [commandToRun, ...prev].slice(0, 50));
                }
                setHistoryIndex(-1);
                setInput('');
                handleCommandExecution(commandToRun);
            }
        }
    };
    document.addEventListener('runConsoleCommand', handleRunConsoleCommand);
    return () => {
        document.removeEventListener('runConsoleCommand', handleRunConsoleCommand);
    };
  }, [history, handleCommandExecution]);

  return (
    <div
      id="easterEggConsole"
      className="font-fira-code text-sm bg-[var(--console-bg)] border border-[var(--accent-color)] p-4 rounded-lg text-[var(--console-text)] min-h-[150px] max-h-[400px] overflow-y-auto transition-colors duration-500"
      onClick={() => consoleInputRef.current?.focus()}
    >
      <div ref={consoleOutputRef} className="whitespace-pre-wrap" aria-live="polite">
        {output.map((line) => (
          <div key={line.id}>
            {line.type === 'command' && ( <span className="text-slate-500"><span className="text-[var(--console-prompt)]">meowfi@luna:~$ </span>{line.content}</span> )}
            {line.type === 'error' && <span className="text-red-400">Error: {line.content}</span>}
            {(line.type === 'info') && ( <span dangerouslySetInnerHTML={{ __html: line.content }} /> )}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="text-[var(--console-prompt)] console-prompt-user select-none">meowfi@luna:~$&nbsp;</span>
        <input
          ref={consoleInputRef}
          type="text"
          id="consoleInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={"Try 'help' or 'cat about.md'"}
          autoFocus
          className="bg-transparent border-none text-[var(--console-text)] placeholder-slate-500 focus:ring-0 flex-grow outline-none"
          aria-label="Interactive console input"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default InteractiveConsole;
