import { FiCheck } from 'react-icons/fi'

const StepItem = ({ step, stepIndex, onToggle, plrName, getCategoryColor }) => {
  return (
    <div className={`card transition-all duration-200 ${step.completed ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
      <div className="flex items-start space-x-4">
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
            step.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {step.completed && <FiCheck className="w-4 h-4" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className={`text-lg font-medium ${step.completed ? 'text-green-800' : 'text-gray-900'}`}>
                  Step {step.number}: {step.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(step.category)}`}>
                  {step.category}
                </span>
              </div>
              
              <p className={`text-sm ${step.completed ? 'text-green-700' : 'text-gray-600'}`}>
                {step.description}
              </p>
              
              {plrName && (
                <p className="text-xs text-blue-600 mt-2">
                  Working on: {plrName}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepItem
