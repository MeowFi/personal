import React from 'react';

interface ProgressBarProps {
  progressPercent: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercent, className }) => {
  const widthStyle = {
    width: `${Math.max(0, Math.min(100, progressPercent))}%`,
  };

  return (
    <div className={`progress-bar-container w-full bg-slate-700 rounded-sm overflow-hidden h-3 ${className}`}>
      <div
        className="progress-bar h-full bg-accent rounded-sm transition-all duration-500 ease-in-out"
        style={widthStyle}
      ></div>
    </div>
  );
};

export default ProgressBar;
