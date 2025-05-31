import { NavLink } from 'react-router-dom'
import { FiHome, FiCheckSquare, FiSettings } from 'react-icons/fi'

const Sidebar = ({ mobile, closeSidebar }) => {
  const handleClick = () => {
    if (mobile && closeSidebar) {
      closeSidebar()
    }
  }
  
  return (
    <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
      <div className="flex items-center flex-shrink-0 px-4">
        <span className="text-xl font-bold text-primary-600">PLR Tracker</span>
      </div>
      <nav className="mt-5 flex-1 px-2 space-y-1">
        <NavLink 
          to="/" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          onClick={handleClick}
          end
        >
          <FiHome />
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/tasks" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          onClick={handleClick}
        >
          <FiCheckSquare />
          Tasks
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          onClick={handleClick}
        >
          <FiSettings />
          Settings
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
