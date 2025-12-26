import { FadeInSection } from '../../hooks/useIntersectionObserver';
import SkillTag from '../ui/SkillTag';

const skills = [
  { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg", badge: "Systems" },
  { name: "Solana", icon: "https://cryptologos.cc/logos/solana-sol-logo.svg", badge: "Web3" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", badge: "Fullstack", invert: true },
  { name: "Elixir", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg", badge: "Concurrent" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg", tagLine: "Typed JS" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", tagLine: "Query API" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", tagLine: "Runtime" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg", tagLine: "Database" },
];

const StackSection = () => {
  return (
    <FadeInSection id="stack" className="scroll-mt-24" scrollMarginTop='96px'>
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center gradient-text-neon font-fira-code">
        <span className="text-blue-400 text-2xl mr-2">🛠️</span>ls -l /toolkit
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8">
        {skills.map(skill => (
          <SkillTag
            key={skill.name}
            skillName={skill.name}
            iconSrc={skill.icon}
            iconAlt={skill.name}
            tagLine={skill.tagLine}
            badgeText={skill.badge}
            invertIcon={skill.invert}
          />
        ))}
      </div>
    </FadeInSection>
  );
};

export default StackSection;