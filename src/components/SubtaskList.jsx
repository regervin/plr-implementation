import { useState } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import useTaskStore from '../store/taskStore'

const SubtaskList = ({ taskId, subtasks }) => {
  const [newSubtask, setNewSubtask] = useState('')
  const toggleSubtask = useTaskStore(state => state.toggleSubtask)
  const addSubtask = useTaskStore(state => state.addSubtask)
  const removeSubtask = useTaskStore(state => state.removeSubtask)
  
  const handleAddSubtask = (e) => {
    e.preventDefault()
    if (newSubtask.trim()) {
      addSubtask(taskId, newSubtask.trim())
      setNewSubtask('')
    }
  }
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Subtasks</h3>
      
      <div className="space-y-2">
        {subtasks.map(subtask => (
          <div key={subtask.id} className="flex items-center group">
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => toggleSubtask(taskId, subtask.id)}
              className="checkbox"
            />
            <span className={`ml-3 text-gray-700 flex-1 ${subtask.completed ? 'line-through text-gray-400' : ''}`}>
              {subtask.title}
            </span>
            <button
              onClick={() => removeSubtask(taskId, subtask.id)}
              className="text-gray-400 hover:text-danger-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        {subtasks.length === 0 && (
          <p className="text-gray-500 text-sm italic">No subtasks yet. Add one below.</p>
        )}
      </div>
      
      <form onSubmit={handleAddSubtask} className="mt-3 flex">
        <input
          type="text"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          placeholder="Add a new subtask..."
          className="input"
        />
        <button
          type="submit"
          className="ml-2 btn btn-primary flex items-center"
          disabled={!newSubtask.trim()}
        >
          <FiPlus className="h-4 w-4 mr-1" />
          Add
        </button>
      </form>
    </div>
  )
}

export default SubtaskList
