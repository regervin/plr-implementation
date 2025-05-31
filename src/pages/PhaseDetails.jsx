import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle, FiClock, FiCircle } from 'react-icons/fi'
import useTaskStore from '../store/taskStore'
import TaskCard from '../components/TaskCard'

const PhaseDetails = () => {
  const { phaseId } = useParams()
  const phase = useTaskStore(state => state.getPhaseById(phaseId))
  const tasks = useTaskStore(state => state.getTasksByPhase(phaseId))
  
  if (!phase) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Phase not found</h2>
        <p className="text-gray-600 mb-4">The phase you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    )
  }
  
  // Count tasks by status
  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length
  const notStartedTasks = tasks.filter(task => task.status === 'not-started').length
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{phase.title}</h1>
      </div>
      
      <p className="text-gray-600">{phase.description}</p>
      
      {/* Progress */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-700">Phase Progress</h2>
          <span className="text-lg font-bold text-gray-700">{phase.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full bg-${phase.color}-500`}
            style={{ width: `${phase.progress}%` }}
          ></div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-success-50 rounded-lg p-3">
            <div className="flex items-center justify-center mb-1">
              <FiCheckCircle className="h-5 w-5 text-success-500 mr-1" />
              <span className="font-semibold">{completedTasks}</span>
            </div>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          
          <div className="bg-warning-50 rounded-lg p-3">
            <div className="flex items-center justify-center mb-1">
              <FiClock className="h-5 w-5 text-warning-500 mr-1" />
              <span className="font-semibold">{inProgressTasks}</span>
            </div>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-center mb-1">
              <FiCircle className="h-5 w-5 text-gray-400 mr-1" />
              <span className="font-semibold">{notStartedTasks}</span>
            </div>
            <p className="text-sm text-gray-600">Not Started</p>
          </div>
        </div>
      </div>
      
      {/* Tasks */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h2>
        
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PhaseDetails
