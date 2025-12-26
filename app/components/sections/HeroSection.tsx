"use client";
import Link from "next/link";
import HeroTerminalCard from "../ui/HeroTerminalCard";
import TypingAnimation from "../ui/TypingAnimation";
import ParticleBackground from "../ui/ParticleBackground";
import { FadeInSection } from "../../hooks/useIntersectionObserver";

const HeroSection = () => {
  const typingTerms = [
    "Next.js", "Rust", "TypeScript", "Solana",
    "GraphQL", "Node.js", "Elixir", "PostgreSQL",
  ];

  return (
    // The outer div establishes a positioning context for the full-bleed background
    <div className="relative w-full">
      {/* This div is the key to the full-width background.
        It's positioned absolutely relative to the outer div.
        'inset-0' makes it fill the parent.
        'w-screen left-1/2 -translate-x-1/2' makes it ignore parent padding/width constraints and be as wide as the screen.
        '-z-10' places it behind the content.
      */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-bg-mixed"> {/* This now uses w-full and h-full from its parent */}
          {/* Particles are part of the background layer */}
          <ParticleBackground />
        </div>
      </div>

      {/* This is the container for the visible content. It's centered. */}
      <div className="min-h-screen flex items-center justify-center pt-16 pb-16 lg:pt-24 lg:pb-24">
        {/* The container class provides max-width and centering for the content grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <div className="grid gap-10 lg:grid-cols-[1fr_450px] lg:gap-12 xl:grid-cols-[1fr_500px] items-center">
            
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-slate-100">
                  Hi, I&apos;m @MeowFi<span className="text-blue-500">.</span>
                </h1>
                <p className="max-w-[600px] text-slate-400 md:text-xl mx-auto lg:mx-0">
                  Backend developer focused on&nbsp;
                  <TypingAnimation terms={typingTerms} />
                </p>
              </div>

              <FadeInSection
                as="div"
                className="max-w-[600px] text-slate-400 md:text-lg mx-auto lg:mx-0"
                style={{ animationDelay: "0.2s" }}
              >
                <p>
                  I specialize in backend development with a deep interest in
                  the Solana ecosystem. Building scalable systems and exploring
                  blockchain technologies is what drives me. (she/her)
                </p>
              </FadeInSection>

              <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center lg:justify-start">
                <Link
                  href="#projects"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-blue-500/50"
                  aria-label="View My Work projects"
                >
                  View My Work
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
                <div className="flex gap-3 justify-center lg:justify-start">
                  <a href="https://github.com/MeowFi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:border-slate-500 transition duration-300" aria-label="My GitHub Profile (opens in new tab)">
                    {/* GitHub SVG */}
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.017C22 6.484 17.523 2 12 2z" clipRule="evenodd" /></svg>
                    GitHub
                  </a>
                  <a href="https://x.com/MeowfiDev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:border-slate-500 transition duration-300" aria-label="My Twitter Profile (opens in new tab)">
                    {/* Twitter/X SVG */}
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Twitter
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-slate-500 justify-center lg:justify-start">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                  <span>Available for collaboration</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <HeroTerminalCard />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;