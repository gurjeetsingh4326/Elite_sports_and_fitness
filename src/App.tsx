import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import ProgramsPage from '@/pages/ProgramsPage'
import DashboardPage from '@/pages/DashboardPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}
