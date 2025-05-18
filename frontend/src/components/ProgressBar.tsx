import React from 'react';

interface ProgressBarProps {
  progress: number;  // now accepts a percentage directly
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
}) => {
  // Ensure progress is within 0-100 range
  const safePercentage = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600 ${className}`}>
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${safePercentage}%` }}
        aria-valuenow={safePercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
        aria-label="Quiz progress"
      ></div>
    </div>
  );
};

export default ProgressBar; 