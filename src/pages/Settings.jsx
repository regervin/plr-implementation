import { useState } from 'react'
import { toast } from 'react-toastify'
import useTaskStore from '../store/taskStore'

const Settings = () => {
  const resetProgress = useTaskStore(state => state.resetProgress)
  const [resetConfirmation, setResetConfirmation] = useState('')
  
  const handleResetProgress = () => {
    if (resetConfirmation === 'RESET') {
      resetProgress()
      setResetConfirmation('')
      toast.success('Progress has been reset successfully')
    } else {
      toast.error('Please type RESET to confirm')
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
        
        <div className="space-y-6">
          {/* Reset Progress */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Reset Progress</h3>
            <p className="text-gray-600 mb-4">
              This will reset all task statuses to "Not Started" and clear all progress. This action cannot be undone.
            </p>
            
            <div className="bg-danger-50 border border-danger-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-danger-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-danger-800">Warning</h3>
                  <div className="mt-2 text-sm text-danger-700">
                    <p>
                      This action will reset all your progress tracking. You will lose information about which tasks have been completed or are in progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label htmlFor="reset-confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                  Type "RESET" to confirm
                </label>
                <input
                  type="text"
                  id="reset-confirmation"
                  value={resetConfirmation}
                  onChange={(e) => setResetConfirmation(e.target.value)}
                  className="input"
                  placeholder="RESET"
                />
              </div>
              <button
                onClick={handleResetProgress}
                className="btn btn-danger"
                disabled={resetConfirmation !== 'RESET'}
              >
                Reset All Progress
              </button>
            </div>
          </div>
          
          {/* About */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">About</h3>
            <p className="text-gray-600 mb-2">
              PLR Implementation Tracker helps you implement your PLR packages effectively by tracking your progress through the implementation phases.
            </p>
            <p className="text-gray-600">
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
