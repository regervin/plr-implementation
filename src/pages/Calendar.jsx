import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay } from 'date-fns'
import useTaskStore from '../store/taskStore'

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const tasks = useTaskStore(state => state.tasks)
  
  // Get tasks with due dates
  const tasksWithDueDates = tasks.filter(task => task.dueDate)
  
  // Get days in current month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const startDay = getDay(monthStart)
  
  // Previous and next month navigation
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  
  // Get tasks for a specific day
  const getTasksForDay = (day) => {
    return tasksWithDueDates.filter(task => 
      isSameDay(new Date(task.dueDate), day)
    )
  }
  
  // Render calendar grid
  const renderCalendarDays = () => {
    const days = []
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>
      )
    }
    
    // Add cells for each day of the month
    daysInMonth.forEach(day => {
      const dayTasks = getTasksForDay(day)
      const isToday = isSameDay(day, new Date())
      
      days.push(
        <div 
          key={day.toString()} 
          className={`min-h-24 border border-gray-200 p-1 ${isToday ? 'bg-primary-50' : 'bg-white'}`}
        >
          <div className={`text-right p-1 ${isToday ? 'font-bold text-primary-700' : ''}`}>
            {format(day, 'd')}
          </div>
          
          <div className="mt-1 max-h-20 overflow-y-auto">
            {dayTasks.map(task => (
              <Link 
                key={task.id} 
                to={`/task/${task.id}`}
                className={`block text-xs p-1 mb-1 rounded truncate ${
                  task.status === 'completed' 
                    ? 'bg-success-100 text-success-800' 
                    : task.status === 'in-progress'
                    ? 'bg-warning-100 text-warning-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {task.title}
              </Link>
            ))}
          </div>
        </div>
      )
    })
    
    return days
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          
          <div className="flex space-x-2">
            <button 
              onClick={prevMonth}
              className="btn btn-outline py-1"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentMonth(new Date())}
              className="btn btn-outline py-1"
            >
              Today
            </button>
            <button 
              onClick={nextMonth}
              className="btn btn-outline py-1"
            >
              Next
            </button>
          </div>
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-px">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium py-2 bg-gray-50">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {renderCalendarDays()}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Tasks</h2>
        
        <div className="space-y-3">
          {tasksWithDueDates.length > 0 ? (
            tasksWithDueDates
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .slice(0, 5)
              .map(task => (
                <Link 
                  key={task.id}
                  to={`/task/${task.id}`}
                  className="block p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      task.status === 'completed' 
                        ? 'bg-success-100 text-success-800' 
                        : task.status === 'in-progress'
                        ? 'bg-warning-100 text-warning-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status === 'completed' ? 'Completed' : 
                       task.status === 'in-progress' ? 'In Progress' : 
                       'Not Started'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Due: {format(new Date(task.dueDate), 'MMMM d, yyyy')}
                  </p>
                </Link>
              ))
          ) : (
            <p className="text-gray-500 text-center py-4">No tasks with due dates.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calendar
