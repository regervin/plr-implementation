import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCalendar, FiCheckCircle, FiClock, FiCircle } from 'react-icons/fi'
import { format } from 'date-fns'
import useTaskStore from '../store/taskStore'
import SubtaskList from '../components/SubtaskList'

const TaskDetails = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const task = useTaskStore(state => state.getTaskById(taskId))
  const phase = useTaskStore(state => state.getPhaseById(task?.phaseId))
  const updateTaskStatus = useTaskStore(state => state.updateTaskStatus)
  const updateTaskNotes = useTaskStore(state => state.updateTaskNotes)
  const updateTaskDueDate = useTaskStore(state => state.updateTaskDueDate)
  
  const [notes, setNotes] = useState(task?.notes || '')
  const [dueDate, setDueDate] = useState(task?.dueDate || '')
  
  if (!task || !phase) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Task not found</h2>
        <p className="text-gray-600 mb-4">The task you're looking for doesn't exist.</p>
        <Link to="/tasks" className="btn btn-primary">
          Back to Tasks
        </Link>
      </div>
    )
  }
  
  const handleStatusChange = (newStatus) => {
    updateTaskStatus(task.id, newStatus)
  }
  
  const handleSaveNotes = () => {
    updateTaskNotes(task.id, notes)
  }
  
  const handleDueDateChange = (e) => {
    const newDueDate = e.target.value
    setDueDate(newDueDate)
    updateTaskDueDate(task.id, newDueDate)
  }
  
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <FiCheckCircle className="h-6 w-6 text-success-500" />
      case 'in-progress':
        return <FiClock className="h-6 w-6 text-warning-500" />
      default:
        return <FiCircle className="h-6 w-6 text-gray-400" />
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-gray-500 mr-2">Status:</span>
              <div className="relative inline-block">
                <button
                  className="flex items-center space-x-2 px-3 py-1 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {getStatusIcon()}
                  <span>
                    {task.status === 'completed' ? 'Completed' : 
                     task.status === 'in-progress' ? 'In Progress' : 
                     'Not Started'}
                  </span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={() => handleStatusChange('not-started')}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <FiCircle className="mr-2 h-4 w-4 text-gray-400" />
                      Not Started
                    </button>
                    <button
                      onClick={() => handleStatusChange('in-progress')}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <FiClock className="mr-2 h-4 w-4 text-warning-500" />
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusChange('completed')}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <FiCheckCircle className="mr-2 h-4 w-4 text-success-500" />
                      Completed
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-500 block mb-1">Phase:</span>
              <Link 
                to={`/phase/${phase.id}`}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${phase.color}-50 text-${phase.color}-700`}
              >
                {phase.title.split(':')[0]}
              </Link>
            </div>
            
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-500 block mb-1">Description:</span>
              <p className="text-gray-700">{task.description}</p>
            </div>
          </div>
          
          <div className="w-full md:w-64 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={dueDate}
                  onChange={handleDueDateChange}
                  className="input pl-10"
                />
              </div>
              {task.dueDate && (
                <p className="mt-1 text-sm text-gray-500">
                  Due: {format(new Date(task.dueDate), 'MMMM d, yyyy')}
                </p>
              )}
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStatusChange('not-started')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                    task.status === 'not-started'
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Not Started
                </button>
                <button
                  onClick={() => handleStatusChange('in-progress')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                    task.status === 'in-progress'
                      ? 'bg-warning-100 text-warning-800'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                    task.status === 'completed'
                      ? 'bg-success-100 text-success-800'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <SubtaskList taskId={task.id} subtasks={task.subtasks} />
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="input"
            placeholder="Add notes about this task..."
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSaveNotes}
              className="btn btn-primary"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails
