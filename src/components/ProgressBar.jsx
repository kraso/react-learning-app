import React from 'react';

export const calculateProgress = (items, completedItems = []) => {
  if (!items?.length) return 0;
  const completedCount = items.filter((item) => completedItems.includes(item.id)).length;
  return Math.round((completedCount / items.length) * 100);
};

const ProgressBar = ({
  progress,
  items,
  completedItems = [],
  showLabel = true,
  className = '',
}) => {
  const value =
    typeof progress === 'number'
      ? Math.min(100, Math.max(0, Math.round(progress)))
      : calculateProgress(items, completedItems);

  return (
    <div
      className={`progress-container${className ? ` ${className}` : ''}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progreso del nivel: ${value}%`}
    >
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${value}%` }} />
      </div>
      {showLabel && <span className="progress-text">{value}%</span>}
    </div>
  );
};

export default ProgressBar;
