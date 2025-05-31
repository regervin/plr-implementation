import { Link } from 'react-router-dom'
import { FiBell, FiSettings, FiMenu } from 'react-icons/fi'
import useTaskStore from '../store/taskStore'

const Header = ({ openSidebar }) => {
  const tasks = useTaskStore(state => state.tasks)
  
  const pendingTasks = tasks.filter(task => task.status !== 'completed').length
  
  return (
    <header className="bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-2 text-gray-500 focus:outline-none"
              aria-label="Open sidebar"
              onClick={openSidebar}
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">PLR Implementation Tracker</h1>
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notification bell */}
            <div className="relative">
              <button className="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none">
                <FiBell className="h-6 w-6" />
                {pendingTasks > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-danger-500 rounded-full">
                    {pendingTasks}
                  </span>
                )}
              </button>
            </div>
            
            {/* Settings */}
            <Link 
              to="/settings"
              className="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <FiSettings className="h-6 w-6" />
            </Link>
            
            {/* User profile */}
            <div className="relative">
              <button className="flex items-center focus:outline-none">
                <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                  PL
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  PLR User
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
