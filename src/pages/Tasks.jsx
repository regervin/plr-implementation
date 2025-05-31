import { useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import useTaskStore from '../store/taskStore'
import TaskCard from '../components/TaskCard'

const Tasks = () => {
  const tasks = useTaskStore(state => state.tasks)
  const phases = useTaskStore(state => state.phases)
  
  const [statusFilter, setStatusFilter] = useState('all')
  const [phaseFilter, setPhaseFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    // Status filter
    if (statusFilter !== 'all' && task.status !== statusFilter) {
      return false
    }
    
    // Phase filter
    if (phaseFilter !== 'all' && task.phaseId !== phaseFilter) {
      return false
    }
    
    // Search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      )
    }
    
    return true
  })
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center">
              <FiFilter className="mr-2 h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input py-1"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>
            
            <div>
              <select
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value)}
                className="input py-1"
              >
                <option value="all">All Phases</option>
                {phases.map(phase => (
                  <option key={phase.id} value={phase.id}>
                    {phase.title.split(':')[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks
