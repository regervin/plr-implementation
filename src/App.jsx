import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import TaskList from './components/TaskList'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [plrName, setPlrName] = useState('')

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header plrName={plrName} setPlrName={setPlrName} />
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TaskList plrName={plrName} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
