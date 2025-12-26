import { FadeInSection } from '../../hooks/useIntersectionObserver';
import ProjectCard, { ProjectCardProps } from '../ui/ProjectCard'; // Assuming ProjectCardProps is defined in ProjectCard.tsx

const projectsData: ProjectCardProps[] = [
  {
    title: "Project Nebula",
    description: "Solana-based DeFi yield aggregator.",
    role: "Lead Backend Dev",
    imageUrl: "https://placehold.co/600x350/0f172a/3b82f6?text=Project+Nebula",
    tags: ["Solana", "Rust", "Next.js", "Web3"],
    stars: "1.2k",
    lastUpdated: "Jun 03, 2025",
    readmeLink: "#", // Replace with actual link
    borderColorClass: "border-blue-500/30",
    textColorClass: "text-blue-300",
    linkHoverColorClass: "hover:text-blue-200",
  },
  {
    title: "Realtime Collab Engine",
    description: "Distributed backend for collaborative tools using Elixir & Phoenix.",
    role: "Systems Architect",
    imageUrl: "https://placehold.co/600x350/0f172a/818cf8?text=Elixir+Phoenix",
    tags: ["Elixir", "Backend"],
    stars: "800",
    lastUpdated: "May 15, 2025",
    readmeLink: "#",
    borderColorClass: "border-indigo-500/30",
    textColorClass: "text-indigo-300",
    linkHoverColorClass: "hover:text-indigo-200",
  }
];


const ProjectsSection = () => {
  return (
    <FadeInSection id="projects" className="scroll-mt-24" scrollMarginTop='96px'>
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center gradient-text-neon font-fira-code">
        <span className="text-blue-400 text-2xl mr-2">🐱</span>ls projects/
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        {projectsData.map(project => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </FadeInSection>
  );
};

export default ProjectsSection;