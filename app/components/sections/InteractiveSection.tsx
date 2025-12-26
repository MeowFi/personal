import { FadeInSection } from '../../hooks/useIntersectionObserver';
import InteractiveConsole from '../ui/InteractiveConsole';

const InteractiveSection = () => {
  return (
    <FadeInSection id="interactive" className="scroll-mt-24" scrollMarginTop='96px'>
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center gradient-text-neon font-fira-code">
        <span className="text-blue-400 text-2xl mr-2">🕹️</span>./run_playground.sh
      </h2>
      <div className="section-card-mixed p-6 md:p-8 rounded-xl shadow-2xl max-w-2xl mx-auto">
        <p className="text-center text-slate-300 mb-4">
          Want to see something cool? Try typing a command in the console below!
        </p>
        <InteractiveConsole />
        <p className="text-xs text-slate-500 mt-3 text-center">
          Hint: AI commands like &apos;explain&apos;, &apos;ask&apos;, &apos;project_idea&apos; use Gemini!
        </p>
      </div>
    </FadeInSection>
  );
};

export default InteractiveSection;