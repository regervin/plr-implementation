import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import Dashboard from './pages/Dashboard'
import TaskList from './pages/TaskList'
import TaskDetail from './pages/TaskDetail'
import ProjectSettings from './pages/ProjectSettings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="task/:taskId" element={<TaskDetail />} />
          <Route path="settings" element={<ProjectSettings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
