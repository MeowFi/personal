import { FadeInSection } from '../../hooks/useIntersectionObserver';
import ProgressBar from '../ui/ProgressBar'; // Assuming ProgressBar component is created

const learningLogs = [
  { title: "Advanced Systems Design Patterns", description: "Deep diving into CQRS, Event Sourcing, and Sagas for resilient distributed systems." },
  { title: "Solana Program Optimization", description: "Focusing on compute unit efficiency and advanced Anchor techniques." },
];

const currentProject = {
  title: "Currently Building: \"MeowMixer\"",
  description: "A privacy-preserving transaction batching service on Solana (PoC stage). Using Rust and Zero-Knowledge Proofs concepts.",
  tags: ["Solana", "Rust", "Privacy"],
  status: "In Development 🌱",
  statusColor: "text-yellow-400",
  progress: 45, // Percentage
  progressLink: "https://x.com/MeowfiDev/status/YOUR_TWEET_ID_HERE", // Replace with actual link
  progressLinkText: "Follow my progress: #BuildingInPublic Thread",
};


const BuildingSection = () => {
  return (
    <FadeInSection id="building" className="scroll-mt-24" scrollMarginTop='96px'>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center md:text-left gradient-text-neon font-fira-code">
            <span className="text-blue-400 text-xl mr-2">🔮</span>tail -f /var/log/learning.log
          </h2>
          <ul className="space-y-5">
            {learningLogs.map(log => (
              <li key={log.title} className="now-building-item section-card-mixed p-5 rounded-lg shadow-lg">
                <h4 className="text-lg font-semibold text-blue-300">{log.title}</h4>
                <p className="text-sm text-slate-400">{log.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center md:text-left gradient-text-neon font-fira-code">
            <span className="text-blue-400 text-xl mr-2">🔩</span>git log -1 --pretty=oneline
          </h2>
          <div className="now-building-item section-card-mixed p-5 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold text-blue-300">{currentProject.title}</h4>
            <p className="text-sm text-slate-400 mb-2">{currentProject.description}</p>
            <div className="mb-2 space-x-1">
              {currentProject.tags.map(tag => (
                <span key={tag} className={`tag-badge inline-block px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300 border border-slate-600`}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={`text-xs text-slate-500 mb-2`}>
              Status: <span className={`font-semibold ${currentProject.statusColor}`}>{currentProject.status}</span>
            </div>
            <ProgressBar progressPercent={currentProject.progress} className="mb-2" />
            <p className="text-xs text-slate-500">
              <a href={currentProject.progressLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {currentProject.progressLinkText}
              </a>
            </p>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
};

export default BuildingSection;