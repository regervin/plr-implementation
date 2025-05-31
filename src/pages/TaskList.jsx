import { useState } from 'react'
import { FiPlus, FiFilter, FiSearch } from 'react-icons/fi'
import useTaskStore from '../store/taskStore'
import TaskCard from '../components/TaskCard'

const TaskList = () => {
  const tasks = useTaskStore(state => state.tasks)
  const addTask = useTaskStore(state => state.addTask)
  
  const [filter, setFilter] = useState('all')
  const [phase, setPhase] = useState('all')
  const [priority, setPriority] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'not-started',
    phase: 1,
    priority: 'medium',
    subtasks: []
  })
  const [newSubtask, setNewSubtask] = useState('')
  
  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filter !== 'all' && task.status !== filter) return false
    
    // Filter by phase
    if (phase !== 'all' && task.phase !== parseInt(phase)) return false
    
    // Filter by priority
    if (priority !== 'all' && task.priority !== priority) return false
    
    // Filter by search term
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
    
    return true
  })
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask({
      title: '',
      description: '',
      status: 'not-started',
      phase: 1,
      priority: 'medium',
      subtasks: []
    })
    setShowAddForm(false)
  }
  
  // Add subtask to new task
  const handleAddSubtask = (e) => {
    e.preventDefault()
    if (!newSubtask.trim()) return
    
    setNewTask({
      ...newTask,
      subtasks: [
        ...newTask.subtasks,
        {
          id: `new-${Date.now()}`,
          title: newSubtask,
          completed: false
        }
      ]
    })
    setNewSubtask('')
  }
  
  // Remove subtask from new task
  const handleRemoveSubtask = (index) => {
    setNewTask({
      ...newTask,
      subtasks: newTask.subtasks.filter((_, i) => i !== index)
    })
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
        <button 
          className="btn btn-primary mt-3 sm:mt-0"
          onClick={() => setShowAddForm(true)}
        >
          <FiPlus className="mr-2" /> Add New Task
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="flex-1 mb-4 md:mb-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center">
              <FiFilter className="mr-2 text-gray-500" />
              <span className="text-sm text-gray-500 mr-2">Status:</span>
              <select 
                className="input py-1 px-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Phase:</span>
              <select 
                className="input py-1 px-2"
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
              >
                <option value="all">All</option>
                <option value="1">Phase 1</option>
                <option value="2">Phase 2</option>
                <option value="3">Phase 3</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Priority:</span>
              <select 
                className="input py-1 px-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No tasks found matching your filters.</p>
            <button 
              className="btn btn-outline mt-4"
              onClick={() => {
                setFilter('all')
                setPhase('all')
                setPriority('all')
                setSearchTerm('')
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      
      {/* Add Task Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Task</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Task Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="input mt-1"
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows="3"
                        className="input mt-1"
                        value={newTask.description}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          id="status"
                          className="input mt-1"
                          value={newTask.status}
                          onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                        >
                          <option value="not-started">Not Started</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="phase" className="block text-sm font-medium text-gray-700">
                          Phase
                        </label>
                        <select
                          id="phase"
                          className="input mt-1"
                          value={newTask.phase}
                          onChange={(e) => setNewTask({...newTask, phase: parseInt(e.target.value)})}
                        >
                          <option value="1">Phase 1</option>
                          <option value="2">Phase 2</option>
                          <option value="3">Phase 3</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                          Priority
                        </label>
                        <select
                          id="priority"
                          className="input mt-1"
                          value={newTask.priority}
                          onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtasks
                      </label>
                      
                      <div className="space-y-2">
                        {newTask.subtasks.map((subtask, index) => (
                          <div key={subtask.id} className="flex items-center">
                            <span className="flex-1 text-sm">{subtask.title}</span>
                            <button
                              type="button"
                              className="text-danger-600 hover:text-danger-800"
                              onClick={() => handleRemoveSubtask(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-2 flex">
                        <input
                          type="text"
                          className="input flex-1 rounded-r-none"
                          placeholder="Add a subtask"
                          value={newSubtask}
                          onChange={(e) => setNewSubtask(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-primary rounded-l-none"
                          onClick={handleAddSubtask}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="btn btn-primary sm:ml-3"
                  >
                    Create Task
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline mt-3 sm:mt-0"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskList
