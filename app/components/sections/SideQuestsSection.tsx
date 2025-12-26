import { FadeInSection } from '../../hooks/useIntersectionObserver';

interface SideQuest {
  title: string;
  description: string;
  tags: string[];
}

const sideQuestsData: SideQuest[] = [
  {
    title: "CLI Cat Fact Fetcher",
    description: "A tiny Rust CLI tool to fetch and display random cat facts from an API. Fun weekend project!",
    tags: ["Rust", "CLI"]
  },
  {
    title: "Solana Wallet Watcher",
    description: "Simple Node.js script using Solana/web3.js to monitor balance changes for a given wallet address.",
    tags: ["Solana", "Node.js"]
  },
  {
    title: "Advent of Code (Elixir)",
    description: "Participated in Advent of Code, solving puzzles using Elixir to explore its functional capabilities.",
    tags: ["Elixir"]
  }
];

const SideQuestsSection = () => {
  return (
    <FadeInSection id="side-quests" className="scroll-mt-24" scrollMarginTop='96px'>
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center gradient-text-neon font-fira-code">
        <span className="text-blue-400 text-2xl mr-2">🗺️</span>ls -a ./side_quests
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sideQuestsData.map(quest => (
          <div key={quest.title} className="side-quest-card section-card-mixed p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-blue-300 mb-2">{quest.title}</h4>
            <p className="text-sm text-slate-400 mb-3">{quest.description}</p>
            <div className="space-x-1">
              {quest.tags.map(tag => (
                <span key={tag} className="tag-badge inline-block px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300 border border-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FadeInSection>
  );
};

export default SideQuestsSection;