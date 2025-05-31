import useTaskStore from '../store/taskStore'

const PhaseProgress = () => {
  const phases = useTaskStore(state => state.phases)
  
  return (
    <div className="space-y-4">
      {phases.map(phase => (
        <div key={phase.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">{phase.title.split(':')[0]}</h3>
            <span className="text-sm text-gray-500">{phase.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-${phase.color}-500`}
              style={{ width: `${phase.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PhaseProgress
