import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'

function App() {
  return (
    <div className="app">
      <h1>PLR Package Implementation Action Plan</h1>
      
      <div className="card">
        <div className="welcome">
          <h2>Welcome!</h2>
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
