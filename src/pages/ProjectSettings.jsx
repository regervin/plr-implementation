import { useState } from 'react'
import { FiSave, FiTrash2 } from 'react-icons/fi'
import useTaskStore from '../store/taskStore'

const ProjectSettings = () => {
  const tasks = useTaskStore(state => state.tasks)
  
  const [projectName, setProjectName] = useState('PLR Implementation Project')
  const [phaseNames, setPhaseNames] = useState([
    'Planning',
    'Customization',
    'Launch'
  ])
  const [confirmReset, setConfirmReset] = useState(false)
  
  const handlePhaseNameChange = (index, value) => {
    const newPhaseNames = [...phaseNames]
    newPhaseNames[index] = value
    setPhaseNames(newPhaseNames)
  }
  
  const handleSaveSettings = () => {
    // In a real app, this would save to a backend or localStorage
    alert('Settings saved successfully!')
  }
  
  const handleResetProject = () => {
    // This would reset the project in a real app
    setConfirmReset(false)
    alert('Project has been reset')
  }
  
  // Calculate task statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  
  // Tasks by phase
  const tasksByPhase = [1, 2, 3].map(phase => ({
    phase,
    name: phaseNames[phase - 1],
    count: tasks.filter(task => task.phase === phase).length,
    completed: tasks.filter(task => task.phase === phase && task.status === 'completed').length
  }))
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Project Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Settings */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Project Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  className="input"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phase Names
                </label>
                <div className="space-y-2">
                  {phaseNames.map((name, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-20">Phase {index + 1}:</span>
                      <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => handlePhaseNameChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  className="btn btn-primary flex items-center"
                  onClick={handleSaveSettings}
                >
                  <FiSave className="mr-2" /> Save Settings
                </button>
              </div>
            </div>
          </div>
          
          <div className="card mt-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Danger Zone</h2>
            
            <div className="border border-danger-200 rounded-md p-4 bg-danger-50">
              <h3 className="text-danger-800 font-medium">Reset Project</h3>
              <p className="text-danger-600 text-sm mt-1">
                This will reset all project data and cannot be undone.
              </p>
              <button 
                className="btn btn-danger mt-3 flex items-center"
                onClick={() => setConfirmReset(true)}
              >
                <FiTrash2 className="mr-2" /> Reset Project
              </button>
            </div>
          </div>
        </div>
        
        {/* Project Statistics */}
        <div>
          <div className="card">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Project Statistics</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
                <p className="text-2xl font-semibold text-gray-800">{totalTasks}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
                <p className="text-2xl font-semibold text-gray-800">{completionRate}%</p>
                <div className="mt-1 progress-bar">
                  <div 
                    className={`progress-bar-fill ${
                      completionRate < 30 ? 'low' : 
                      completionRate < 70 ? 'medium' : 'high'
                    }`}
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tasks by Phase</h3>
                
                <div className="space-y-3">
                  {tasksByPhase.map(phase => (
                    <div key={phase.phase} className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Phase {phase.phase}: {phase.name}</span>
                        <span className="text-sm text-gray-500">
                          {phase.completed} / {phase.count} completed
                        </span>
                      </div>
                      {phase.count > 0 && (
                        <div className="mt-2 progress-bar">
                          <div 
                            className={`progress-bar-fill ${
                              phase.count === 0 ? 'low' :
                              phase.completed === phase.count ? 'high' : 'medium'
                            }`}
                            style={{ width: `${(phase.completed / phase.count) * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reset confirmation modal */}
      {confirmReset && (
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
                      Reset Project
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to reset this project? All tasks and progress will be permanently removed. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="btn btn-danger sm:ml-3"
                  onClick={handleResetProject}
                >
                  Reset Project
                </button>
                <button
                  type="button"
                  className="btn btn-outline mt-3 sm:mt-0"
                  onClick={() => setConfirmReset(false)}
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

export default ProjectSettings
