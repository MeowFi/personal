import { FadeInSection } from '../../hooks/useIntersectionObserver';

interface StatItem {
  value: string;
  label: string;
}

const statsData: StatItem[] = [
  { value: "602", label: "Current Epoch" },
  { value: "2,850", label: "TPS (Live - Mock)" },
  { value: "1,950+", label: "Validators (Mock)" },
  { value: "~0.4s", label: "Block Time (Mock)" }
];

const OnChainStatsSection = () => {
  return (
    <FadeInSection id="onchain-stats" className="scroll-mt-24" scrollMarginTop='96px'>
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center gradient-text-neon font-fira-code">
        <span className="text-blue-400 text-2xl mr-2">📊</span>solana cluster-stats (mock)
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
        {statsData.map(stat => (
          <div key={stat.label} className="section-card-mixed p-5 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-300">{stat.value}</div>
            <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </FadeInSection>
  );
};

export default OnChainStatsSection;