import { Link } from 'react-router-dom'
import { FiCheckCircle, FiClock, FiAlertCircle, FiPlus } from 'react-icons/fi'
import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import useTaskStore from '../store/taskStore'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const Dashboard = () => {
  const tasks = useTaskStore(state => state.tasks)
  
  // Task statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length
  const notStartedTasks = tasks.filter(task => task.status === 'not-started').length
  
  // Tasks by phase
  const phase1Tasks = tasks.filter(task => task.phase === 1)
  const phase2Tasks = tasks.filter(task => task.phase === 2)
  const phase3Tasks = tasks.filter(task => task.phase === 3)
  
  // High priority tasks
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && task.status !== 'completed')
  
  // Chart data
  const statusChartData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, notStartedTasks],
        backgroundColor: ['#10B981', '#FBBF24', '#9CA3AF'],
        borderWidth: 0,
      },
    ],
  }
  
  const phaseChartData = {
    labels: ['Phase 1', 'Phase 2', 'Phase 3'],
    datasets: [
      {
        label: 'Completed',
        data: [
          phase1Tasks.filter(t => t.status === 'completed').length,
          phase2Tasks.filter(t => t.status === 'completed').length,
          phase3Tasks.filter(t => t.status === 'completed').length,
        ],
        backgroundColor: '#10B981',
      },
      {
        label: 'In Progress',
        data: [
          phase1Tasks.filter(t => t.status === 'in-progress').length,
          phase2Tasks.filter(t => t.status === 'in-progress').length,
          phase3Tasks.filter(t => t.status === 'in-progress').length,
        ],
        backgroundColor: '#FBBF24',
      },
      {
        label: 'Not Started',
        data: [
          phase1Tasks.filter(t => t.status === 'not-started').length,
          phase2Tasks.filter(t => t.status === 'not-started').length,
          phase3Tasks.filter(t => t.status === 'not-started').length,
        ],
        backgroundColor: '#9CA3AF',
      },
    ],
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }
  
  const barChartOptions = {
    ...chartOptions,
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
  
  // Sample phases for demonstration
  const phases = [
    {
      id: 1,
      name: 'Planning',
      description: 'Initial setup and content organization',
      tasks: phase1Tasks,
    },
    {
      id: 2,
      name: 'Customization',
      description: 'Modify and personalize the PLR content',
      tasks: phase2Tasks,
    },
    {
      id: 3,
      name: 'Launch',
      description: 'Publish and promote the final product',
      tasks: phase3Tasks,
    },
  ]
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Link to="/tasks" className="btn btn-primary mt-3 sm:mt-0 flex items-center">
          <FiPlus className="mr-2" /> Add New Task
        </Link>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-white flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <FiClock className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
            <p className="text-2xl font-semibold text-gray-800">{totalTasks}</p>
          </div>
        </div>
        
        <div className="card bg-white flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <FiCheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <p className="text-2xl font-semibold text-gray-800">
              {completedTasks} <span className="text-sm text-gray-500">({totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%)</span>
            </p>
          </div>
        </div>
        
        <div className="card bg-white flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <FiAlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <p className="text-2xl font-semibold text-gray-800">{inProgressTasks}</p>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Task Status</h2>
          <div className="h-64">
            <Doughnut data={statusChartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Tasks by Phase</h2>
          <div className="h-64">
            <Bar data={phaseChartData} options={barChartOptions} />
          </div>
        </div>
      </div>
      
      {/* Phases */}
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">Implementation Phases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map(phase => {
            const totalPhaseTasks = phase.tasks.length
            const completedPhaseTasks = phase.tasks.filter(t => t.status === 'completed').length
            const progress = totalPhaseTasks > 0 ? Math.round((completedPhaseTasks / totalPhaseTasks) * 100) : 0
            
            return (
              <div key={phase.id} className={`phase-card phase-${phase.id}`}>
                <h3 className="text-lg font-medium text-gray-800">Phase {phase.id}: {phase.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{phase.description}</p>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
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
                
                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-gray-600">Tasks: {totalPhaseTasks}</span>
                  <span className="text-gray-600">Completed: {completedPhaseTasks}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* High priority tasks */}
      {highPriorityTasks.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-medium text-gray-800 mb-4">High Priority Tasks</h2>
          <div className="space-y-3">
            {highPriorityTasks.map(task => (
              <Link 
                key={task.id} 
                to={`/task/${task.id}`}
                className="block p-3 border border-gray-200 rounded-md hover:border-red-300 hover:bg-red-50 transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-1">{task.description}</p>
                  </div>
                  <span className="badge bg-red-100 text-red-800">High Priority</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
