'use client'

interface SkillTagProps {
  skillName: string;
  iconSrc: string;
  iconAlt: string;
  tagLine?: string;
  badgeText?: string;
  invertIcon?: boolean;
}

const SkillTag: React.FC<SkillTagProps> = ({ skillName, iconSrc, iconAlt, tagLine, badgeText, invertIcon }) => {
  const handleClick = () => {
    const event = new CustomEvent('runConsoleCommand', { detail: { command: `explain ${skillName}` } });
    document.dispatchEvent(event);

    const interactiveSection = document.getElementById('interactive');
    interactiveSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div
      className="skill-tag section-card-mixed p-5 rounded-lg text-center shadow-lg flex flex-col items-center justify-center cursor-pointer"
      onClick={handleClick}
      data-skill={skillName}
      aria-label={`Explain ${skillName} technology`}
    >
      <img
        src={iconSrc}
        alt={iconAlt}
        className="h-10 w-10 mb-2 pointer-events-none"
        style={invertIcon ? { filter: 'invert(0.8)' } : {}}
      />
      <span className="text-lg font-semibold text-blue-300 pointer-events-none">{skillName}</span>
      {tagLine && <p className="text-xs text-gray-400 pointer-events-none">{tagLine}</p>}
      {badgeText && (
        <span
          className={`tag-badge mt-1 pointer-events-none px-2 py-0.5 rounded text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30`}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
};

export default SkillTag;
