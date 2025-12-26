import Link from 'next/link';

export interface ProjectCardProps {
  title: string;
  description: string;
  role?: string;
  imageUrl: string;
  tags: string[];
  stars?: string;
  lastUpdated?: string;
  readmeLink: string;
  borderColorClass?: string;
  textColorClass?: string;
  linkHoverColorClass?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  role,
  imageUrl,
  tags,
  stars,
  lastUpdated,
  readmeLink,
  borderColorClass = "border-blue-500/30",
  textColorClass = "text-blue-300",
  linkHoverColorClass = "hover:text-blue-200",
}) => {
  return (
    <div className="project-card section-card-mixed rounded-xl overflow-hidden shadow-2xl">
      <div className="project-card-inner">
        <div className={`overflow-hidden border-b ${borderColorClass}`}>
          <img src={imageUrl} alt={title} className="project-image w-full h-52 object-cover" />
        </div>
        <div className="p-6">
          <h3 className={`text-2xl font-semibold mb-1 ${textColorClass}`}>{title}</h3>
          <p className="text-slate-400 text-sm mb-3">
            {description}
            {role && <span className="text-indigo-400"> Role: {role}</span>}
          </p>
          <div className="mb-3 space-x-1 space-y-1">
            {tags.map(tag => (
              <span key={tag} className="tag-badge inline-block px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300 border border-slate-600">
                {tag}
              </span>
            ))}
          </div>
          {(stars || lastUpdated) && (
            <div className="flex justify-between items-center text-xs text-slate-500 mb-3">
              {stars && <span>⭐ {stars} Stars</span>}
              {lastUpdated && <span className="text-xs text-slate-600">Last Updated: {lastUpdated}</span>}
            </div>
          )}
          <Link href={readmeLink} className={`inline-flex items-center font-medium group ${textColorClass} ${linkHoverColorClass}`} aria-label={`View details for ${title}`}>
              cat README.md
              <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
