const TaskItem = ({ task, onToggle, plrName }) => {
  const getPersonalizedDescription = (description, plrName) => {
    if (!plrName) return description;
    
    // Replace generic terms with the specific PLR name
    return description
      .replace(/PLR content/g, `"${plrName}"`)
      .replace(/the content/g, `"${plrName}"`)
      .replace(/your product/g, `"${plrName}"`)
      .replace(/this content/g, `"${plrName}"`);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className="task-checkbox"
      />
      
      <div className="task-content">
        <h4 className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </h4>
        <p className={`task-description ${task.completed ? 'completed' : ''}`}>
          {getPersonalizedDescription(task.description, plrName)}
        </p>
      </div>
      
      {task.completed && (
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
