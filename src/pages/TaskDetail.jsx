import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiArrowLeft, FiEdit2, FiTrash2, FiCheckCircle, FiClock, FiCircle } from 'react-icons/fi'
import useTaskStore from '../store/taskStore'

const TaskDetail = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  
  const tasks = useTaskStore(state => state.tasks)
  const updateTask = useTaskStore(state => state.updateTask)
  const deleteTask = useTaskStore(state => state.deleteTask)
  const toggleSubtask = useTaskStore(state => state.toggleSubtask)
  const addSubtask = useTaskStore(state => state.addSubtask)
  
  const task = tasks.find(t => t.id === taskId)
  
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task || {})
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  
  if (!task) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Not Found</h2>
        <p className="text-gray-600 mb-6">The task you're looking for doesn't exist or has been deleted.</p>
        <Link to="/tasks" className="btn btn-primary">
          Back to Tasks
        </Link>
      </div>
    )
  }
  
  const handleSaveChanges = () => {
    updateTask(taskId, editedTask)
    setIsEditing(false)
  }
  
  const handleAddSubtask = (e) => {
    e.preventDefault()
    if (!newSubtaskTitle.trim()) return
    
    addSubtask(taskId, newSubtaskTitle)
    setNewSubtaskTitle('')
  }
  
  const handleDeleteTask = () => {
    deleteTask(taskId)
    navigate('/tasks')
  }
  
  const getStatusBadge = () => {
    switch (task.status) {
      case 'completed':
        return <span className="badge bg-success-100 text-success-800 flex items-center"><FiCheckCircle className="mr-1" /> Completed</span>
      case 'in-progress':
        return <span className="badge bg-warning-100 text-warning-800 flex items-center"><FiClock className="mr-1" /> In Progress</span>
      default:
        return <span className="badge bg-gray-100 text-gray-800 flex items-center"><FiCircle className="mr-1" /> Not Started</span>
    }
  }
  
  const getPriorityBadge = () => {
    switch (task.priority) {
      case 'high':
        return <span className="badge bg-danger-100 text-danger-800">High Priority</span>
      case 'medium':
        return <span className="badge bg-warning-100 text-warning-800">Medium Priority</span>
      default:
        return <span className="badge bg-gray-100 text-gray-800">Low Priority</span>
    }
  }
  
  const completedSubtasks = task.subtasks.filter(st => st.completed).length
  const totalSubtasks = task.subtasks.length
  const progress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0
  
  return (
    <div>
      {/* Back button */}
      <Link to="/tasks" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <FiArrowLeft className="mr-2" /> Back to Tasks
      </Link>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Task header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  className="input text-xl font-bold"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
              )}
              
              <div className="flex flex-wrap gap-2 mt-2">
                {getStatusBadge()}
                {getPriorityBadge()}
                <span className="badge bg-primary-100 text-primary-800">Phase {task.phase}</span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              {isEditing ? (
                <>
                  <button 
                    className="btn btn-primary"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={() => {
                      setIsEditing(false)
                      setEditedTask(task)
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="btn btn-outline flex items-center"
                    onClick={() => setIsEditing(true)}
                  >
                    <FiEdit2 className="mr-1" /> Edit
                  </button>
                  <button 
                    className="btn btn-danger flex items-center"
                    onClick={() => setConfirmDelete(true)}
                  >
                    <FiTrash2 className="mr-1" /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Task content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-medium text-gray-800 mb-3">Description</h2>
              {isEditing ? (
                <textarea
                  className="input w-full"
                  rows="4"
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                ></textarea>
              ) : (
                <p className="text-gray-600 whitespace-pre-line">{task.description}</p>
              )}
              
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-800 mb-3">Subtasks</h2>
                
                {task.subtasks.length > 0 ? (
                  <div className="space-y-3">
                    {task.subtasks.map(subtask => (
                      <div 
                        key={subtask.id} 
                        className="flex items-start p-3 border border-gray-200 rounded-md"
                      >
                        <input
                          type="checkbox"
                          className="checkbox mt-1"
                          checked={subtask.completed}
                          onChange={() => toggleSubtask(task.id, subtask.id)}
                        />
                        <span className={`ml-3 ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No subtasks for this task.</p>
                )}
                
                <form onSubmit={handleAddSubtask} className="mt-4 flex">
                  <input
                    type="text"
                    className="input flex-1 rounded-r-none"
                    placeholder="Add a new subtask"
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary rounded-l-none"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-medium text-gray-800 mb-3">Task Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    {isEditing ? (
                      <select
                        className="input mt-1"
                        value={editedTask.status}
                        onChange={(e) => setEditedTask({...editedTask, status: e.target.value})}
                      >
                        <option value="not-started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    ) : (
                      <p className="text-gray-800 capitalize">{task.status.replace('-', ' ')}</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                    {isEditing ? (
                      <select
                        className="input mt-1"
                        value={editedTask.priority}
                        onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    ) : (
                      <p className="text-gray-800 capitalize">{task.priority}</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phase</h3>
                    {isEditing ? (
                      <select
                        className="input mt-1"
                        value={editedTask.phase}
                        onChange={(e) => setEditedTask({...editedTask, phase: parseInt(e.target.value)})}
                      >
                        <option value="1">Phase 1: Planning</option>
                        <option value="2">Phase 2: Customization</option>
                        <option value="3">Phase 3: Launch</option>
                      </select>
                    ) : (
                      <p className="text-gray-800">
                        Phase {task.phase}: {
                          task.phase === 1 ? 'Planning' :
                          task.phase === 2 ? 'Customization' : 'Launch'
                        }
                      </p>
                    )}
                  </div>
                  
                  {totalSubtasks > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Progress</h3>
                      <p className="text-gray-800 mb-1">{completedSubtasks} of {totalSubtasks} subtasks completed ({progress}%)</p>
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
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-danger-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiTrash2 className="h-6 w-6 text-danger-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Task
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this task? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="btn btn-danger sm:ml-3"
                  onClick={handleDeleteTask}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-outline mt-3 sm:mt-0"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskDetail
