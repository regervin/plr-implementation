import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'

function App() {
  const [plrPackageName, setPlrPackageName] = useState(localStorage.getItem('plrPackageName') || '');

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setPlrPackageName(newName);
    localStorage.setItem('plrPackageName', newName);
  };

  return (
    <div className="app">
      <h1>PLR Package Implementation Action Plan</h1>
      
      <div className="card">
        <div className="welcome">
          <h2>Welcome!</h2>
          <div className="plr-name-container">
            <label htmlFor="plrPackageName">PLR Package Name:</label>
            <input 
              type="text" 
              id="plrPackageName" 
              value={plrPackageName} 
              onChange={handleNameChange}
              placeholder="Enter your PLR package name"
            />
          </div>
          <p>Track your progress through the implementation plan below.</p>
        </div>
      </div>

      <TaskList />
      
      <div className="footer">
        <h3>Important Reminders</h3>
        <ul>
          <li><strong>FTC Compliance:</strong> When promoting anything with affiliate links, ensure you disclose your affiliate relationship clearly and conspicuously, as per FTC guidelines.</li>
          <li><strong>Consistency is Key:</strong> Follow the schedule as closely as possible.</li>
          <li><strong>Engagement:</strong> Monitor comments and engage with your audience on social media and your blog.</li>
          <li><strong>Review and Adjust:</strong> Periodically review what's working and adjust your strategy as needed.</li>
        </ul>
      </div>
    </div>
  )
}

export default App
