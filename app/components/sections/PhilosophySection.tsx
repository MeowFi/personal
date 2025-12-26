import { FadeInSection } from '../../hooks/useIntersectionObserver';

const PhilosophySection = () => {
  const philosophyConfig = `
[general]
name = MeowFi
focus = Backend & Solana Development
pronouns = she/her

[philosophy]
clarity_over_complexity = true
lifelong_learning_mode = enabled
open_source_contributor = active
build_for_scale = true
security_first_mindset = non_negotiable
embrace_the_challenge = always

[tech_preferences]
primary_language = Rust
blockchain_of_choice = Solana
functional_paradigm_admirer = Elixir
data_integrity_is_key = PostgreSQL
  `.trim();

  return (
    <FadeInSection id="philosophy" className="scroll-mt-24" scrollMarginTop='96px'>
      <div className="section-card-mixed p-8 md:p-12 rounded-xl shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center gradient-text-neon font-fira-code">
          <span className="text-blue-400 text-2xl mr-2">📜</span>cat meowfi.config
        </h2>
        <p className="text-center text-gray-400 mb-8 font-fira-code text-sm"># Core Principles</p>
        <pre className="bg-slate-900/50 p-6 rounded-md text-slate-300 font-fira-code text-sm leading-loose overflow-x-auto">
          {philosophyConfig}
        </pre>
      </div>
    </FadeInSection>
  );
};

export default PhilosophySection;