import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total, className = '' }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={`progress-bar ${className}`}>
      <div 
        className="progress-fill"
        style={{ width: `${percentage}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-gray-700">
          {completed}/{total} ({percentage}%)
        </span>
      </div>
    </div>
  );
};
