import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'
import useTaskStore from '../store/taskStore'
import ProgressChart from '../components/ProgressChart'
import PhaseProgress from '../components/PhaseProgress'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const Reports = () => {
  const tasks = useTaskStore(state => state.tasks)
  const phases = useTaskStore(state => state.phases)
  const [reportType, setReportType] = useState('overview')
  
  // Count tasks by status for each phase
  const phaseTaskCounts = phases.map(phase => {
    const phaseTasks = tasks.filter(task => task.phaseId === phase.id)
    return {
      phaseId: phase.id,
      phaseName: phase.title.split(':')[0],
      completed: phaseTasks.filter(task => task.status === 'completed').length,
      inProgress: phaseTasks.filter(task => task.status === 'in-progress').length,
      notStarted: phaseTasks.filter(task => task.status === 'not-started').length,
      total: phaseTasks.length
    }
  })
  
  // Data for phase comparison chart
  const phaseComparisonData = {
    labels: phaseTaskCounts.map(p => p.phaseName),
    datasets: [
      {
        label: 'Completed',
        data: phaseTaskCounts.map(p => p.completed),
        backgroundColor: '#10b981', // success-500
      },
      {
        label: 'In Progress',
        data: phaseTaskCounts.map(p => p.inProgress),
        backgroundColor: '#f59e0b', // warning-500
      },
      {
        label: 'Not Started',
        data: phaseTaskCounts.map(p => p.notStarted),
        backgroundColor: '#e5e7eb', // gray-200
      },
    ],
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  }
  
  return (
    <div className="space-y-6">
      {/* Report Type Selector */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setReportType('overview')}
            className={`btn ${
              reportType === 'overview' ? 'btn-primary' : 'btn-outline'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setReportType('phases')}
            className={`btn ${
              reportType === 'phases' ? 'btn-primary' : 'btn-outline'
            }`}
          >
            Phases
          </button>
        </div>
      </div>
      
      {/* Report Content */}
      {reportType === 'overview' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Progress */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Progress</h2>
            <ProgressChart />
          </div>
          
          {/* Phase Progress */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Phase Progress</h2>
            <PhaseProgress />
          </div>
          
          {/* Task Statistics */}
          <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Task Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {phaseTaskCounts.map(phase => (
                <div key={phase.phaseId} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2">{phase.phaseName}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completed:</span>
                      <span className="font-medium text-success-600">{phase.completed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">In Progress:</span>
                      <span className="font-medium text-warning-600">{phase.inProgress}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Not Started:</span>
                      <span className="font-medium text-gray-600">{phase.notStarted}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Total:</span>
                        <span className="font-medium text-gray-800">{phase.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Phase Comparison Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Phase Comparison</h2>
            <div className="h-80">
              <Bar data={phaseComparisonData} options={chartOptions} />
            </div>
          </div>
          
          {/* Detailed Phase Reports */}
          {phases.map(phase => {
            const phaseTasks = tasks.filter(task => task.phaseId === phase.id)
            const completedTasks = phaseTasks.filter(task => task.status === 'completed')
            const completionRate = phaseTasks.length > 0 
              ? Math.round((completedTasks.length / phaseTasks.length) * 100) 
              : 0
            
            return (
              <div key={phase.id} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{phase.title}</h2>
                <p className="text-gray-600 mb-4">{phase.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Completion Rate</h3>
                    <p className="text-2xl font-bold text-gray-800">{completionRate}%</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Tasks Completed</h3>
                    <p className="text-2xl font-bold text-gray-800">{completedTasks.length}/{phaseTasks.length}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                    <p className={`text-lg font-bold ${
                      completionRate === 100 
                        ? 'text-success-600' 
                        : completionRate > 0 
                        ? 'text-warning-600' 
                        : 'text-gray-600'
                    }`}>
                      {completionRate === 100 
                        ? 'Completed' 
                        : completionRate > 0 
                        ? 'In Progress' 
                        : 'Not Started'}
                    </p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div 
                    className={`h-2.5 rounded-full bg-${phase.color}-500`}
                    style={{ width: `${phase.progress}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Reports
