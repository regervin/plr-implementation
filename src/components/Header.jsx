import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = ({ plrName, setPlrName }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(plrName)
  const location = useLocation()

  const handleSave = () => {
    setPlrName(tempName)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempName(plrName)
    setIsEditing(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              PLR Implementation
            </h1>
            
            <nav className="flex space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Steps
              </Link>
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/dashboard' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Enter PLR name..."
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">PLR Name:</span>
                <span 
                  className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                  onClick={() => setIsEditing(true)}
                >
                  {plrName || 'Click to set PLR name'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
