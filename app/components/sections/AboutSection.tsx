import { FadeInSection } from '../../hooks/useIntersectionObserver';

const AboutSection = () => {
  return (
    <FadeInSection id="about" className="scroll-mt-24" scrollMarginTop='96px'> {/* scroll-mt-24 */}
      <div className="section-card-mixed p-8 md:p-12 rounded-xl shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center gradient-text-neon font-fira-code">
          <span className="text-blue-400 text-2xl mr-2">🐾</span>cat /etc/motd
        </h2>
        <p className="text-center text-gray-400 mb-8 font-fira-code text-sm"># Introduction</p>
        <div className="text-lg text-slate-300 space-y-6 leading-relaxed max-w-3xl mx-auto">
          <p>
            Hey there! I&apos;m <span className="font-semibold text-blue-400">@MeowFi</span>. My world revolves around robust backend development and the thrilling frontiers of the Solana ecosystem. I focus on crafting systems that are not just scalable and efficient, but also elegant in their architecture.
          </p>
          <p>
            The challenge of complex problem-solving is my fuel, especially at the nexus of high-performance blockchain tech and battle-tested backend principles. If it involves Rust, distributed systems, or pushing web3 boundaries, count me in!
          </p>
        </div>
      </div>
    </FadeInSection>
  )
}

export default AboutSection;