import { Link } from 'react-router-dom'
import useTaskStore from '../store/taskStore'

const PhaseCard = ({ phase }) => {
  const tasks = useTaskStore(state => state.getTasksByPhase(phase.id))
  
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length
  const notStartedTasks = tasks.filter(task => task.status === 'not-started').length
  
  return (
    <div className={`phase-card phase-${phase.id.split('-')[1]}`}>
      <Link to={`/phase/${phase.id}`} className="block focus:outline-none">
        <h3 className="text-lg font-semibold text-gray-800">{phase.title}</h3>
        <p className="mt-1 text-sm text-gray-600">{phase.description}</p>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{phase.progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-bar-fill ${
                phase.progress < 30 ? 'low' : 
                phase.progress < 70 ? 'medium' : 
                'high'
              }`}
              style={{ width: `${phase.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="task-count-badge completed">{completedTasks}</span>
            <span className="task-count-badge in-progress">{inProgressTasks}</span>
            <span className="task-count-badge not-started">{notStartedTasks}</span>
          </div>
          <span className="text-sm text-gray-500">{totalTasks} tasks</span>
        </div>
      </Link>
    </div>
  )
}

export default PhaseCard
