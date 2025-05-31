import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import useTaskStore from '../store/taskStore'

ChartJS.register(ArcElement, Tooltip, Legend)

const ProgressChart = () => {
  const tasks = useTaskStore(state => state.tasks)
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length
  const notStartedTasks = tasks.filter(task => task.status === 'not-started').length
  
  const data = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, notStartedTasks],
        backgroundColor: [
          '#10b981', // success-500
          '#f59e0b', // warning-500
          '#e5e7eb', // gray-200
        ],
        borderColor: [
          '#059669', // success-600
          '#d97706', // warning-600
          '#d1d5db', // gray-300
        ],
        borderWidth: 1,
      },
    ],
  }
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.raw || 0
            const total = context.dataset.data.reduce((acc, val) => acc + val, 0)
            const percentage = Math.round((value / total) * 100)
            return `${label}: ${value} (${percentage}%)`
          }
        }
      }
    },
  }
  
  return (
    <div className="h-64">
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default ProgressChart
