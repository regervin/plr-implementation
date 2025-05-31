import { Link } from 'react-router-dom'
import { FiCheckCircle, FiClock, FiCircle } from 'react-icons/fi'

const TaskCard = ({ task }) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <FiCheckCircle className="text-green-500" />
      case 'in-progress':
        return <FiClock className="text-yellow-500" />
      default:
        return <FiCircle className="text-gray-400" />
    }
  }
  
  const getPriorityBadge = () => {
    switch (task.priority) {
      case 'high':
        return <span className="badge bg-red-100 text-red-800">High</span>
      case 'medium':
        return <span className="badge bg-yellow-100 text-yellow-800">Medium</span>
      default:
        return <span className="badge bg-gray-100 text-gray-800">Low</span>
    }
  }
  
  // Calculate progress
  const completedSubtasks = task.subtasks ? task.subtasks.filter(st => st.completed).length : 0
  const totalSubtasks = task.subtasks ? task.subtasks.length : 0
  const progress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0
  
  return (
    <Link to={`/task/${task.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="mt-1">{getStatusIcon()}</div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                <p className="text-gray-500 mt-1 line-clamp-2">{task.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="badge bg-blue-100 text-blue-800">Phase {task.phase}</span>
              <div className="mt-2">{getPriorityBadge()}</div>
            </div>
          </div>
          
          {totalSubtasks > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>{completedSubtasks} of {totalSubtasks} subtasks</span>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-bar-fill ${
                    progress < 30 ? 'low' : 
                    progress < 70 ? 'medium' : 'high'
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default TaskCard
