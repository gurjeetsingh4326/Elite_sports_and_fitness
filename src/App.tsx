import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import ProgramsPage from '@/pages/ProgramsPage'
import ProgramDetailsPage from '@/pages/ProgramDetailsPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import RegisterCoachPage from '@/pages/RegisterCoachPage'
import DashboardPage from '@/pages/DashboardPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/programs/:programId" element={<ProgramDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register-coach" element={<RegisterCoachPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}
