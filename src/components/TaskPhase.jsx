import { useState } from 'react';
import TaskItem from './TaskItem';

const TaskPhase = ({ phase, phaseIndex, onToggleTask, plrName }) => {
  const [isExpanded, setIsExpanded] = useState(phaseIndex === 0);

  const completedTasks = phase.tasks.filter(task => task.completed).length;
  const totalTasks = phase.tasks.length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const getPhaseIcon = (phaseIndex) => {
    const icons = [
      // Phase 1 - Analysis
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>,
      // Phase 2 - Customization
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>,
      // Phase 3 - Platform
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
      </svg>,
      // Phase 4 - Marketing
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>,
      // Phase 5 - Optimization
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ];
    return icons[phaseIndex] || icons[0];
  };

  const getPhaseColor = (phaseIndex) => {
    const colors = [
      'text-blue-600 bg-blue-100',
      'text-green-600 bg-green-100', 
      'text-purple-600 bg-purple-100',
      'text-orange-600 bg-orange-100',
      'text-red-600 bg-red-100'
    ];
    return colors[phaseIndex] || colors[0];
  };

  return (
    <div className="task-phase">
      <div 
        className="task-phase-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getPhaseColor(phaseIndex)}`}>
              {getPhaseIcon(phaseIndex)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {phase.title}
              </h3>
              <p className="text-sm text-gray-600">
                {phase.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {completedTasks}/{totalTasks} tasks
              </div>
              <div className="text-xs text-gray-500">
                {progressPercentage}% complete
              </div>
            </div>
            
            <div className="w-16 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="task-phase-content">
          {phase.tasks.map((task, taskIndex) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => onToggleTask(phaseIndex, taskIndex)}
              plrName={plrName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskPhase;
