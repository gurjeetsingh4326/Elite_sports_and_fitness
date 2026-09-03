import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import ProgramsPage from '@/pages/ProgramsPage'
import ProgramDetailsPage from '@/pages/ProgramDetailsPage'
import CoachesDirectoryPage from '@/pages/CoachesDirectoryPage'
import CoachProfilePage from '@/pages/CoachProfilePage'
import FacilitiesPage from '@/pages/FacilitiesPage'
import MembershipsPage from '@/pages/MembershipsPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import RegisterCoachPage from '@/pages/RegisterCoachPage'
import RegisterOrganizationPage from '@/pages/RegisterOrganizationPage'
import DashboardPage from '@/pages/DashboardPage'
import AcademyManagementPage from '@/pages/AcademyManagementPage'
import AcademyDashboardPage from '@/pages/AcademyDashboardPage'
import AcademyMapPage from '@/pages/AcademyMapPage'
import AcademyClassesPage from '@/pages/AcademyClassesPage'
import ClassDetailPage from '@/pages/ClassDetailPage'
import AthleteDirectoryPage from '@/pages/AthleteDirectoryPage'
import AthleteProfilePage from '@/pages/AthleteProfilePage'
import AttendancePage from '@/pages/AttendancePage'
import PerformancePage from '@/pages/PerformancePage'
import PracticeLevelsPage from '@/pages/PracticeLevelsPage'
import ReelsDiscoverPage from '@/pages/ReelsDiscoverPage'
import ReelDetailPage from '@/pages/ReelDetailPage'
import ReelsStudioPage from '@/pages/ReelsStudioPage'
import ModerationQueuePage from '@/pages/ModerationQueuePage'
import PhysicianPortalPage from '@/pages/PhysicianPortalPage'
import TransfersPage from '@/pages/TransfersPage'
import TournamentsPage from '@/pages/TournamentsPage'
import PaymentsPage from '@/pages/PaymentsPage'
import ReportsPage from '@/pages/ReportsPage'
import UsersPage from '@/pages/UsersPage'
import MyClassesPage from '@/pages/MyClassesPage'
import MyResultsPage from '@/pages/MyResultsPage'
import GalleryPage from '@/pages/GalleryPage'
import NotificationsPage from '@/pages/NotificationsPage'
import NutritionPlansPage from '@/pages/NutritionPlansPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/programs/:programId" element={<ProgramDetailsPage />} />
      <Route path="/coaches" element={<CoachesDirectoryPage />} />
      <Route path="/coaches/:coachId" element={<CoachProfilePage />} />
      <Route path="/facilities" element={<FacilitiesPage />} />
      <Route path="/memberships" element={<MembershipsPage />} />
      <Route path="/reels" element={<ReelsDiscoverPage />} />
      <Route path="/reels/:reelId" element={<ReelDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register-coach" element={<RegisterCoachPage />} />
      <Route path="/register-organization" element={<RegisterOrganizationPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/academies" element={<AcademyManagementPage />} />
      <Route path="/dashboard/academies/map" element={<AcademyMapPage />} />
      <Route path="/dashboard/academies/:academyId" element={<AcademyDashboardPage />} />
      <Route path="/dashboard/academies/:academyId/classes" element={<AcademyClassesPage />} />
      <Route path="/dashboard/academies/:academyId/classes/:classId" element={<ClassDetailPage />} />
      <Route path="/dashboard/athletes" element={<AthleteDirectoryPage />} />
      <Route path="/dashboard/athletes/:athleteId" element={<AthleteProfilePage />} />
      <Route path="/dashboard/attendance" element={<AttendancePage />} />
      <Route path="/dashboard/performance" element={<PerformancePage />} />
      <Route path="/dashboard/practice-levels" element={<PracticeLevelsPage />} />
      <Route path="/dashboard/reels-studio" element={<ReelsStudioPage />} />
      <Route path="/dashboard/moderation" element={<ModerationQueuePage />} />
      <Route path="/dashboard/physician" element={<PhysicianPortalPage />} />
      <Route path="/dashboard/transfers" element={<TransfersPage />} />
      <Route path="/dashboard/tournaments" element={<TournamentsPage />} />
      <Route path="/dashboard/payments" element={<PaymentsPage />} />
      <Route path="/dashboard/reports" element={<ReportsPage />} />
      <Route path="/dashboard/users" element={<UsersPage />} />
      <Route path="/dashboard/my-classes" element={<MyClassesPage />} />
      <Route path="/dashboard/my-results" element={<MyResultsPage />} />
      <Route path="/dashboard/gallery" element={<GalleryPage />} />
      <Route path="/dashboard/notifications" element={<NotificationsPage />} />
      <Route path="/dashboard/nutrition" element={<NutritionPlansPage />} />
    </Routes>
  )
}
